import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

export function securityPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].security;

  const content = `
  <!-- ── PAGE HERO ─────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'Anonymat & Sécurité' : 'Anonymity & Security'}</span>
      </nav>
      <div class="page-hero-badge reveal">${locale === 'fr' ? 'Anonymat &amp; Sécurité' : 'Anonymity &amp; Security'}</div>
      <h1 class="page-hero-title reveal">${tr.security.title}</h1>
      <p class="page-hero-desc reveal">${tr.security.subtitle}</p>
    </div>
  </div>

  <!-- ── SECURITY PILLARS ──────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <div class="grid grid-3">
        <div class="security-card reveal">
          <div class="security-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h2 class="security-title">${tr.security.aesTitle}</h2>
          <p class="security-desc">${tr.security.aesDesc}</p>
          <div style="margin-top:1.5rem; padding:1rem; background:var(--bg); border-radius:var(--radius-sm); font-size:0.85rem; color:var(--text-muted);">
            ${locale === 'fr' ? 'Vos données sensibles sont chiffrées dès leur réception, avant tout stockage. Aucune donnée n\'est lisible à plat.' : 'Your sensitive data is encrypted upon receipt, before any storage. No data is stored in plain text.'}
          </div>
        </div>
        <div class="security-card reveal reveal-delay-1">
          <div class="security-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
          </div>
          <h2 class="security-title">${tr.security.separationTitle}</h2>
          <p class="security-desc">${tr.security.separationDesc}</p>
          <div style="margin-top:1.5rem;">
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <div style="padding:0.75rem; background:var(--primary-ultra-light); border-radius:var(--radius-sm); font-size:0.85rem; border-left:3px solid var(--primary);">
                <strong>${locale === 'fr' ? 'Base A' : 'Database A'}</strong> — ${locale === 'fr' ? 'Données d\'identité (chiffrées)' : 'Identity data (encrypted)'}
              </div>
              <div style="text-align:center; font-size:1.25rem; color:var(--text-muted);">⬍</div>
              <div style="padding:0.75rem; background:var(--success-light); border-radius:var(--radius-sm); font-size:0.85rem; border-left:3px solid var(--success);">
                <strong>${locale === 'fr' ? 'Base B' : 'Database B'}</strong> — ${locale === 'fr' ? 'Données médicales (anonymes)' : 'Medical data (anonymous)'}
              </div>
              <div style="padding:0.75rem; background:var(--bg); border-radius:var(--radius-sm); font-size:0.85rem; text-align:center; color:var(--text-muted);">
                ↕ ${locale === 'fr' ? 'Aucun lien direct maintenu' : 'No direct link maintained'}
              </div>
            </div>
          </div>
        </div>
        <div class="security-card reveal reveal-delay-2">
          <div class="security-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h2 class="security-title">${tr.security.complianceTitle}</h2>
          <p class="security-desc">${tr.security.complianceDesc}</p>
          <div style="margin-top:1.5rem; display:flex; flex-wrap:wrap; gap:0.5rem;">
            <span class="cert-badge">✓ Loi 010-2004/AN</span>
            <span class="cert-badge">✓ ANPDP</span>
            <span class="cert-badge">✓ ISO 27001</span>
            <span class="cert-badge">✓ TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── ARCHITECTURE SCHEMA ───────────────────────────────── -->
  <section class="section" style="background:var(--bg);">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Architecture de confidentialité' : 'Privacy Architecture'}</div>
        <h2 class="section-title reveal">${tr.security.schemaTitle}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'Chaque couche protège la suivante. Aucune donnée ne traverse les couches sans validation.' : 'Each layer protects the next. No data crosses layers without validation.'}</p>
      </div>
      <div class="schema-container reveal">
        <div class="schema-title">${locale === 'fr' ? 'Séparation des données' : 'Data Separation'}</div>
        <div class="schema-layers">
          ${[
            { num: '1', name: locale === 'fr' ? 'Interface — Connexion HTTPS sécurisée' : 'Interface — Secure HTTPS connection', detail: locale === 'fr' ? 'Toutes les communications entre l\'app et nos serveurs sont chiffrées.' : 'All communications between the app and our servers are encrypted.' },
            { num: '2', name: locale === 'fr' ? 'Contrôle d\'accès — Protection contre les abus' : 'Access control — Abuse protection', detail: locale === 'fr' ? 'Les requêtes sont filtrées pour prévenir toute utilisation abusive.' : 'Requests are filtered to prevent any abusive use.' },
            { num: '3', name: locale === 'fr' ? 'Séparation des identités — Cloisonnement strict' : 'Identity separation — Strict isolation', detail: locale === 'fr' ? 'Vos données d\'identité et vos données médicales ne sont jamais dans la même base.' : 'Your identity data and medical data are never in the same database.' },
            { num: '4', name: locale === 'fr' ? 'Stockage chiffré — Données illisibles sans clé' : 'Encrypted storage — Data unreadable without key', detail: locale === 'fr' ? 'Même en accès direct à la base de données, les données sont illisibles.' : 'Even with direct database access, the data is unreadable.' },
          ].map(layer => `
            <div class="schema-layer">
              <div class="layer-num">${layer.num}</div>
              <div class="layer-text">
                <div class="layer-name">${layer.name}</div>
                <div class="layer-detail">${layer.detail}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ── TRANSPARENCY ──────────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Transparence' : 'Transparency'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Notre Engagement Transparent' : 'Our Transparent Commitment'}</h2>
      </div>
      <div class="grid grid-2">
        ${[
          {
            icon: 'check',
            title: locale === 'fr' ? 'Ce Que Nous Collectons' : 'What We Collect',
            items: locale === 'fr'
              ? ['Groupe sanguin (anonymisé)', 'Ville de résidence (approximative)', 'Disponibilité (booléen)', 'Dernier don (timestamp)']
              : ['Blood type (anonymized)', 'City of residence (approximate)', 'Availability (boolean)', 'Last donation (timestamp)'],
            color: 'var(--success)',
            bg: 'var(--success-light)',
          },
          {
            icon: 'cross',
            title: locale === 'fr' ? 'Ce Que Nous Ne Collectons PAS' : 'What We Do NOT Collect',
            items: locale === 'fr'
              ? ['Nom ou prénom', 'Numéro de téléphone réel', 'Adresse exacte', 'Photos ou biométrie', 'Données de navigation', 'Informations financières']
              : ['Name or first name', 'Real phone number', 'Exact address', 'Photos or biometrics', 'Browsing data', 'Financial information'],
            color: 'var(--primary)',
            bg: 'var(--primary-ultra-light)',
          },
        ].map(card => `
          <div class="reveal" style="background:${card.bg}; border-radius:var(--radius-lg); padding:2.5rem; border:1px solid rgba(0,0,0,0.05);">
            <h3 style="color:${card.color}; margin-bottom:1.5rem; font-size:1.1rem;">${card.title}</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.875rem;">
              ${card.items.map(item => `
                <li style="display:flex; align-items:center; gap:0.75rem; color:var(--text-muted); font-size:0.95rem;">
                  <span style="color:${card.color}; font-weight:700;">${card.icon === 'check' ? '✓' : '✗'}</span>
                  ${item}
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ── CERTIFICATIONS ────────────────────────────────────── -->
  <section class="section" style="background:var(--bg);">
    <div class="container text-center">
      <div class="section-badge reveal mb-4">${locale === 'fr' ? 'Certifications &amp; Conformités' : 'Certifications &amp; Compliances'}</div>
      <h2 class="section-title reveal" style="margin-bottom:3rem;">${tr.security.certifications}</h2>
      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:1.5rem;">
        ${[
          { badge: '✓', label: 'Loi 010-2004/AN', sub: locale === 'fr' ? 'Protection données Burkina' : 'Burkina data protection' },
          { badge: '✓', label: 'AES-256', sub: locale === 'fr' ? 'Chiffrement fort' : 'Strong encryption' },
          { badge: '✓', label: 'TLS', sub: locale === 'fr' ? 'Transport sécurisé' : 'Secure transport' },
          { badge: '✓', label: 'ANPDP', sub: locale === 'fr' ? 'Autorité nationale' : 'National authority' },
          { badge: '✓', label: locale === 'fr' ? 'Zéro pub' : 'Zero ads', sub: locale === 'fr' ? 'Aucun profilage commercial' : 'No commercial profiling' },
        ].map((c, i) => `
          <div class="reveal ${i > 0 ? 'reveal-delay-' + (i % 4) : ''}" style="background:white; border-radius:var(--radius-lg); padding:2rem 1.5rem; min-width:160px; text-align:center; box-shadow:var(--shadow-sm); border:1px solid var(--border);">
            <div style="font-size:1.5rem; font-weight:800; color:var(--success); margin-bottom:0.75rem;">${c.badge}</div>
            <div style="font-weight:700; margin-bottom:0.25rem;">${c.label}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${c.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl);
  return layout(locale, path, head, content);
}
