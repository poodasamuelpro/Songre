import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { parse } from 'querystring';

// Helper to generate email HTML
function generateEmailHtml(name: string, email: string, subject: string, message: string, gdpr_consent: string, locale: string): string {
  const isFrench = locale === 'fr';
  const consentText = isFrench ? 'Consentement RGPD' : 'GDPR Consent';
  const consentValue = gdpr_consent === 'yes' ? (isFrench ? 'Oui' : 'Yes') : (isFrench ? 'Non' : 'No');

  return `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isFrench ? 'Nouveau message de contact - SONGRE' : 'New Contact Message - SONGRE'}</title>
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border-top: 4px solid #e02b4d; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; margin-bottom: 20px; }
        .header h1 { color: #e02b4d; font-size: 24px; }
        .message-box { background-color: #f9f9f9; border-left: 4px solid #e02b4d; padding: 15px; margin: 20px 0; font-style: italic; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isFrench ? 'Nouveau message de contact' : 'New Contact Message'}</h1>
        </div>
        <div class="content">
          <p><strong>${isFrench ? 'Nom' : 'Name'} :</strong> ${name}</p>
          <p><strong>${isFrench ? 'Email' : 'Email'} :</strong> ${email}</p>
          <p><strong>${isFrench ? 'Sujet' : 'Subject'} :</strong> ${subject}</p>
          <p><strong>${isFrench ? 'Message' : 'Message'} :</strong></p>
          <div class="message-box"><p>${message.replace(/\n/g, '<br>')}</p></div>
          <hr>
          <p><small><strong>${consentText} :</strong> ${consentValue}</small></p>
        </div>
        <div class="footer">
          <p>${isFrench ? 'Ceci est un email automatique, merci de ne pas y répondre.' : 'This is an automated email, please do not reply.'}</p>
          <p>&copy; ${new Date().getFullYear()} SONGRE.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function getRequestBody(req: VercelRequest): Promise<any> {
  console.log('Content-Type:', req.headers['content-type']);
  
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    console.log('Body already parsed by Vercel:', req.body);
    return req.body;
  }

  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Raw body received:', body);
      const contentType = req.headers['content-type'] || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        const parsed = parse(body);
        console.log('Parsed urlencoded body:', parsed);
        resolve(parsed);
      } else if (contentType.includes('application/json')) {
        try {
          const parsed = JSON.parse(body);
          console.log('Parsed JSON body:', parsed);
          resolve(parsed);
        } catch (e) {
          console.error('JSON parse error:', e);
          resolve({});
        }
      } else {
        console.log('Unknown content type, returning empty object');
        resolve({});
      }
    });
  });
}

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log('--- Contact API Request ---');
  console.log('Method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const body = await getRequestBody(req);
    const { name, email, subject, message, gdpr_consent, _language } = body;

    console.log('Extracted fields:', { name, email, subject, message, gdpr_consent, _language });

    if (!name || !email || !message) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields',
        debug: { name: !!name, email: !!email, message: !!message }
      });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;
    const CONTACT_EMAIL_FROM = process.env.CONTACT_EMAIL_FROM;

    if (!RESEND_API_KEY || !CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
      console.error('Missing environment variables');
      return res.status(500).json({ success: false, error: 'Server configuration error' });
    }

    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: `SONGRE <${CONTACT_EMAIL_FROM}>`,
      to: [CONTACT_EMAIL_TO],
      subject: `[SONGRE] ${subject || 'Contact'}: ${name}`,
      html: generateEmailHtml(name as string, email as string, subject as string || 'Contact', message as string, gdpr_consent as string || 'no', _language as string || 'fr'),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Global API Error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error', message: err.message });
  }
}
