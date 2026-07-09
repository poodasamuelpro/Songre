import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { parse } from 'querystring';

// ─── Génération du HTML de l'email ────────────────────────────────────────
// (fonction intégrée directement ici pour éviter tout problème de résolution
// de module ESM/bundling sur Vercel — voir ERR_MODULE_NOT_FOUND)
function generateEmailHtml(
  name: string,
  email: string,
  subject: string,
  message: string,
  gdpr_consent: string,
  locale: string
): string {
  const isFrench = locale === 'fr';
  const consentText = isFrench ? 'Consentement RGPD' : 'GDPR Consent';
  const consentValue = gdpr_consent === 'yes' ? (isFrench ? 'Oui' : 'Yes') : (isFrench ? 'Non' : 'No');

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isFrench ? 'Nouveau message de contact - SONGRE' : 'New Contact Message - SONGRE'}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          border-top: 4px solid #e02b4d;
        }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px; }
        .header img { max-width: 150px; height: auto; }
        .header h1 { color: #e02b4d; font-size: 24px; margin-top: 10px; }
        .content p { margin-bottom: 10px; }
        .content strong { color: #e02b4d; }
        .message-box {
          background-color: #f9f9f9;
          border-left: 4px solid #e02b4d;
          padding: 15px;
          margin: 20px 0;
          font-style: italic;
        }
        .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
        .footer a { color: #e02b4d; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://songre.poodasamuel.com/logo-songre.png" alt="SONGRE Logo">
          <h1>${isFrench ? 'Nouveau message de contact' : 'New Contact Message'}</h1>
        </div>
        <div class="content">
          <p><strong>${isFrench ? 'Nom' : 'Name'} :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>${isFrench ? 'Sujet' : 'Subject'} :</strong> ${safeSubject}</p>
          <p><strong>Message :</strong></p>
          <div class="message-box"><p>${safeMessage}</p></div>
          <hr>
          <p><small><strong>${consentText} :</strong> ${consentValue}</small></p>
        </div>
        <div class="footer">
          <p>${isFrench ? 'Ceci est un email automatique, merci de ne pas y répondre.' : 'This is an automated email, please do not reply.'}</p>
          <p>&copy; ${new Date().getFullYear()} SONGRE. ${isFrench ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p><a href="https://songre.poodasamuel.com">songre.poodasamuel.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ─── Domaines autorisés à appeler cette API (CORS) ────────────────────────
// ⚠️ Le domaine réel du site DOIT être listé ici, sinon le navigateur bloque
// la réponse et le formulaire semble "planter" sans message d'erreur clair.
const TRUSTED_ORIGINS = [
  'https://songre.poodasamuel.com',
  'https://songre.bf',
  'https://songre.com',
  'https://songre.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

function applyCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (origin && TRUSTED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getRequestBody(req: VercelRequest): Promise<Record<string, any>> {
  // Cas 1 : Vercel a déjà parsé le body (comportement par défaut la plupart du temps)
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    return req.body;
  }

  // Cas 2 : body brut à parser nous-mêmes (fallback)
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      const contentType = req.headers['content-type'] || '';
      try {
        if (contentType.includes('application/x-www-form-urlencoded')) {
          resolve(parse(raw));
        } else if (contentType.includes('application/json')) {
          resolve(raw ? JSON.parse(raw) : {});
        } else {
          // Dernier recours : on tente quand même du JSON, sinon objet vide
          try {
            resolve(raw ? JSON.parse(raw) : {});
          } catch {
            resolve({});
          }
        }
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = await getRequestBody(req);
    const {
      name,
      email,
      subject,
      message,
      gdpr_consent,
      _language,
      // honeypot anti-spam optionnel : si un champ caché "_gotcha" est rempli, c'est un bot
      _gotcha,
    } = body;

    // Anti-spam silencieux : on répond OK sans envoyer de mail
    if (_gotcha) {
      res.status(200).json({ success: true });
      return;
    }

    // ─── Validation ───────────────────────────────────────────────
    const errors: string[] = [];
    if (!name || String(name).trim().length < 2) errors.push('name');
    if (!email || !isValidEmail(String(email))) errors.push('email');
    if (!message || String(message).trim().length < 10) errors.push('message');
    if (gdpr_consent !== 'yes') errors.push('gdpr_consent');

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid required fields',
        fields: errors,
      });
      return;
    }

    // ─── Variables d'environnement ────────────────────────────────
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
    const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;

    if (!RESEND_API_KEY || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
      console.error('Variables d\'environnement manquantes', {
        hasKey: !!RESEND_API_KEY,
        hasTo: !!CONTACT_EMAIL_TO,
        hasFrom: !!CONTACT_EMAIL_FROM,
      });
      res.status(500).json({ success: false, error: 'Server configuration error' });
      return;
    }

    // ─── Envoi via Resend ─────────────────────────────────────────
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: `SONGRE <${CONTACT_EMAIL_FROM}>`,
      to: [CONTACT_EMAIL_TO],
      replyTo: String(email),
      subject: `[SONGRE] ${subject || 'Contact'}: ${name}`,
      html: generateEmailHtml(
        String(name),
        String(email),
        String(subject || 'Contact'),
        String(message),
        String(gdpr_consent || 'no'),
        String(_language || 'fr')
      ),
    });

    if (error) {
      console.error('Erreur Resend:', error);
      res.status(502).json({ success: false, error: 'Email provider error', detail: error.message });
      return;
    }

    console.log('Email envoyé avec succès:', data?.id);
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Erreur globale API contact:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
