import type { TranslationKey } from './translations';
import { t } from './translations';

// ─── Navigation Component ───────────────────────────────────────────────────
export function navbar(locale: TranslationKey, currentPath: string): string {
  const tr = t(locale);
  const prefix = `/${locale}`;
  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const otherPath = currentPath.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `${prefix}`, label: tr.nav.home, key: 'home' },
    { href: `${prefix}/a-propos`, label: tr.nav.about, key: 'about', en: `/${otherLocale}/about` },
    { href: `${prefix}/securite`, label: tr.nav.security, key: 'security', en: `/${otherLocale}/security` },
    { href: `${prefix}/faq`, label: tr.nav.faq, key: 'faq' },
    { href: `${prefix}/contact`, label: tr.nav.contact, key: 'contact' },
  ];

  if (locale === 'en') {
    links[1].href = `${prefix}/about`;
    links[2].href = `${prefix}/security`;
  }

  const navLinks = links.map(link => `
    <a href="${link.href}" class="nav-link ${currentPath === link.href ? 'active' : ''}">${link.label}</a>
  `).join('');

  return `
  <nav class="navbar" id="navbar" role="navigation" aria-label="Navigation principale">
    <div class="nav-container">
      <a href="/${locale}" class="nav-logo" aria-label="SONGRE - Accueil">
        <img src="/logo-songre.png" alt="SONGRE" class="logo-img" width="48" height="48">
        <span class="logo-text">SONGRE</span>
      </a>
      
      <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navMenu">
        <span></span><span></span><span></span>
      </button>

      <div class="nav-menu" id="navMenu">
        <div class="nav-links">
          ${navLinks}
        </div>
        <div class="nav-actions">
          <a href="${otherPath}" class="lang-switch" aria-label="Changer la langue">
            <span class="lang-icon">🌐</span>
            <span>${otherLocale.toUpperCase()}</span>
          </a>
          <a href="#download" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.57.07 2.65.83 3.57.9 1.36-.28 2.66-1.05 4.1-.95 1.72.14 3.04.82 3.87 2.1-3.56 2.12-2.72 7.02.73 8.46-.42 1.12-.98 2.22-1.27 2.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            ${tr.cta.downloadIos}
          </a>
        </div>
      </div>
    </div>
  </nav>`;
}

// ─── Footer Component ────────────────────────────────────────────────────────
export function footer(locale: TranslationKey): string {
  const tr = t(locale);
  const prefix = locale === 'fr' ? '/fr' : '/en';
  const cguHref = locale === 'fr' ? `${prefix}/cgu` : `${prefix}/terms`;
  const privacyHref = locale === 'fr' ? `${prefix}/confidentialite` : `${prefix}/privacy`;

  return `
  <footer class="footer" role="contentinfo">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/${locale}" class="footer-logo">
              <img src="/logo-songre.png" alt="SONGRE" width="60" height="60">
              <div>
                <span class="footer-logo-name">SONGRE</span>
                <span class="footer-logo-tagline">${tr.footer.tagline}</span>
              </div>
            </a>
            <p class="footer-desc">
              ${locale === 'fr' 
                ? 'La plateforme qui connecte les donneurs de sang avec les patients au Burkina Faso. Anonyme, sécurisée, disponible 24h/24.'
                : 'The platform connecting blood donors with patients in Burkina Faso. Anonymous, secure, available 24/7.'}
            </p>
            <div class="footer-social">
              <a href="https://facebook.com/songre.bf" target="_blank" rel="noopener" aria-label="Facebook" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/songre_bf" target="_blank" rel="noopener" aria-label="Twitter/X" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/songre_bf" target="_blank" rel="noopener" aria-label="Instagram" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/22600000000" target="_blank" rel="noopener" aria-label="WhatsApp" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div class="footer-col">
            <h3 class="footer-col-title">${locale === 'fr' ? 'Navigation' : 'Navigation'}</h3>
            <ul class="footer-links">
              <li><a href="${prefix}">${t(locale).nav.home}</a></li>
              <li><a href="${prefix}/${locale === 'fr' ? 'a-propos' : 'about'}">${t(locale).nav.about}</a></li>
              <li><a href="${prefix}/${locale === 'fr' ? 'securite' : 'security'}">${t(locale).nav.security}</a></li>
              <li><a href="${prefix}/faq">${t(locale).nav.faq}</a></li>
              <li><a href="${prefix}/contact">${t(locale).nav.contact}</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3 class="footer-col-title">${locale === 'fr' ? 'Légal' : 'Legal'}</h3>
            <ul class="footer-links">
              <li><a href="${cguHref}">${t(locale).nav.cgu}</a></li>
              <li><a href="${privacyHref}">${t(locale).nav.privacy}</a></li>
              <li><a href="${prefix}/contact">${locale === 'fr' ? 'Signalement' : 'Report'}</a></li>
              <li><a href="/sitemap.xml">Sitemap</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3 class="footer-col-title">${locale === 'fr' ? 'Télécharger' : 'Download'}</h3>
            <div class="footer-apps">
              <a href="#" class="app-badge app-badge-ios" aria-label="App Store">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.57.07 2.65.83 3.57.9 1.36-.28 2.66-1.05 4.1-.95 1.72.14 3.04.82 3.87 2.1-3.56 2.12-2.72 7.02.73 8.46-.42 1.12-.98 2.22-1.27 2.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <div>
                  <span class="badge-sub">${locale === 'fr' ? 'Télécharger sur' : 'Download on the'}</span>
                  <span class="badge-main">App Store</span>
                </div>
              </a>
              <a href="#" class="app-badge app-badge-android" aria-label="Google Play">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3.18 23.76c.3.17.64.24.99.2L15.34 12 11.67 8.34 3.18 23.76zM20.9 10.56l-2.91-1.65-3.65 3.64 3.64 3.64 2.95-1.67c.84-.48.84-1.49-.03-1.96zM2.01 1.05C1.98 1.2 2 1.36 2 1.53v20.93c0 .17.02.33.07.48l.1.09 11.7-11.7v-.29L2.11.96l-.1.09z"/></svg>
                <div>
                  <span class="badge-sub">${locale === 'fr' ? 'Disponible sur' : 'Get it on'}</span>
                  <span class="badge-main">Google Play</span>
                </div>
              </a>
            </div>
            <div class="footer-contact-info">
              <p>📧 songre.contact@gmail.com</p>
              <p>📍 Ouagadougou, Burkina Faso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>${tr.footer.rights}</p>
        <p>${tr.footer.madeIn}</p>
      </div>
    </div>
  </footer>`;
}

// ─── Layout Wrapper ──────────────────────────────────────────────────────────
export function layout(
  locale: TranslationKey,
  currentPath: string,
  head: string,
  content: string
): string {
  return `<!DOCTYPE html>
<html lang="${locale}" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#C81E3A">
  <meta name="msapplication-TileColor" content="#C81E3A">
  <meta name="robots" content="index, follow">
  <meta name="author" content="SONGRE">
  <meta name="application-name" content="SONGRE">
  ${head}
  <link rel="icon" type="image/png" href="/logo-songre.png">
  <link rel="apple-touch-icon" href="/logo-songre.png">
  <link rel="manifest" href="/manifest.json">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/style.css">
</head>
<body>
  ${navbar(locale, currentPath)}
  <main id="main-content" role="main">
    ${content}
  </main>
  ${footer(locale)}
  <script src="/static/app.js" defer></script>
</body>
</html>`;
}
