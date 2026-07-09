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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateEmailHtml(name: string, email: string, subject: string, message: string, locale: string): string {
  const isFrench = locale === 'fr';
  const safe = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border-top:4px solid #e02b4d;">
      <div style="text-align:center;margin-bottom:16px;">
        <img src="https://songre.poodasamuel.com/logo-songre.png" alt="SONGRE" style="max-width:140px;height:auto;">
      </div>
      <h2 style="color:#e02b4d;">${isFrench ? 'Nouveau message de contact' : 'New contact message'}</h2>
      <p><strong>${isFrench ? 'Nom' : 'Name'}:</strong> ${safe(name)}</p>
      <p><strong>Email:</strong> ${safe(email)}</p>
      <p><strong>${isFrench ? 'Sujet' : 'Subject'}:</strong> ${safe(subject || 'Contact')}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#f9f9f9;border-left:4px solid #e02b4d;padding:12px;">${safe(message).replace(/\n/g, '<br>')}</div>
    </div>
  `;
}

// ─── Rate limiting minimal (best-effort, en mémoire) ──────────────────────
// Note : sur Vercel serverless, chaque instance a sa propre mémoire, donc
// cette protection est partielle (elle limite par instance chaude, pas
// globalement). Pour une protection robuste, ajouter Cloudflare Turnstile
// ou un rate limiter externe (Upstash Redis, etc.) si le spam devient un problème réel.
const hits = new Map<string, number[]>();
function isRateLimited(ip: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > max;
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

  const ip = (req.headers['x-forwarded-for'] as string || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Trop de requêtes, réessayez plus tard' });
  }

  try {
    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const subject = String(body.subject || 'Contact').trim();
    const locale = String(body._language || 'fr');
    // Honeypot : champ caché invisible pour un humain, souvent rempli par les bots
    const honeypot = String(body._gotcha || body.website || '').trim();

    if (honeypot) {
      // On simule un succès pour ne pas indiquer au bot qu'il a été détecté
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Champs requis manquants',
        received: { name: !!name, email: !!email, message: !!message },
      });
    }

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ success: false, error: 'Adresse email invalide' });
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
    return res.status(500).json({ success: false, error: 'Erreur serveur', detail: err?.message || String(err) });
  }
}

