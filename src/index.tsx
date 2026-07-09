import { Hono } from 'hono';
// Import dynamique de l'adaptateur selon l'environnement
import { serveStatic } from 'hono/serve-static';
import { securityHeaders, corsMiddleware, rateLimit } from './middleware/security';
import { detectLocale } from './utils/i18n';
import { homePage } from './routes/home';
import { aboutPage } from './routes/about';
import { securityPage } from './routes/security';
import { faqPage } from './routes/faq';
import { contactPage } from './routes/contact';
import { cguPage, privacyPage } from './routes/legal';

const app = new Hono();

// ── Global Middleware ───────────────────────────────────────────────────────
app.use('*', securityHeaders);
app.use('*', corsMiddleware);
app.use('*', rateLimit(60, 60000));

// ── Static Assets ───────────────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }));
app.use('/logo-songre.png', serveStatic({ root: './' }));
app.use('/manifest.json', serveStatic({ root: './' }));
app.use('/llms.txt', serveStatic({ root: './' }));
app.use('/favicon.ico', serveStatic({ root: './' }));
app.use('/.well-known/*', serveStatic({ root: './' }));

// ── Root Redirect (language detection) ─────────────────────────────────────
app.get('/', (c) => {
  const acceptLang = c.req.header('Accept-Language') || '';
  const locale = detectLocale(acceptLang);
  return c.redirect(`/${locale}`, 302);
});

// ─── FRENCH ROUTES ──────────────────────────────────────────────────────────
app.get('/fr', (c) => {
  return c.html(homePage('fr', '/fr'));
});

app.get('/fr/a-propos', (c) => {
  return c.html(aboutPage('fr', '/fr/a-propos'));
});

app.get('/fr/securite', (c) => {
  return c.html(securityPage('fr', '/fr/securite'));
});

app.get('/fr/faq', (c) => {
  return c.html(faqPage('fr', '/fr/faq'));
});

app.get('/fr/contact', (c) => {
  return c.html(contactPage('fr', '/fr/contact'));
});

app.get('/fr/cgu', (c) => {
  return c.html(cguPage('fr', '/fr/cgu'));
});

app.get('/fr/confidentialite', (c) => {
  return c.html(privacyPage('fr', '/fr/confidentialite'));
});

// ─── ENGLISH ROUTES ─────────────────────────────────────────────────────────
app.get('/en', (c) => {
  return c.html(homePage('en', '/en'));
});

app.get('/en/about', (c) => {
  return c.html(aboutPage('en', '/en/about'));
});

app.get('/en/security', (c) => {
  return c.html(securityPage('en', '/en/security'));
});

app.get('/en/faq', (c) => {
  return c.html(faqPage('en', '/en/faq'));
});

app.get('/en/contact', (c) => {
  return c.html(contactPage('en', '/en/contact'));
});

app.get('/en/terms', (c) => {
  return c.html(cguPage('en', '/en/terms'));
});

app.get('/en/privacy', (c) => {
  return c.html(privacyPage('en', '/en/privacy'));
});

// ─── SEO / SITEMAP ──────────────────────────────────────────────────────────
app.get('/sitemap.xml', (c) => {
  const BASE = 'https://songre.bf';
  const now = new Date().toISOString().split('T')[0];
  const urls = [
    // French
    { loc: `${BASE}/fr`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE}/fr/a-propos`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE}/fr/securite`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE}/fr/faq`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${BASE}/fr/contact`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE}/fr/cgu`, changefreq: 'yearly', priority: '0.5' },
    { loc: `${BASE}/fr/confidentialite`, changefreq: 'yearly', priority: '0.5' },
    // English
    { loc: `${BASE}/en`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${BASE}/en/about`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE}/en/security`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE}/en/faq`, changefreq: 'monthly', priority: '0.9' },
    { loc: `${BASE}/en/contact`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${BASE}/en/terms`, changefreq: 'yearly', priority: '0.5' },
    { loc: `${BASE}/en/privacy`, changefreq: 'yearly', priority: '0.5' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  c.header('Content-Type', 'application/xml; charset=UTF-8');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.body(xml);
});

app.get('/robots.txt', (c) => {
  c.header('Content-Type', 'text/plain; charset=UTF-8');
  c.header('Cache-Control', 'public, max-age=86400');
  return c.body(`# SONGRE — robots.txt
User-agent: *
Allow: /
Allow: /fr/
Allow: /en/

Disallow: /api/
Disallow: /.well-known/

Sitemap: https://songre.bf/sitemap.xml

# Crawl-delay for respectful bots
Crawl-delay: 1
`);
});

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'SONGRE',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: 'healthy',
  });
});

// ─── CONTACT API (server-side proxy pour Formspree) ─────────────────────────
app.post('/api/contact', rateLimit(5, 60000), async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message, gdpr_consent, _language } = body;

    // Validation basique
    if (!name || !email || !message || !subject) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }
    if (gdpr_consent !== 'yes') {
      return c.json({ error: 'GDPR consent required' }, 400);
    }
    if (message.length < 20 || message.length > 5000) {
      return c.json({ error: 'Message must be between 20 and 5000 characters' }, 400);
    }

    // Forward to Formspree
    const formspreeRes = await fetch('https://formspree.io/f/xzzpwvbp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, subject, message, _language: _language || 'fr', gdpr_consent }),
    });

    if (formspreeRes.ok) {
      return c.json({ success: true, message: 'Message sent successfully' });
    }
    throw new Error('Formspree error');
  } catch (_err) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.notFound((c) => {
  const acceptLang = c.req.header('Accept-Language') || '';
  const locale = detectLocale(acceptLang);
  const prefix = locale === 'fr' ? '/fr' : '/en';

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — ${locale === 'fr' ? 'Page introuvable' : 'Page not found'} | SONGRE</title>
  <link rel="icon" href="/logo-songre.png">
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/style.css">
</head>
<body style="display:flex; align-items:center; justify-content:center; min-height:100vh; text-align:center; padding:2rem;">
  <div>
    <img src="/logo-songre.png" alt="SONGRE" width="80" height="80" style="border-radius:16px; margin-bottom:2rem;">
    <h1 style="font-size:6rem; color:var(--primary); margin-bottom:0.5rem; font-family:var(--font-serif);">404</h1>
    <h2 style="margin-bottom:1rem;">${locale === 'fr' ? 'Page introuvable' : 'Page not found'}</h2>
    <p style="color:var(--text-muted); margin-bottom:2.5rem; max-width:400px;">
      ${locale === 'fr' ? 'La page que vous cherchez n\'existe pas ou a été déplacée.' : 'The page you\'re looking for doesn\'t exist or has been moved.'}
    </p>
    <a href="${prefix}" class="btn btn-primary">← ${locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}</a>
  </div>
</body>
</html>`;

  return c.html(html, 404);
});

export default app;
