import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';
import { securityHeaders, corsMiddleware, rateLimit } from './middleware/security';
import { detectLocale } from './utils/i18n';
import { homePage } from './routes/home';
import { aboutPage } from './routes/about';
import { securityPage } from './routes/security';
import { faqPage } from './routes/faq';
import { contactPage } from './routes/contact';
import { cguPage, privacyPage } from './routes/legal';
import { getBaseUrl } from './utils/seo';

type Bindings = {
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

export default app;
