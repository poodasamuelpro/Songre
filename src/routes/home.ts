import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

export function homePage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].home;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SONGRE',
    url: baseUrl,
    logo: `${baseUrl}/logo-songre.png`,
    description: seo.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'songre.contact@gmail.com',
      contactType: 'customer support',
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ouagadougou',
      addressCountry: 'BF',
    },
    sameAs: [
      'https://facebook.com/songre.bf',
      'https://twitter.com/songre_bf',
      'https://instagram.com/songre_bf',
    ],
    foundingDate: '2026',
    areaServed: { '@type': 'Country', name: 'Burkina Faso' },
  };

  const content = `
  <a class="skip-link" href="#main-content">${locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>

  <!-- ── HERO ─────────────────────────────────────────────── -->
  <section class="hero" id="home" aria-label="${locale === 'fr' ? 'Section héros' : 'Hero section'}">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge reveal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M12 2.7 17.7 8.4a8 8 0 1 1-11.4 0Z"/></svg>
            <span>${locale === 'fr' ? 'Plateforme Burkina Faso' : 'Burkina Faso Platform'}</span>
          </div>
          <h1 class="hero-title reveal">
            ${tr.home.heroTitle}
            <span class="hero-title-accent">${tr.home.heroSubtitle}</span>
          </h1>
          <p class="hero-desc reveal reveal-delay-1">${tr.home.heroParagraph}</p>
          <div class="hero-actions reveal reveal-delay-2">
            <a href="#download" class="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.6.34-1.15.87-1.42.53-.27 1.17-.2 1.63.18l11.14 8.5c.38.29.6.74.6 1.24s-.22.95-.6 1.24l-11.14 8.5c-.46.38-1.1.45-1.63.18-.53-.27-.87-.82-.87-1.42z"/></svg>
              ${tr.cta.downloadAndroid}
            </a>
            <a href="${locale === 'fr' ? `/${locale}/a-propos` : `/${locale}/about`}" class="btn btn-outline btn-lg">
              ${tr.cta.learnMore} →
            </a>
          </div>
          <div class="hero-trust reveal reveal-delay-3">
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? '100% Anonyme' : '100% Anonymous'}</div>
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? 'Sans publicité' : 'Ad-free'}</div>
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? 'Données chiffrées' : 'Encrypted data'}</div>
          </div>
        </div>
        <div class="hero-visual reveal-right">
          <div class="hero-orbit" aria-hidden="true">
            <div class="orbit-dot" title="A+">🅰️</div>
            <div class="orbit-dot" title="B+">🅱️</div>
            <div class="orbit-dot" title="O+">🅾️</div>
            <div class="orbit-dot" title="AB+">🆎</div>
          </div>
          <div class="hero-phone-mockup" role="img" aria-label="${locale === 'fr' ? 'Aperçu de l\'application SONGRE' : 'SONGRE app preview'}">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="phone-topbar">
                <div class="phone-brand"><img src="/logo-songre.png" alt="SONGRE" width="22" height="22"><span>SONGRE</span></div>
                <div class="phone-icon-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
              </div>

              <div class="phone-cta-urgent">
                <div class="phone-cta-eyebrow">${locale === 'fr' ? 'URGENCE PROCHE' : 'NEARBY EMERGENCY'}</div>
                <div class="phone-cta-title">${locale === 'fr' ? 'CHU Yalgado, A+ requis, 2,3 km' : 'CHU Yalgado, A+ needed, 2.3 km'}</div>
                <button class="phone-cta-btn">${locale === 'fr' ? '✓ Je peux donner' : '✓ I can donate'}</button>
              </div>

              <div class="phone-section-label">${locale === 'fr' ? 'Profil donneur' : 'Donor profile'}</div>
              <div class="phone-demande-card">
                <div class="phone-groupe-badge">O+</div>
                <div class="phone-demande-info">
                  <div class="phone-demande-title">${locale === 'fr' ? 'Profil Donneur' : 'Donor Profile'}</div>
                  <div class="phone-demande-meta">${locale === 'fr' ? 'Actif • Ouagadougou' : 'Active • Ouagadougou'}</div>
                </div>
              </div>
            </div>
            <div class="phone-bottomnav">
              <div class="phone-navitem active">
                <svg class="phone-navitem-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                ${locale === 'fr' ? 'Accueil' : 'Home'}
              </div>
              <div class="phone-navitem">
                <svg class="phone-navitem-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                ${locale === 'fr' ? 'Demandes' : 'Requests'}
              </div>
              <div class="phone-navitem">
                <svg class="phone-navitem-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                ${locale === 'fr' ? 'Alertes' : 'Alerts'}
              </div>
              <div class="phone-navitem">
                <svg class="phone-navitem-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ${locale === 'fr' ? 'Profil' : 'Profile'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── STATS BANNER ─────────────────────────────────────────── -->
  <section class="stats-section" aria-label="${locale === 'fr' ? 'Informations clés' : 'Key information'}">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item reveal">
          <span class="stat-number">8</span>
          <span class="stat-label">${locale === 'fr' ? 'Groupes sanguins' : 'Blood types'}</span>
        </div>
        <div class="stat-item reveal reveal-delay-1">
          <span class="stat-number">100%</span>
          <span class="stat-label">${locale === 'fr' ? 'Anonyme' : 'Anonymous'}</span>
        </div>
        <div class="stat-item reveal reveal-delay-2">
          <span class="stat-number">23</span>
          <span class="stat-label">${tr.stats.cities}</span>
        </div>
        <div class="stat-item reveal reveal-delay-3">
          <span class="stat-number">24h</span>
          <span class="stat-label">${tr.stats.availability}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── HOW IT WORKS ──────────────────────────────────────── -->
  <section class="section" id="how-it-works">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Simple comme bonjour' : 'Simple as can be'}</div>
        <h2 class="section-title reveal">${tr.home.howTitle}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'En 3 étapes simples, devenez un héros anonyme qui sauve des vies.' : 'In 3 simple steps, become an anonymous hero who saves lives.'}</p>
      </div>
      <div class="steps-grid">
        <div class="step-card reveal">
          <span class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </span>
          <div class="step-number">01</div>
          <h3 class="step-title">${tr.home.step1Title}</h3>
          <p class="step-desc">${tr.home.step1Desc}</p>
        </div>
        <div class="step-card reveal reveal-delay-1">
          <span class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </span>
          <div class="step-number">02</div>
          <h3 class="step-title">${tr.home.step2Title}</h3>
          <p class="step-desc">${tr.home.step2Desc}</p>
        </div>
        <div class="step-card reveal reveal-delay-2">
          <span class="step-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </span>
          <div class="step-number">03</div>
          <h3 class="step-title">${tr.home.step3Title}</h3>
          <p class="step-desc">${tr.home.step3Desc}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── FEATURES ──────────────────────────────────────────── -->
  <section class="section features-section" id="features">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Nos avantages' : 'Our advantages'}</div>
        <h2 class="section-title reveal">${tr.home.featuresTitle}</h2>
      </div>
      <div class="grid grid-4">
        <div class="feature-card reveal">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h3 class="feature-title">${tr.home.feature1Title}</h3>
          <p class="feature-desc">${tr.home.feature1Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-1">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h3 class="feature-title">${tr.home.feature2Title}</h3>
          <p class="feature-desc">${tr.home.feature2Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-2">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h3 class="feature-title">${tr.home.feature3Title}</h3>
          <p class="feature-desc">${tr.home.feature3Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-3">
          <div class="feature-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 class="feature-title">${tr.home.feature4Title}</h3>
          <p class="feature-desc">${tr.home.feature4Desc}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── BLOOD TYPES ───────────────────────────────────────── -->
  <section class="section" style="background:white;" id="blood-types">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Tous les groupes' : 'All blood types'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Tous les Groupes Sanguins Acceptés' : 'All Blood Types Accepted'}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'SONGRE couvre l\'ensemble des groupes sanguins ABO et Rhésus.' : 'SONGRE covers all ABO and Rh blood types.'}</p>
      </div>
      <div class="blood-types flex-center" style="flex-wrap:wrap; gap:1rem; margin-top:2rem;">
        ${['A+','A−','B+','B−','AB+','AB−','O+','O−'].map(t => `<span class="blood-pill reveal">${t}</span>`).join('')}
      </div>
      <p class="text-center text-muted" style="margin-top:2rem; font-size:0.95rem;">
        ${locale === 'fr' 
          ? '<strong>O−</strong> est le groupe sanguin universel. Les porteurs O− peuvent donner à tout le monde.' 
          : '<strong>O−</strong> is the universal blood type. O− donors can give to everyone.'}
      </p>
    </div>
  </section>

  <!-- ── TESTIMONIALS ──────────────────────────────────────── -->
  <section class="section testimonials-section" id="testimonials">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Témoignages' : 'Testimonials'}</div>
        <h2 class="section-title reveal">${tr.home.testimonialsTitle}</h2>
      </div>
      <div class="grid grid-3">
        <article class="testimonial-card reveal">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr' 
            ? '"Grâce à SONGRE, j\'ai pu trouver un donneur de groupe O+ en moins de 20 minutes pour mon fils hospitalisé d\'urgence. Cette application m\'a rendu mon enfant."'
            : '"Thanks to SONGRE, I found an O+ donor in under 20 minutes for my son in emergency. This app gave me back my child."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div><div class="author-name">Aminata K.</div><div class="author-role">${locale === 'fr' ? 'Mère, Ouagadougou' : 'Mother, Ouagadougou'}</div></div>
          </div>
        </article>
        <article class="testimonial-card reveal reveal-delay-1">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr'
            ? '"Je donne du sang depuis 5 ans, mais c\'était toujours compliqué de savoir quand et où. SONGRE a tout simplifié. Je reçois une alerte, je réponds, je donne. C\'est humain."'
            : '"I\'ve been donating blood for 5 years, but it was always complicated to know when and where. SONGRE simplified everything. I get an alert, I respond, I donate. It\'s human."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div><div class="author-name">Ibrahim O.</div><div class="author-role">${locale === 'fr' ? 'Donneur régulier, Bobo-Dioulasso' : 'Regular donor, Bobo-Dioulasso'}</div></div>
          </div>
        </article>
        <article class="testimonial-card reveal reveal-delay-2">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr'
            ? '"En tant que médecin, je recommande SONGRE à tous mes patients et collègues. L\'anonymat et la rapidité du système sont exactement ce dont nos hôpitaux avaient besoin."'
            : '"As a doctor, I recommend SONGRE to all my patients and colleagues. The anonymity and speed of the system is exactly what our hospitals needed."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div><div class="author-name">Dr. Fatoumata S.</div><div class="author-role">${locale === 'fr' ? 'Médecin, CHU Yalgado' : 'Doctor, CHU Yalgado'}</div></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ── IMPACT ─────────────────────────────────────────────── -->
  <section class="section" style="background:var(--bg);" id="impact">
    <div class="container">
      <div class="grid grid-2" style="gap:4rem; align-items:center;">
        <div class="reveal-left">
          <div class="section-badge mb-3">${locale === 'fr' ? 'Notre Engagement' : 'Our Commitment'}</div>
          <h2 style="margin-bottom:1.5rem;">${locale === 'fr' ? 'Pourquoi SONGRE compte' : 'Why SONGRE matters'}</h2>
          <p style="color:var(--text-muted); margin-bottom:2rem;">${locale === 'fr' ? 'Au Burkina Faso, la pénurie de sang est une réalité quotidienne. SONGRE est une réponse concrète et sécurisée.' : 'In Burkina Faso, blood shortage is a daily reality. SONGRE is a concrete and secure response.'}</p>
          <div class="grid grid-2" style="gap:1.5rem;">
            ${[
              { label: locale === 'fr' ? 'Groupes sanguins' : 'Blood types', value: '8',
                svgIcon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>' },
              { label: locale === 'fr' ? 'Anonymat garanti' : 'Guaranteed privacy', value: '100%',
                svgIcon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' },
              { label: locale === 'fr' ? 'Alerte envoyée' : 'Alert sent', value: '<30s',
                svgIcon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
              { label: locale === 'fr' ? 'Disponibilité' : 'Availability', value: '24/7',
                svgIcon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
            ].map(stat => `
              <div class="impact-stat-card">
                <div class="impact-stat-icon">${stat.svgIcon}</div>
                <div class="impact-stat-val">${stat.value}</div>
                <div class="impact-stat-label">${stat.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="reveal-right">
          <div class="impact-visual">
            <div class="impact-circle"></div>
            <div class="impact-circle"></div>
            <div class="impact-data-card">
              <div class="data-card-title">${locale === 'fr' ? 'Comment ça marche' : 'How it works'}</div>
              <div class="data-card-row">
                <span>1</span>
                <span class="text-primary">${locale === 'fr' ? 'Inscription anonyme' : 'Anonymous sign-up'}</span>
              </div>
              <div class="data-card-row">
                <span>2</span>
                <span class="text-primary">${locale === 'fr' ? 'Alerte reçue' : 'Alert received'}</span>
              </div>
              <div class="data-card-row">
                <span>3</span>
                <span class="text-primary">${locale === 'fr' ? 'Don effectué' : 'Donation made'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── APP SHOWCASE ──────────────────────────────────────── -->
  <section class="section app-showcase-section" id="app-showcase">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">${locale === 'fr' ? 'Dans l\'application' : 'Inside the app'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Découvrez SONGRE en action' : 'See SONGRE in action'}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'Publier une demande et gérer son profil de donneur, en toute simplicité.' : 'Post a request and manage your donor profile, with total simplicity.'}</p>
      </div>
      <div class="app-showcase-grid">

        <div class="showcase-phone-wrap reveal">
          <div class="hero-phone-mockup showcase-phone" role="img" aria-label="${locale === 'fr' ? 'Créer une demande sur SONGRE' : 'Create a request on SONGRE'}">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="phone-topbar">
                <div class="phone-icon-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </div>
                <div class="phone-brand"><span>${locale === 'fr' ? 'Nouvelle demande' : 'New request'}</span></div>
                <div style="width:26px;"></div>
              </div>
              <div class="phone-field">
                <label>${locale === 'fr' ? 'Groupe sanguin recherché' : 'Blood type needed'}</label>
                <div class="phone-select">O− <span>▾</span></div>
              </div>
              <div class="phone-field">
                <label>${locale === 'fr' ? 'Ville' : 'City'}</label>
                <div class="phone-select">Ouagadougou <span>▾</span></div>
              </div>
              <div class="phone-field">
                <label>${locale === 'fr' ? 'Structure sanitaire' : 'Health facility'}</label>
                <div class="phone-select">CHU Yalgado Ouédraogo <span>▾</span></div>
              </div>
              <button class="phone-btn-primary">${locale === 'fr' ? 'Publier la demande' : 'Post the request'}</button>
            </div>
          </div>
          <p class="showcase-phone-caption">${locale === 'fr' ? 'Créer une demande' : 'Create a request'}</p>
        </div>

        <div class="showcase-phone-wrap reveal reveal-delay-1">
          <div class="hero-phone-mockup showcase-phone" role="img" aria-label="${locale === 'fr' ? 'Profil donneur SONGRE' : 'SONGRE donor profile'}">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <div class="phone-topbar">
                <div style="width:26px;"></div>
                <div class="phone-brand"><span>${locale === 'fr' ? 'Mon profil' : 'My profile'}</span></div>
                <div class="phone-icon-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
              </div>
              <div class="phone-avatar">O+</div>
              <div class="phone-profile-name">${locale === 'fr' ? 'Donneur SONGRE' : 'SONGRE Donor'}</div>
              <div class="phone-profile-sub">${locale === 'fr' ? 'Ouagadougou' : 'Ouagadougou'}</div>
              <div class="phone-toggle-card">
                <div>
                  <div class="phone-toggle-title">${locale === 'fr' ? 'Disponible' : 'Available'}</div>
                  <div class="phone-toggle-sub">${locale === 'fr' ? 'Visible pour les demandes compatibles' : 'Visible for compatible requests'}</div>
                </div>
                <div class="phone-switch"></div>
              </div>
              <div class="phone-info-row"><span>${locale === 'fr' ? 'Groupe sanguin' : 'Blood type'}</span><strong>O+</strong></div>
              <div class="phone-info-row"><span>${locale === 'fr' ? 'Dernier don' : 'Last donation'}</span><strong>12 mai 2026</strong></div>
            </div>
          </div>
          <p class="showcase-phone-caption">${locale === 'fr' ? 'Mon profil' : 'My profile'}</p>
        </div>

      </div>
    </div>
  </section>
  `;

  return layout(locale, path, generateHead(seo, baseUrl), content);
}
