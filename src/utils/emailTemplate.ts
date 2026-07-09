export function generateEmailHtml(name: string, email: string, subject: string, message: string, gdpr_consent: string, locale: string): string {
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
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
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
          border-top: 4px solid #e02b4d; /* SONGRE primary color */
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
          height: auto;
        }
        .header h1 {
          color: #e02b4d;
          font-size: 24px;
          margin-top: 10px;
        }
        .content p {
          margin-bottom: 10px;
        }
        .content strong {
          color: #e02b4d;
        }
        .message-box {
          background-color: #f9f9f9;
          border-left: 4px solid #e02b4d;
          padding: 15px;
          margin-top: 20px;
          margin-bottom: 20px;
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
        .footer a {
          color: #e02b4d;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://songre.poodasamuel.com/logo-songre.png" alt="SONGRE Logo">
          <h1>${isFrench ? 'Nouveau message de contact' : 'New Contact Message'}</h1>
        </div>
        <div class="content">
          <p><strong>${isFrench ? 'Nom' : 'Name'} :</strong> ${name}</p>
          <p><strong>${isFrench ? 'Email' : 'Email'} :</strong> ${email}</p>
          <p><strong>${isFrench ? 'Sujet' : 'Subject'} :</strong> ${subject}</p>
          <p><strong>${isFrench ? 'Message' : 'Message'} :</strong></p>
          <div class="message-box">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
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
