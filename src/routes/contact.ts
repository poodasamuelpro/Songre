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
      <div class="page-hero-badge reveal">✉️ Contact</div>
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
          <div class="section-badge mb-3 reveal">📬 ${locale === 'fr' ? 'Restons en contact' : 'Stay in touch'}</div>
          <h2 style="margin-bottom:1rem;" class="reveal">${locale === 'fr' ? 'Nous sommes là pour vous' : 'We\'re here for you'}</h2>
          <p style="color:var(--text-muted); margin-bottom:2.5rem;" class="reveal">${locale === 'fr' ? 'Que vous ayez une question, une suggestion, ou que vous souhaitiez rejoindre notre réseau de partenaires, nous sommes disponibles.' : 'Whether you have a question, a suggestion, or want to join our partner network, we are available.'}</p>

          <div class="contact-item reveal">
            <div class="contact-item-icon">📧</div>
            <div class="contact-item-text">
              <strong>Email</strong>
              <span>songre.contact@gmail.com</span>
            </div>
          </div>
          <div class="contact-item reveal">
            <div class="contact-item-icon">📍</div>
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
            <div class="contact-item-icon">⏰</div>
            <div class="contact-item-text">
              <strong>${locale === 'fr' ? 'Disponibilité' : 'Availability'}</strong>
              <span>${locale === 'fr' ? 'Lun–Ven : 8h–18h (GMT+0) | Urgences : 24h/24' : 'Mon–Fri: 8am–6pm (GMT+0) | Emergencies: 24/7'}</span>
            </div>
          </div>

          <!-- Response Time -->
          <div style="margin-top:2rem; padding:1.5rem; background:var(--success-light); border-radius:var(--radius-md); border:1px solid rgba(47,125,92,0.2);" class="reveal">
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">
              <span style="font-size:1.5rem;">⚡</span>
              <strong style="color:var(--success);">${locale === 'fr' ? 'Réponse rapide garantie' : 'Fast response guaranteed'}</strong>
            </div>
            <p style="color:var(--text-muted); font-size:0.9rem;">${locale === 'fr' ? 'Nous répondons à tous les messages dans un délai maximum de 24 heures ouvrables.' : 'We respond to all messages within a maximum of 24 business hours.'}</p>
          </div>

          <!-- Social Links -->
          <div style="margin-top:2rem;" class="reveal">
            <p style="font-weight:600; margin-bottom:1rem; font-size:0.9rem;">${locale === 'fr' ? 'Suivez-nous :' : 'Follow us:'}</p>
            <div style="display:flex; gap:1rem;">
              ${[
                { href: 'https://facebook.com/songre.bf', icon: 'Facebook', emoji: '📘' },
                { href: 'https://twitter.com/songre_bf', icon: 'Twitter', emoji: '🐦' },
                { href: 'https://instagram.com/songre_bf', icon: 'Instagram', emoji: '📸' },
              ].map(s => `
                <a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.icon}"
                   style="width:42px; height:42px; border-radius:50%; background:var(--primary-ultra-light); color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:1.25rem; text-decoration:none; border:1px solid rgba(200,30,58,0.15); transition:all var(--transition);"
                   onmouseover="this.style.background='var(--primary)'; this.style.color='white';"
                   onmouseout="this.style.background='var(--primary-ultra-light)'; this.style.color='var(--primary)';">
                  ${s.emoji}
                </a>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Form Column -->
        <div class="reveal-right">
          <div class="contact-form">
            <h3 style="margin-bottom:1.5rem; font-size:1.2rem;">${locale === 'fr' ? '✉️ Envoyer un message' : '✉️ Send a message'}</h3>

            <div id="alertSuccess" class="form-alert success" role="alert">
              ✅ ${tr.contact.successMsg}
            </div>
            <div id="alertError" class="form-alert error" role="alert">
              ❌ ${tr.contact.errorMsg}
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
                <span class="btn-text">📤 ${tr.contact.send}</span>
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
        <div style="display:inline-flex; gap:1rem;">
          <span class="cert-badge">🌍 UTC+0 (GMT)</span>
          <span class="cert-badge">📱 +226</span>
        </div>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl);
  return layout(locale, path, head, content);
}
