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
    foundingDate: '2023',
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
            <span>🩸</span>
            <span>${locale === 'fr' ? 'Plateforme officielle Burkina Faso' : 'Official Burkina Faso Platform'}</span>
          </div>
          <h1 class="hero-title reveal">
            ${tr.home.heroTitle}
            <span class="hero-title-accent">${tr.home.heroSubtitle}</span>
          </h1>
          <p class="hero-desc reveal reveal-delay-1">${tr.home.heroParagraph}</p>
          <div class="hero-actions reveal reveal-delay-2">
            <a href="#download" class="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.37c1.57.07 2.65.83 3.57.9 1.36-.28 2.66-1.05 4.1-.95 1.72.14 3.04.82 3.87 2.1-3.56 2.12-2.72 7.02.73 8.46-.42 1.12-.98 2.22-1.27 2.4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              ${tr.cta.downloadIos}
            </a>
            <a href="${locale === 'fr' ? `/${locale}/a-propos` : `/${locale}/about`}" class="btn btn-outline btn-lg">
              ${tr.cta.learnMore} →
            </a>
          </div>
          <div class="hero-trust reveal reveal-delay-3">
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? '100% Anonyme' : '100% Anonymous'}</div>
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? 'Gratuit pour toujours' : 'Forever free'}</div>
            <div class="trust-item"><span class="trust-dot"></span> ${locale === 'fr' ? 'Sécurisé AES-256' : 'AES-256 Secured'}</div>
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
            <div class="phone-screen">
              <div class="phone-header">
                <div class="phone-logo"><img src="/logo-songre.png" alt="SONGRE" width="40" height="40"></div>
                <div class="phone-title">SONGRE</div>
              </div>
              <div class="phone-card">
                <div class="phone-card-header">
                  <div class="blood-type-badge">O+</div>
                  <div class="phone-card-info">
                    <div class="phone-card-title">${locale === 'fr' ? 'Profil Donneur' : 'Donor Profile'}</div>
                    <div class="phone-card-sub">${locale === 'fr' ? 'Actif • Ouagadougou' : 'Active • Ouagadougou'}</div>
                  </div>
                </div>
              </div>
              <div class="phone-alert">
                <div class="alert-icon">🚨</div>
                <div class="alert-text">
                  <strong>${locale === 'fr' ? 'URGENCE PROCHE' : 'NEARBY EMERGENCY'}</strong>
                  ${locale === 'fr' ? 'CHU Yalgado — A+ requis, 2,3 km' : 'CHU Yalgado — A+ needed, 2.3 km'}
                </div>
              </div>
              <div class="phone-btn">${locale === 'fr' ? '✓ Je peux donner' : '✓ I can donate'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── STATS ─────────────────────────────────────────────── -->
  <section class="stats-section" aria-label="${locale === 'fr' ? 'Impact statistiques' : 'Impact statistics'}">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item reveal">
          <span class="stat-number">
            <span class="count-up" data-target="12847" data-suffix="">12 847</span>
            <span class="stat-plus">+</span>
          </span>
          <span class="stat-label">${tr.stats.donors}</span>
        </div>
        <div class="stat-item reveal reveal-delay-1">
          <span class="stat-number">
            <span class="count-up" data-target="3241" data-suffix="">3 241</span>
            <span class="stat-plus">+</span>
          </span>
          <span class="stat-label">${tr.stats.saved}</span>
        </div>
        <div class="stat-item reveal reveal-delay-2">
          <span class="stat-number">
            <span class="count-up" data-target="23" data-suffix="">23</span>
          </span>
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
        <div class="section-badge reveal">✨ ${locale === 'fr' ? 'Simple comme bonjour' : 'Simple as can be'}</div>
        <h2 class="section-title reveal">${tr.home.howTitle}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'En 3 étapes simples, devenez un héros anonyme qui sauve des vies.' : 'In 3 simple steps, become an anonymous hero who saves lives.'}</p>
      </div>
      <div class="steps-grid">
        <div class="step-card reveal">
          <span class="step-icon">📱</span>
          <div class="step-number">01</div>
          <h3 class="step-title">${tr.home.step1Title}</h3>
          <p class="step-desc">${tr.home.step1Desc}</p>
        </div>
        <div class="step-card reveal reveal-delay-1">
          <span class="step-icon">🔔</span>
          <div class="step-number">02</div>
          <h3 class="step-title">${tr.home.step2Title}</h3>
          <p class="step-desc">${tr.home.step2Desc}</p>
        </div>
        <div class="step-card reveal reveal-delay-2">
          <span class="step-icon">❤️</span>
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
        <div class="section-badge reveal">💡 ${locale === 'fr' ? 'Nos avantages' : 'Our advantages'}</div>
        <h2 class="section-title reveal">${tr.home.featuresTitle}</h2>
      </div>
      <div class="grid grid-4">
        <div class="feature-card reveal">
          <div class="feature-icon">🔒</div>
          <h3 class="feature-title">${tr.home.feature1Title}</h3>
          <p class="feature-desc">${tr.home.feature1Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-1">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">${tr.home.feature2Title}</h3>
          <p class="feature-desc">${tr.home.feature2Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-2">
          <div class="feature-icon">💚</div>
          <h3 class="feature-title">${tr.home.feature3Title}</h3>
          <p class="feature-desc">${tr.home.feature3Desc}</p>
        </div>
        <div class="feature-card reveal reveal-delay-3">
          <div class="feature-icon">⚖️</div>
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
        <div class="section-badge reveal">🩸 ${locale === 'fr' ? 'Tous les groupes' : 'All blood types'}</div>
        <h2 class="section-title reveal">${locale === 'fr' ? 'Tous les Groupes Sanguins Acceptés' : 'All Blood Types Accepted'}</h2>
        <p class="section-desc reveal">${locale === 'fr' ? 'SONGRE couvre l\'ensemble des groupes sanguins ABO et Rhésus.' : 'SONGRE covers all ABO and Rh blood types.'}</p>
      </div>
      <div class="blood-types flex-center" style="flex-wrap:wrap; gap:1rem; margin-top:2rem;">
        ${['A+','A−','B+','B−','AB+','AB−','O+','O−'].map(t => `<span class="blood-pill reveal">${t}</span>`).join('')}
      </div>
      <p class="text-center text-muted" style="margin-top:2rem; font-size:0.95rem;">
        ${locale === 'fr' 
          ? '🩸 <strong>O−</strong> est le groupe sanguin universel. Les porteurs O− peuvent donner à tout le monde.' 
          : '🩸 <strong>O−</strong> is the universal blood type. O− donors can give to everyone.'}
      </p>
    </div>
  </section>

  <!-- ── TESTIMONIALS ──────────────────────────────────────── -->
  <section class="section testimonials-section" id="testimonials">
    <div class="container">
      <div class="section-header text-center">
        <div class="section-badge reveal">💬 ${locale === 'fr' ? 'Témoignages' : 'Testimonials'}</div>
        <h2 class="section-title reveal">${tr.home.testimonialsTitle}</h2>
      </div>
      <div class="grid grid-3">
        <article class="testimonial-card reveal">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr' 
            ? '"Grâce à SONGRE, j\'ai pu trouver un donneur de groupe O+ en moins de 20 minutes pour mon fils hospitalisé d\'urgence. Cette application m\'a rendu mon enfant."'
            : '"Thanks to SONGRE, I found an O+ donor in under 20 minutes for my son in emergency. This app gave me back my child."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar">👩🏾</div>
            <div><div class="author-name">Aminata K.</div><div class="author-role">${locale === 'fr' ? 'Mère, Ouagadougou' : 'Mother, Ouagadougou'}</div></div>
          </div>
        </article>
        <article class="testimonial-card reveal reveal-delay-1">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr'
            ? '"Je donne du sang depuis 5 ans, mais c\'était toujours compliqué de savoir quand et où. SONGRE a tout simplifié. Je reçois une alerte, je réponds, je donne. C\'est humain."'
            : '"I\'ve been donating blood for 5 years, but it was always complicated to know when and where. SONGRE simplified everything. I get an alert, I respond, I donate. It\'s human."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar">👨🏾</div>
            <div><div class="author-name">Ibrahim O.</div><div class="author-role">${locale === 'fr' ? 'Donneur régulier, Bobo-Dioulasso' : 'Regular donor, Bobo-Dioulasso'}</div></div>
          </div>
        </article>
        <article class="testimonial-card reveal reveal-delay-2">
          <div class="stars">★★★★★</div>
          <p class="testimonial-text">${locale === 'fr'
            ? '"En tant que médecin, je recommande SONGRE à tous mes patients et collègues. L\'anonymat et la rapidité du système sont exactement ce dont nos hôpitaux avaient besoin."'
            : '"As a doctor, I recommend SONGRE to all my patients and colleagues. The anonymity and speed of the system is exactly what our hospitals needed."'}</p>
          <div class="testimonial-author">
            <div class="author-avatar">👩🏾‍⚕️</div>
            <div><div class="author-name">Dr. Fatoumata S.</div><div class="author-role">${locale === 'fr' ? 'Médecin, CHU Yalgado' : 'Doctor, CHU Yalgado'}</div></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ── IMPACT ─────────────────────────────────────────────── -->
  <section class="section" style="background:var(--bg);" id="impact">
    <div class="container">
      <div class="grid" style="grid-template-columns:1fr 1fr; gap:4rem; align-items:center;">
        <div class="reveal-left">
          <div class="section-badge mb-3">📊 ${locale === 'fr' ? 'Notre Impact' : 'Our Impact'}</div>
          <h2 style="margin-bottom:1.5rem;">${tr.home.impactTitle}</h2>
          <p style="color:var(--text-muted); margin-bottom:2rem;">${tr.home.impactDesc}</p>
          <div class="grid" style="grid-template-columns:1fr 1fr; gap:1.5rem;">
            ${[
              { label: locale === 'fr' ? 'Groupes sanguins' : 'Blood types', value: '8', icon: '🩸' },
              { label: locale === 'fr' ? 'Centres partenaires' : 'Partner centers', value: '47+', icon: '🏥' },
              { label: locale === 'fr' ? 'Taux de réponse' : 'Response rate', value: '94%', icon: '✅' },
              { label: locale === 'fr' ? 'Note moyenne' : 'Average rating', value: '4.9/5', icon: '⭐' },
            ].map(stat => `
              <div class="impact-stat-card">
                <div class="impact-stat-icon">${stat.icon}</div>
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
              <div class="data-card-title">${locale === 'fr' ? 'Données en temps réel' : 'Real-time data'}</div>
              <div class="data-card-row">
                <span>${locale === 'fr' ? 'Poches requises' : 'Units needed'}</span>
                <span class="text-primary">124</span>
              </div>
              <div class="data-card-row">
                <span>${locale === 'fr' ? 'Donneurs actifs' : 'Active donors'}</span>
                <span class="text-primary">2,841</span>
              </div>
              <div class="data-card-progress">
                <div class="progress-bar" style="width: 85%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return layout(locale, path, generateHead(seo, baseUrl), content);
}
