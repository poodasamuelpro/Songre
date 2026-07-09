import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const TRUSTED_ORIGINS = [
  'https://songre.poodasamuel.com',
  'https://songre.bf',
  'https://songre.com',
  'https://songre.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

function generateEmailHtml(name: string, email: string, subject: string, message: string, locale: string): string {
  const isFrench = locale === 'fr';
  const safe = (s: string) => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border-top:4px solid #e02b4d;">
      <h2 style="color:#e02b4d;">${isFrench ? 'Nouveau message de contact' : 'New contact message'}</h2>
      <p><strong>${isFrench ? 'Nom' : 'Name'}:</strong> ${safe(name)}</p>
      <p><strong>Email:</strong> ${safe(email)}</p>
      <p><strong>${isFrench ? 'Sujet' : 'Subject'}:</strong> ${safe(subject || 'Contact')}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#f9f9f9;border-left:4px solid #e02b4d;padding:12px;">${safe(message).replace(/\n/g, '<br>')}</div>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin;
  if (origin && TRUSTED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    // Vercel parse déjà le body automatiquement (JSON ou form-urlencoded)
    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const subject = String(body.subject || 'Contact').trim();
    const locale = String(body._language || 'fr');

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Champs requis manquants',
        received: { name, email, message: message ? 'ok' : '' },
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
    const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;

    if (!RESEND_API_KEY || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
      return res.status(500).json({ success: false, error: 'Configuration serveur incomplète' });
    }

    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: `SONGRE <${CONTACT_EMAIL_FROM}>`,
      to: [CONTACT_EMAIL_TO],
      replyTo: email,
      subject: `[SONGRE] ${subject}: ${name}`,
      html: generateEmailHtml(name, email, subject, message, locale),
    });

    if (error) {
      return res.status(502).json({ success: false, error: 'Erreur envoi email', detail: error.message });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    // Garantie : on répond toujours en JSON, jamais un crash silencieux
    return res.status(500).json({ success: false, error: 'Erreur serveur', detail: err?.message || String(err) });
  }
}
