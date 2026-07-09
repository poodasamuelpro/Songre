import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { generateEmailHtml } from '../src/utils/emailTemplate';

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, subject, message, gdpr_consent, _language } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
  const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set.');
    return res.status(500).json({ success: false, error: 'Configuration error: RESEND_API_KEY missing' });
  }
  if (!CONTACT_EMAIL_TO) {
    console.error('CONTACT_EMAIL_TO is not set.');
    return res.status(500).json({ success: false, error: 'Configuration error: CONTACT_EMAIL_TO missing' });
  }
  if (!CONTACT_EMAIL_FROM) {
    console.error('CONTACT_EMAIL_FROM is not set.');
    return res.status(500).json({ success: false, error: 'Configuration error: CONTACT_EMAIL_FROM missing' });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: `SONGRE <${CONTACT_EMAIL_FROM}>`,
      to: [CONTACT_EMAIL_TO],
      subject: `[SONGRE] ${subject}: ${name}`,
      html: generateEmailHtml(name as string, email as string, subject as string, message as string, gdpr_consent as string, (_language as string) || 'fr'),
    });

    if (error) {
      console.error('Resend email error:', error);
      return res.status(400).json({ success: false, error: `Failed to send email: ${error?.message || 'Unknown error'}` });
    }

    if (data) {
      return res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error('Internal server error in contact API:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
