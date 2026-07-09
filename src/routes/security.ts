import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { seoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

export function securityPage(locale: TranslationKey, path: string): string {
  const tr = t(locale);
  const seo = seoData[locale].security;

  const content = `
  <!-- ── PAGE HERO ─────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'Anonymat & Sécurité' : 'Anonymity & Security'}</span>
      </nav>
      <div class="page-hero-badge reveal">🔒 ${locale === 'fr' ? 'Sécurité Maximale' : 'Maximum Security'}</div>
      <h1 class="page-hero-title reveal">${tr.security.title}</h1>
      <p class="page-hero-desc reveal">${tr.security.subtitle}</p>
    </div>
  </div>

  <!-- ── SECURITY PILLARS ──────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <div class="grid grid-3">
        <div class="security-card reveal">
          <div class="security-icon">🔐</div>
          <h2 class="security-title">${tr.security.aesTitle}</h2>
          <p class="security-desc">${tr.security.aesDesc}</p>
          <div style="margin-top:1.5rem; padding:1rem; background:var(--bg); border-radius:var(--radius-sm); font-family:monospace; font-size:0.8rem; color:var(--text-muted);">
            Algorithm: AES-256-GCM<br>
            Key size: 256 bits<br>
            Mode: Galois/Counter Mode<br>
            Tag length: 128 bits
          </div>
        </div>
        <div class="security-card reveal reveal-delay-1">
          <div class="security-icon">🗄️</div>
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
          <div class="security-icon">⚖️</div>
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
        <div class="section-badge reveal">🏗️ ${locale === 'fr' ? 'Architecture' : 'Architecture'}</div>
        <h2 class="section-title reveal">${tr.security.schemaTitle}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'Chaque couche protège la suivante. Aucune donnée ne traverse les couches sans validation.' : 'Each layer protects the next. No data crosses layers without validation.'}</p>
      </div>
      <div class="schema-container reveal">
        <div class="schema-title">🛡️ ${tr.security.schemaTitle}</div>
        <div class="schema-layers">
          ${[
            { num: '1', icon: '🌐', name: tr.security.layer1, detail: locale === 'fr' ? 'Communication chiffrée de bout en bout — HTTPS obligatoire' : 'End-to-end encrypted communication — HTTPS mandatory' },
            { num: '2', icon: '🚦', name: tr.security.layer2, detail: locale === 'fr' ? 'Limitation des requêtes (30 req/min) — Protection contre les attaques DDoS' : 'Request limiting (30 req/min) — DDoS attack protection' },
            { num: '3', icon: '🔑', name: tr.security.layer3, detail: locale === 'fr' ? 'Authentification JWT sans état — Services découplés et indépendants' : 'Stateless JWT authentication — Decoupled independent services' },
            { num: '4', icon: '🗃️', name: tr.security.layer4, detail: locale === 'fr' ? 'Chiffrement AES-256 au repos — Clés gérées par HSM dédié' : 'AES-256 encryption at rest — Keys managed by dedicated HSM' },
          ].map(layer => `
            <div class="schema-layer">
              <div class="layer-num">${layer.num}</div>
              <div class="layer-icon">${layer.icon}</div>
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
        <div class="section-badge reveal">🔍 ${locale === 'fr' ? 'Transparence' : 'Transparency'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Notre Engagement Transparent' : 'Our Transparent Commitment'}</h2>
      </div>
      <div class="grid grid-2">
        ${[
          {
            icon: '✅',
            title: locale === 'fr' ? 'Ce Que Nous Collectons' : 'What We Collect',
            items: locale === 'fr'
              ? ['Groupe sanguin (anonymisé)', 'Ville de résidence (approximative)', 'Disponibilité (booléen)', 'Dernier don (timestamp)']
              : ['Blood type (anonymized)', 'City of residence (approximate)', 'Availability (boolean)', 'Last donation (timestamp)'],
            color: 'var(--success)',
            bg: 'var(--success-light)',
          },
          {
            icon: '❌',
            title: locale === 'fr' ? 'Ce Que Nous Ne Collectons PAS' : 'What We Do NOT Collect',
            items: locale === 'fr'
              ? ['Nom ou prénom', 'Numéro de téléphone réel', 'Adresse exacte', 'Photos ou biométrie', 'Données de navigation', 'Informations financières']
              : ['Name or first name', 'Real phone number', 'Exact address', 'Photos or biometrics', 'Browsing data', 'Financial information'],
            color: 'var(--primary)',
            bg: 'var(--primary-ultra-light)',
          },
        ].map(card => `
          <div class="reveal" style="background:${card.bg}; border-radius:var(--radius-lg); padding:2.5rem; border:1px solid rgba(0,0,0,0.05);">
            <h3 style="color:${card.color}; margin-bottom:1.5rem; font-size:1.1rem;">${card.icon} ${card.title}</h3>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:0.875rem;">
              ${card.items.map(item => `
                <li style="display:flex; align-items:center; gap:0.75rem; color:var(--text-muted); font-size:0.95rem;">
                  <span style="color:${card.color}; font-weight:700;">${card.icon === '✅' ? '✓' : '✗'}</span>
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
      <div class="section-badge reveal mb-4">${locale === 'fr' ? '🏅 Certifications & Conformités' : '🏅 Certifications & Compliances'}</div>
      <h2 class="section-title reveal" style="margin-bottom:3rem;">${tr.security.certifications}</h2>
      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:1.5rem;">
        ${[
          { badge: '⚖️', label: 'Loi 010-2004/AN', sub: locale === 'fr' ? 'Protection données Burkina' : 'Burkina data protection' },
          { badge: '🔒', label: 'AES-256', sub: locale === 'fr' ? 'Chiffrement militaire' : 'Military-grade encryption' },
          { badge: '🌐', label: 'TLS 1.3', sub: locale === 'fr' ? 'Transport sécurisé' : 'Secure transport' },
          { badge: '🛡️', label: 'OWASP', sub: locale === 'fr' ? 'Standards sécurité web' : 'Web security standards' },
          { badge: '📋', label: 'ANPDP', sub: locale === 'fr' ? 'Autorité nationale' : 'National authority' },
        ].map((c, i) => `
          <div class="reveal ${i > 0 ? 'reveal-delay-' + (i % 4) : ''}" style="background:white; border-radius:var(--radius-lg); padding:2rem 1.5rem; min-width:160px; text-align:center; box-shadow:var(--shadow-sm); border:1px solid var(--border);">
            <div style="font-size:2.5rem; margin-bottom:0.75rem;">${c.badge}</div>
            <div style="font-weight:700; margin-bottom:0.25rem;">${c.label}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">${c.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;

  const head = generateHead(seo);
  return layout(locale, path, head, content);
}
