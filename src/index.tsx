import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';
import { securityHeaders, corsMiddleware, rateLimit } from './middleware/security';
import { detectLocale } from './utils/i18n';
import { homePage } from './routes/home';
import { aboutPage } from './routes/about';
import { securityPage } from './routes/security';
import { faqPage } from './routes/faq';
import { contactPage } from './routes/contact';
import { Resend } from 'resend';
import { generateEmailHtml } from './utils/emailTemplate';
import { cguPage, privacyPage } from './routes/legal';
import { getBaseUrl } from './utils/seo';

type Bindings = {
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
  CONTACT_EMAIL_FROM: string;
  BASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// ─── MIDDLEWARES ────────────────────────────────────────────────────────────
app.use('*', securityHeaders);
app.use('*', corsMiddleware);
app.use('/api/*', rateLimit());

// ─── STATIC FILES ───────────────────────────────────────────────────────────
app.get('/static/*', serveStatic({ root: './' }));
app.get('/logo-songre.png', serveStatic({ path: './logo-songre.png' }));
app.get('/favicon.ico', serveStatic({ path: './favicon.ico' }));

// ─── ROUTES ─────────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const locale = detectLocale(c.req.header('accept-language') || null);
  return c.redirect(`/${locale}`);
});

app.get('/:locale', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(homePage(locale, c.req.path, baseUrl));
});

app.get('/:locale/about', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(aboutPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/a-propos', (c) => c.redirect(`/${c.req.param('locale')}/about`));

app.get('/:locale/security', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(securityPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/securite', (c) => c.redirect(`/${c.req.param('locale')}/security`));

app.get('/:locale/faq', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(faqPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/contact', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(contactPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/cgu', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(cguPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/terms', (c) => c.redirect(`/${c.req.param('locale')}/cgu`));

app.get('/:locale/confidentialite', (c) => {
  const locale = c.req.param('locale') as any;
  const baseUrl = getBaseUrl(c.env);
  return c.html(privacyPage(locale, c.req.path, baseUrl));
});

app.get('/:locale/privacy', (c) => c.redirect(`/${c.req.param('locale')}/confidentialite`));

// ─── API: CONTACT FORM (RESEND) ─────────────────────────────────────────────
app.post('/api/contact', async (c) => {
  const body = await c.req.parseBody();
  const { name, email, subject, message, gdpr_consent } = body;

  const apiKey = c.env.RESEND_API_KEY;
  const toEmail = c.env.CONTACT_EMAIL_TO;
  const fromEmail = c.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !toEmail || !fromEmail) {
    return c.json({ success: false, error: 'Configuration error' }, 500);
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: `SONGRE <${fromEmail}>`,
      to: [toEmail],
      subject: `[SONGRE] ${subject}: ${name}`,
      html: generateEmailHtml(name as string, email as string, subject as string, message as string, gdpr_consent as string, (body._language as string) || 'fr'),
    });

    if (error) {
      console.error('Resend email error:', error);
      return c.json({ success: false, error: 'Failed to send email' }, 400);
    }

    if (data) {
      return c.json({ success: true });
    }
  } catch (err) {
    return c.json({ success: false, error: 'Internal server error' }, 500);
  }
});

export default app;
