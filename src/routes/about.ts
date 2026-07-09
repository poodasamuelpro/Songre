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
      foundingDate: '2023',
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
      <div class="page-hero-badge reveal">❤️ ${locale === 'fr' ? 'Notre Mission' : 'Our Mission'}</div>
      <h1 class="page-hero-title reveal">${tr.about.title}</h1>
      <p class="page-hero-desc reveal">${tr.about.subtitle}</p>
    </div>
  </div>

  <!-- ── STORY ─────────────────────────────────────────────── -->
  <section class="section about-section">
    <div class="container">
      <div class="grid" style="grid-template-columns:1fr 1fr; gap:4rem; align-items:center;">
        <div class="reveal-left">
          <div class="section-badge mb-3">📖 ${locale === 'fr' ? 'Notre Histoire' : 'Our Story'}</div>
          <h2 style="margin-bottom:1.5rem;">${locale === 'fr' ? 'Comment SONGRE est né' : 'How SONGRE was born'}</h2>
          <p style="color:var(--text-muted); margin-bottom:1.25rem; line-height:1.8;">${tr.about.story}</p>
          <p style="color:var(--text-muted); margin-bottom:1.25rem; line-height:1.8;">
            ${locale === 'fr' 
              ? 'En 2023, une équipe de développeurs burkinabè décide de créer SONGRE — terme mooré signifiant "sang" — pour donner à chaque citoyen le pouvoir de sauver une vie depuis son smartphone.'
              : 'In 2023, a team of Burkinabè developers decided to create SONGRE — a Mooré word meaning "blood" — to empower every citizen to save a life from their smartphone.'}
          </p>
          <p style="color:var(--text-muted); line-height:1.8;">${tr.about.mission}</p>
        </div>
        <div class="reveal-right">
          <div style="background:var(--primary-ultra-light); border-radius:var(--radius-lg); padding:3rem; text-align:center; border:1px solid rgba(200,30,58,0.1);">
            <img src="/logo-songre.png" alt="SONGRE" width="140" height="140" style="border-radius:20px; margin-bottom:1.5rem; box-shadow:var(--shadow-lg);">
            <h3 style="color:var(--primary); margin-bottom:0.5rem; font-size:2rem;">SONGRE</h3>
            <p style="color:var(--text-muted); font-style:italic;">${locale === 'fr' ? '"Sang" en langue Mooré' : '"Blood" in Mooré language'}</p>
            <div style="margin-top:2rem; padding-top:2rem; border-top:1px solid rgba(200,30,58,0.15);">
              <p style="color:var(--text-muted); font-size:0.9rem;">
                ${locale === 'fr' ? '🇧🇫 Fondée en 2023 à Ouagadougou' : '🇧🇫 Founded in 2023 in Ouagadougou'}
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
        <div class="section-badge reveal">🔍 ${locale === 'fr' ? 'Contexte' : 'Context'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Le Problème, Notre Réponse' : 'The Problem, Our Response'}</h2>
      </div>
      <div class="grid grid-2">
        <div class="problem-card reveal">
          <h3>⚠️ ${tr.about.problemTitle}</h3>
          <p style="margin-top:1rem; line-height:1.8; color:var(--text-muted);">${tr.about.problemText}</p>
          <ul style="margin-top:1rem; padding-left:1.5rem; color:var(--text-muted); line-height:2;">
            <li>${locale === 'fr' ? 'Banques de sang insuffisantes' : 'Insufficient blood banks'}</li>
            <li>${locale === 'fr' ? 'Manque de donneurs réguliers' : 'Lack of regular donors'}</li>
            <li>${locale === 'fr' ? 'Aucun système d\'alerte d\'urgence' : 'No emergency alert system'}</li>
            <li>${locale === 'fr' ? 'Peur de perdre l\'anonymat' : 'Fear of losing anonymity'}</li>
          </ul>
        </div>
        <div class="solution-card reveal reveal-delay-1">
          <h3>✅ ${tr.about.solutionTitle}</h3>
          <p style="margin-top:1rem; line-height:1.8; color:var(--text-muted);">${tr.about.solutionText}</p>
          <ul style="margin-top:1rem; padding-left:1.5rem; color:var(--text-muted); line-height:2;">
            <li>${locale === 'fr' ? 'Réseau de donneurs géolocalisés' : 'Geolocated donor network'}</li>
            <li>${locale === 'fr' ? 'Alertes en temps réel <30s' : 'Real-time alerts <30s'}</li>
            <li>${locale === 'fr' ? 'Anonymat garanti (AES-256)' : 'Guaranteed anonymity (AES-256)'}</li>
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
        <div class="section-badge reveal">🌟 ${tr.about.values}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Ce Qui Nous Guide' : 'What Guides Us'}</h2>
      </div>
      <div class="grid grid-4">
        ${[
          { icon: '🤝', title: tr.about.value1, desc: locale === 'fr' ? 'Chaque être humain mérite d\'accéder au sang dont il a besoin, sans barrière financière ni géographique.' : 'Every human being deserves access to the blood they need, without financial or geographic barriers.' },
          { icon: '🔏', title: tr.about.value2, desc: locale === 'fr' ? 'Votre identité est sacrée. SONGRE a été conçu de zéro avec l\'anonymat comme pilier fondamental.' : 'Your identity is sacred. SONGRE was built from scratch with anonymity as a fundamental pillar.' },
          { icon: '🏆', title: tr.about.value3, desc: locale === 'fr' ? 'Nous ne faisons aucune concession sur la qualité du code, de l\'expérience utilisateur et de la sécurité.' : 'We make no concessions on code quality, user experience and security.' },
          { icon: '🫂', title: tr.about.value4, desc: locale === 'fr' ? 'SONGRE est un projet communautaire. Les donneurs, les receveurs et l\'équipe forment une seule famille.' : 'SONGRE is a community project. Donors, recipients and the team form one family.' },
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

  <!-- ── TEAM ───────────────────────────────────────────────── -->
  <section class="section" style="background:var(--bg);">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">👥 ${tr.about.teamTitle}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Les Bâtisseurs de SONGRE' : 'The Builders of SONGRE'}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'Une équipe passionnée, unie par une seule mission : sauver des vies.' : 'A passionate team, united by one mission: save lives.'}</p>
      </div>
      <div class="grid grid-3">
        ${[
          { emoji: '👨🏾‍💻', name: 'Oumar Traoré', role: locale === 'fr' ? 'Fondateur & CEO' : 'Founder & CEO', bio: locale === 'fr' ? 'Développeur full-stack, 8 ans d\'expérience. Passionné de santé publique.' : 'Full-stack developer, 8 years of experience. Passionate about public health.' },
          { emoji: '👩🏾‍⚕️', name: 'Dr. Rasmata Nikiema', role: locale === 'fr' ? 'Directrice Médicale' : 'Medical Director', bio: locale === 'fr' ? 'Médecin transfusiologue. Experte en banques de sang d\'Afrique de l\'Ouest.' : 'Transfusion medicine doctor. Expert in West African blood banks.' },
          { emoji: '👨🏾‍🎨', name: 'Boureima Sawadogo', role: locale === 'fr' ? 'Lead Designer' : 'Lead Designer', bio: locale === 'fr' ? 'Designer UX/UI spécialisé dans les applications de santé pour marchés africains.' : 'UX/UI designer specialized in health apps for African markets.' },
          { emoji: '👩🏾‍💻', name: 'Fatimata Coulibaly', role: locale === 'fr' ? 'CTO' : 'CTO', bio: locale === 'fr' ? 'Architecte cloud, spécialiste sécurité et chiffrement des données de santé.' : 'Cloud architect, specialist in health data security and encryption.' },
          { emoji: '👨🏾‍⚖️', name: 'Issa Compaoré', role: locale === 'fr' ? 'Conseiller Juridique' : 'Legal Counsel', bio: locale === 'fr' ? 'Juriste spécialisé en protection des données et droit de la santé burkinabè.' : 'Jurist specialized in data protection and Burkinabè health law.' },
          { emoji: '👩🏾‍📊', name: 'Aïchata Diallo', role: locale === 'fr' ? 'Responsable Partenariats' : 'Partnerships Manager', bio: locale === 'fr' ? 'Coordonne les relations avec les hôpitaux, centres de santé et ONG partenaires.' : 'Coordinates relationships with partner hospitals, health centers and NGOs.' },
        ].map((m, i) => `
          <div class="team-card reveal ${i > 0 ? 'reveal-delay-' + (i % 4) : ''}">
            <div class="team-avatar">${m.emoji}</div>
            <div class="team-name">${m.name}</div>
            <div class="team-role">${m.role}</div>
            <p class="team-bio">${m.bio}</p>
          </div>
        `).join('')}
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.57.07 2.65.83 3.57.9 1.36-.28 2.66-1.05 4.1-.95 1.72.14 3.04.82 3.87 2.1-3.56 2.12-2.72 7.02.73 8.46-.42 1.12-.98 2.22-1.27 2.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            ${tr.cta.downloadIos}
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
