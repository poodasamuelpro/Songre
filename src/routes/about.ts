import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

export function aboutPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].about;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    mainEntity: {
      '@type': 'Organization',
      name: 'SONGRE',
      foundingDate: '2026',
      mission: locale === 'fr' ? 'Révolutionner le don de sang au Burkina Faso' : 'Revolutionize blood donation in Burkina Faso',
    },
  };

  const homeHref = `/${locale}`;
  const prefix = locale === 'fr' ? '/fr' : '/en';

  const content = `
  <!-- ── PAGE HERO ─────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="${homeHref}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'À Propos' : 'About'}</span>
      </nav>
      <div class="page-hero-badge reveal">${locale === 'fr' ? 'Notre Mission' : 'Our Mission'}</div>
      <h1 class="page-hero-title reveal">${tr.about.title}</h1>
      <p class="page-hero-desc reveal">${tr.about.subtitle}</p>
    </div>
  </div>

  <!-- ── STORY ─────────────────────────────────────────────── -->
  <section class="section about-section">
    <div class="container">
      <div class="grid grid-2" style="gap:4rem; align-items:center;">
        <div class="reveal-left">
          <div class="section-badge mb-3">${locale === 'fr' ? 'Notre Histoire' : 'Our Story'}</div>
          <h2 style="margin-bottom:1.5rem;">${locale === 'fr' ? 'Comment SONGRE est né' : 'How SONGRE was born'}</h2>
          <p style="color:var(--text-muted); margin-bottom:1.25rem; line-height:1.8;">${tr.about.story}</p>
          <p style="color:var(--text-muted); margin-bottom:1.25rem; line-height:1.8;">
            ${locale === 'fr' 
              ? 'En 2026, SONGRE voit le jour, un mot mooré qui signifie "aider", pensé pour donner à chaque citoyen le pouvoir de sauver une vie depuis son smartphone.'
              : 'In 2026, SONGRE was created, a Mooré word meaning "help", designed to empower every citizen to save a life from their smartphone.'}
          </p>
          <p style="color:var(--text-muted); line-height:1.8;">${tr.about.mission}</p>
        </div>
        <div class="reveal-right">
          <div style="background:var(--primary-ultra-light); border-radius:var(--radius-lg); padding:3rem; text-align:center; border:1px solid rgba(200,30,58,0.1);">
            <img src="/logo-songre.png" alt="SONGRE" width="140" height="140" style="border-radius:20px; margin-bottom:1.5rem; box-shadow:var(--shadow-lg);">
            <h3 style="color:var(--primary); margin-bottom:0.5rem; font-size:2rem;">SONGRE</h3>
            <p style="color:var(--text-muted); font-style:italic;">${locale === 'fr' ? '"Aider" en langue Mooré' : '"Help" in Mooré language'}</p>
            <div style="margin-top:2rem; padding-top:2rem; border-top:1px solid rgba(200,30,58,0.15);">
              <p style="color:var(--text-muted); font-size:0.9rem;">
                ${locale === 'fr' ? '🇧🇫 Projet 2026 · Ouagadougou' : '🇧🇫 Project 2026 · Ouagadougou'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── PROBLEM / SOLUTION ─────────────────────────────────── -->
  <section class="section" style="background:var(--bg);">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Contexte' : 'Context'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Le Problème, Notre Réponse' : 'The Problem, Our Response'}</h2>
      </div>
      <div class="grid grid-2">
        <div class="problem-card reveal">
          <h3>${tr.about.problemTitle}</h3>
          <p style="margin-top:1rem; line-height:1.8; color:var(--text-muted);">${tr.about.problemText}</p>
          <ul style="margin-top:1rem; padding-left:1.5rem; color:var(--text-muted); line-height:2;">
            <li>${locale === 'fr' ? 'Banques de sang insuffisantes' : 'Insufficient blood banks'}</li>
            <li>${locale === 'fr' ? 'Manque de donneurs réguliers' : 'Lack of regular donors'}</li>
            <li>${locale === 'fr' ? 'Aucun système d\'alerte d\'urgence' : 'No emergency alert system'}</li>
            <li>${locale === 'fr' ? 'Peur de perdre l\'anonymat' : 'Fear of losing anonymity'}</li>
          </ul>
        </div>
        <div class="solution-card reveal reveal-delay-1">
          <h3>${tr.about.solutionTitle}</h3>
          <p style="margin-top:1rem; line-height:1.8; color:var(--text-muted);">${tr.about.solutionText}</p>
          <ul style="margin-top:1rem; padding-left:1.5rem; color:var(--text-muted); line-height:2;">
            <li>${locale === 'fr' ? 'Réseau de donneurs actifs par ville' : 'Network of active donors by city'}</li>
            <li>${locale === 'fr' ? 'Alertes en temps réel <30s' : 'Real-time alerts <30s'}</li>
            <li>${locale === 'fr' ? 'Anonymat garanti' : 'Guaranteed anonymity'}</li>
            <li>${locale === 'fr' ? 'Gratuit et sans publicité' : 'Free and ad-free'}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ── VALUES ─────────────────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${tr.about.values}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Ce Qui Nous Guide' : 'What Guides Us'}</h2>
      </div>
      <div class="grid grid-4">
        ${[
          { icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>', title: tr.about.value1, desc: locale === 'fr' ? 'Chaque être humain mérite d\'accéder au sang dont il a besoin, sans barrière financière ni géographique.' : 'Every human being deserves access to the blood they need, without financial or geographic barriers.' },
          { icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>', title: tr.about.value2, desc: locale === 'fr' ? 'Votre identité est sacrée. SONGRE a été conçu de zéro avec l\'anonymat comme pilier fondamental.' : 'Your identity is sacred. SONGRE was built from scratch with anonymity as a fundamental pillar.' },
          { icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', title: tr.about.value3, desc: locale === 'fr' ? 'Nous ne faisons aucune concession sur la qualité de service, de l\'expérience utilisateur et de la sécurité.' : 'We make no concessions on quality of service, user experience and security.' },
          { icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: tr.about.value4, desc: locale === 'fr' ? 'SONGRE repose sur l\'entraide. Donneurs et receveurs forment une seule et même communauté.' : 'SONGRE is built on mutual support. Donors and recipients form one community.' },
        ].map((v, i) => `
          <div class="value-card reveal ${i > 0 ? 'reveal-delay-' + i : ''}">
            <span class="value-icon">${v.icon}</span>
            <h3 class="value-title">${v.title}</h3>
            <p class="value-desc">${v.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ── CREATOR ─────────────────────────────────────────────── -->
  <section class="section" style="background:var(--bg);">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${locale === 'fr' ? 'Le créateur' : 'The Creator'}
        </div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Un projet signé POODA Samuel' : 'A project by POODA Samuel'}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'SONGRE est un projet indépendant, né d\'une vision simple : connecter les donneurs de sang aux patients de façon anonyme et sécurisée.' : 'SONGRE is an independent project, born from a simple vision: connect blood donors to patients anonymously and securely.'}</p>
      </div>
    </div>
  </section>

  <!-- ── CTA ────────────────────────────────────────────────── -->
  <section class="section download-section" id="join">
    <div class="container text-center">
      <div class="download-content">
        <h2 class="download-title reveal">${locale === 'fr' ? 'Rejoignez le Mouvement' : 'Join the Movement'}</h2>
        <p class="download-desc reveal">${locale === 'fr' ? 'Ensemble, nous pouvons faire de la pénurie de sang une réalité du passé.' : 'Together, we can make blood shortages a thing of the past.'}</p>
        <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;" class="reveal">
          <a href="#" class="btn btn-white btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.6.34-1.15.87-1.42.53-.27 1.17-.2 1.63.18l11.14 8.5c.38.29.6.74.6 1.24s-.22.95-.6 1.24l-11.14 8.5c-.46.38-1.1.45-1.63.18-.53-.27-.87-.82-.87-1.42z"/></svg>
            ${tr.cta.downloadAndroid}
          </a>
          <a href="${prefix}/contact" class="btn btn-outline" style="border-color:white; color:white;">
            ${locale === 'fr' ? 'Devenir Partenaire →' : 'Become a Partner →'}
          </a>
        </div>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl, jsonLd);
  return layout(locale, path, head, content);
}
