import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

// Formspree endpoint — remplacer par le vrai ID Formspree
// const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzpwvbp'; // Commented out as no longer used

export function contactPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].contact;

  const content = `
  <!-- ── PAGE HERO ─────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'Contact' : 'Contact'}</span>
      </nav>
      <div class="page-hero-badge reveal">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Contact
      </div>
      <h1 class="page-hero-title reveal">${tr.contact.title}</h1>
      <p class="page-hero-desc reveal">${tr.contact.subtitle}</p>
    </div>
  </div>

  <!-- ── CONTACT SECTION ───────────────────────────────────── -->
  <section class="section contact-section">
    <div class="container">
      <div class="contact-grid">
        <!-- Info Column -->
        <div>
          <div class="section-badge mb-3 reveal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            ${locale === 'fr' ? 'Restons en contact' : 'Stay in touch'}
          </div>
          <h2 style="margin-bottom:1rem;" class="reveal">${locale === 'fr' ? 'Nous sommes là pour vous' : 'We\'re here for you'}</h2>
          <p style="color:var(--text-muted); margin-bottom:2.5rem;" class="reveal">${locale === 'fr' ? 'Que vous ayez une question, une suggestion, ou que vous souhaitiez rejoindre notre réseau de partenaires, nous sommes disponibles.' : 'Whether you have a question, a suggestion, or want to join our partner network, we are available.'}</p>

          <div class="contact-item reveal">
            <div class="contact-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div class="contact-item-text">
              <strong>Email</strong>
              <span>songre.contact@gmail.com</span>
            </div>
          </div>
          <div class="contact-item reveal">
            <div class="contact-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="contact-item-text">
              <strong>${locale === 'fr' ? 'Adresse' : 'Address'}</strong>
              <span>Ouagadougou, Burkina Faso</span>
            </div>
          </div>
          <div class="contact-item reveal">
            <div class="contact-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.72 3.34 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 5.99 5.99l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="contact-item-text">
              <strong>${locale === 'fr' ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}</strong>
              <span>+226 77 98 02 64</span>
            </div>
          </div>
          <div class="contact-item reveal">
            <div class="contact-item-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="contact-item-text">
              <strong>${locale === 'fr' ? 'Disponibilité' : 'Availability'}</strong>
              <span>${locale === 'fr' ? 'Lun–Ven : 8h30–17h (GMT+0) | Urgences : 24h/24' : 'Mon–Fri: 8:30am–5pm (GMT+0) | Emergencies: 24/7'}</span>
            </div>
          </div>

          <!-- Response Time -->
          <div style="margin-top:2rem; padding:1.5rem; background:var(--success-light); border-radius:var(--radius-md); border:1px solid rgba(47,125,92,0.2);" class="reveal">
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <strong style="color:var(--success);">${locale === 'fr' ? 'Réponse rapide garantie' : 'Fast response guaranteed'}</strong>
            </div>
            <p style="color:var(--text-muted); font-size:0.9rem;">${locale === 'fr' ? 'Nous répondons à tous les messages dans un délai maximum de 72 heures ouvrables.' : 'We respond to all messages within a maximum of 72 business hours.'}</p>
          </div>

          <!-- Social Links -->
          <div style="margin-top:2rem;" class="reveal">
            <p style="font-weight:600; margin-bottom:1rem; font-size:0.9rem;">${locale === 'fr' ? 'Suivez-nous :' : 'Follow us:'}</p>
            <div style="display:flex; gap:1rem;">
              ${[
                { href: 'https://facebook.com/songre.bf', icon: 'Facebook', svg: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>' },
                { href: 'https://tiktok.com/@songre.bf', icon: 'TikTok', svg: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>' },
                { href: 'https://instagram.com/songre_bf', icon: 'Instagram', svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>' },
                { href: 'https://linkedin.com/company/songre-bf', icon: 'LinkedIn', svg: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' },
              ].map(s => `
                <a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.icon}"
                   style="width:42px; height:42px; border-radius:50%; background:var(--primary-ultra-light); color:var(--primary); display:flex; align-items:center; justify-content:center; text-decoration:none; border:1px solid rgba(200,30,58,0.15); transition:all var(--transition);"
                   onmouseover="this.style.background='var(--primary)'; this.style.color='white';"
                   onmouseout="this.style.background='var(--primary-ultra-light)'; this.style.color='var(--primary)';">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">${s.svg}</svg>
                </a>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Form Column -->
        <div class="reveal-right">
          <div class="contact-form">
            <h3 style="margin-bottom:1.5rem; font-size:1.2rem;">${locale === 'fr' ? 'Envoyer un message' : 'Send a message'}</h3>

            <div id="alertSuccess" class="form-alert success" role="alert" style="display:flex; align-items:center; gap:0.6rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 17"></polyline></svg>
              <span>${tr.contact.successMsg}</span>
            </div>
            <div id="alertError" class="form-alert error" role="alert" style="display:flex; align-items:center; gap:0.6rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span>${tr.contact.errorMsg}</span>
            </div>

            <form id="contactForm" action="/api/contact" method="POST" novalidate>
              <input type="hidden" name="_language" value="${locale}">
              <input type="hidden" name="_subject" value="[SONGRE] Nouveau message de contact">

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-name">${locale === 'fr' ? 'Nom complet' : 'Full name'} <span style="color:var(--primary)">*</span></label>
                  <input type="text" id="contact-name" name="name" class="form-control"
                    placeholder="${tr.contact.namePlaceholder}" required
                    autocomplete="name" minlength="2">
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">${locale === 'fr' ? 'Email' : 'Email'} <span style="color:var(--primary)">*</span></label>
                  <input type="email" id="contact-email" name="email" class="form-control"
                    placeholder="${tr.contact.emailPlaceholder}" required
                    autocomplete="email">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-subject">${locale === 'fr' ? 'Sujet' : 'Subject'} <span style="color:var(--primary)">*</span></label>
                <select id="contact-subject" name="subject" class="form-control" required>
                  <option value="">${locale === 'fr' ? '— Choisissez un sujet —' : '— Choose a subject —'}</option>
                  <option value="question-generale">${locale === 'fr' ? 'Question générale' : 'General question'}</option>
                  <option value="probleme-technique">${locale === 'fr' ? 'Problème technique' : 'Technical issue'}</option>
                  <option value="partenariat">${locale === 'fr' ? 'Proposition de partenariat' : 'Partnership proposal'}</option>
                  <option value="media">${locale === 'fr' ? 'Demande médias / presse' : 'Media / press request'}</option>
                  <option value="don-sang">${locale === 'fr' ? 'Question sur le don de sang' : 'Blood donation question'}</option>
                  <option value="signalement">${locale === 'fr' ? 'Signalement' : 'Report'}</option>
                  <option value="autre">${locale === 'fr' ? 'Autre' : 'Other'}</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contact-message">${locale === 'fr' ? 'Message' : 'Message'} <span style="color:var(--primary)">*</span></label>
                <textarea id="contact-message" name="message" class="form-control"
                  placeholder="${tr.contact.messagePlaceholder}" required
                  minlength="20" style="min-height:180px;"></textarea>
              </div>

              <!-- RGPD Consent -->
              <div class="form-group" style="display:flex; gap:0.75rem; align-items:flex-start;">
                <input type="checkbox" id="contact-consent" name="gdpr_consent" value="yes" required
                  style="margin-top:0.2rem; accent-color:var(--primary); width:16px; height:16px; flex-shrink:0;">
                <label for="contact-consent" style="font-size:0.85rem; color:var(--text-muted); cursor:pointer; line-height:1.5;">
                  ${locale === 'fr'
                    ? `J'accepte que mes données soient traitées par SONGRE pour répondre à ma demande. Voir la <a href="/fr/confidentialite" style="color:var(--primary);">Politique de Confidentialité</a>.`
                    : `I agree that my data will be processed by SONGRE to respond to my request. See the <a href="/en/privacy" style="color:var(--primary);">Privacy Policy</a>.`}
                </label>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;" id="submitBtn">
                <div class="spinner" aria-hidden="true"></div>
                <span class="btn-text" style="display:inline-flex; align-items:center; gap:0.5rem;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  ${tr.contact.send}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── MAP / LOCATION ────────────────────────────────────── -->
  <section class="section-sm" style="background:var(--bg);">
    <div class="container text-center">
      <div style="background:white; border-radius:var(--radius-lg); padding:3rem; box-shadow:var(--shadow-sm); border:1px solid var(--border);" class="reveal">
        <div style="font-size:3rem; margin-bottom:1rem;">🇧🇫</div>
        <h3 style="margin-bottom:0.5rem;">${locale === 'fr' ? 'Basés à Ouagadougou' : 'Based in Ouagadougou'}</h3>
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">${locale === 'fr' ? 'Ouagadougou, Burkina Faso, Afrique de l\'Ouest' : 'Ouagadougou, Burkina Faso, West Africa'}</p>
        <div style="display:inline-flex; gap:1rem; flex-wrap:wrap;">
          <span class="cert-badge" style="display:inline-flex; align-items:center; gap:0.4rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            UTC+0 (GMT)
          </span>
          <span class="cert-badge" style="display:inline-flex; align-items:center; gap:0.4rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.72 3.34 2 2 0 0 1 3.68 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 5.99 5.99l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +226 77 98 02 64
          </span>
        </div>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl);
  return layout(locale, path, head, content);
}
