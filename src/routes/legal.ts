import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

const iconDocument = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
const iconLink = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
const iconShield = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
const iconLock = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

// ─── CGU / Terms Page ─────────────────────────────────────────────────────
export function cguPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale][locale === 'fr' ? 'cgu' : 'terms'];
  const prefix = locale === 'fr' ? '/fr' : '/en';

  const frContent = `
  <h2>1. Objet et champ d'application</h2>
  <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme SONGRE, accessible via l'application mobile SONGRE.</p>
  <p>SONGRE est une plateforme de mise en relation entre donneurs de sang bénévoles et patients ou établissements de santé au Burkina Faso. L'utilisation de SONGRE implique l'acceptation pleine et entière des présentes CGU.</p>

  <h2>2. Définitions</h2>
  <p><strong>"SONGRE"</strong> désigne l'application mobile opérée par SONGRE, basée à Ouagadougou, Burkina Faso.</p>
  <p><strong>"Donneur"</strong> désigne toute personne physique inscrite sur SONGRE en tant que donneur de sang volontaire et bénévole.</p>
  <p><strong>"Demandeur"</strong> désigne toute personne physique, établissement de santé ou tiers agissant au nom d'un patient, qui publie une demande de sang via SONGRE.</p>
  <p><strong>"Service"</strong> désigne l'ensemble des fonctionnalités proposées par SONGRE, incluant le système d'alerte aux donneurs et le système de mise en relation entre donneurs et demandeurs.</p>

  <h2>3. Accès au Service</h2>
  <p>L'accès à SONGRE est gratuit et ouvert à toute personne résidant au Burkina Faso ou souhaitant contribuer au don de sang sur le territoire burkinabè.</p>
  <p>L'inscription requiert :</p>
  <ul>
    <li>Être âgé d'au moins 18 ans ;</li>
    <li>Disposer d'un accès à internet ;</li>
    <li>Accepter les présentes CGU ;</li>
    <li>Fournir des informations exactes lors de l'inscription.</li>
  </ul>

  <h2>4. Responsabilités du Donneur</h2>
  <p>Le donneur s'engage à :</p>
  <ul>
    <li>Fournir des informations médicales exactes (groupe sanguin, état de santé général) ;</li>
    <li>Ne pas se présenter comme donneur s'il sait être dans l'impossibilité médicale de donner ;</li>
    <li>Respecter les délais légaux entre deux dons (3 mois pour les hommes, 4 mois pour les femmes) ;</li>
    <li>Ne pas percevoir de rémunération pour un don facilité via SONGRE ;</li>
    <li>Informer SONGRE de tout changement significatif de son état de santé.</li>
  </ul>

  <h2>5. Responsabilités du Demandeur</h2>
  <p>Le demandeur s'engage à :</p>
  <ul>
    <li>Ne publier que des demandes légitimes et vérifiées ;</li>
    <li>Ne pas utiliser SONGRE à des fins commerciales de revente de sang ;</li>
    <li>Respecter l'anonymat du donneur ;</li>
    <li>Orienter le donneur vers un établissement médical agréé ;</li>
    <li>Ne pas harceler les donneurs ayant refusé de répondre à une alerte.</li>
  </ul>

  <h2>6. Médiation Médicale</h2>
  <p>SONGRE est une plateforme de <strong>mise en relation uniquement</strong>. SONGRE n'est pas un prestataire médical, n'effectue pas de collecte de sang et n'est pas responsable des actes médicaux réalisés lors du don.</p>
  <p>Tout don de sang doit obligatoirement être réalisé dans un centre de santé ou établissement médical agréé par le Ministère de la Santé du Burkina Faso. SONGRE décline toute responsabilité pour les dons réalisés en dehors de ce cadre.</p>

  <h2>7. Gratuité et Interdiction de Commerce</h2>
  <p>Le don de sang est un acte entièrement gratuit et bénévole. Il est formellement interdit via SONGRE de :</p>
  <ul>
    <li>Proposer ou percevoir une rémunération pour un don de sang ;</li>
    <li>Commercialiser des informations sur des donneurs ;</li>
    <li>Utiliser SONGRE pour toute activité commerciale liée au sang.</li>
  </ul>
  <p>Tout manquement entraîne la suspension immédiate du compte et peut faire l'objet de poursuites judiciaires conformément au droit burkinabè.</p>

  <h2>8. Propriété Intellectuelle</h2>
  <p>L'ensemble des éléments constituant SONGRE (logo, code source, design, contenu éditorial) sont la propriété exclusive de SONGRE. Toute reproduction, même partielle, sans autorisation préalable écrite est strictement interdite.</p>

  <h2>9. Limitation de Responsabilité</h2>
  <p>SONGRE s'efforce d'assurer la disponibilité du service 24h/24, 7j/7, mais ne peut garantir une disponibilité ininterrompue. SONGRE ne saurait être tenu responsable en cas d'indisponibilité temporaire due à des maintenances ou à des défaillances techniques.</p>
  <p>SONGRE ne peut garantir la disponibilité d'un donneur compatible dans un délai donné. La plateforme est un outil de mise en relation et non un service médical d'urgence.</p>

  <h2>10. Modification des CGU</h2>
  <p>SONGRE se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par notification dans l'application 15 jours avant l'entrée en vigueur des nouvelles conditions.</p>

  <h2>11. Droit Applicable et Juridiction</h2>
  <p>Les présentes CGU sont soumises au droit burkinabè. En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut d'accord, les tribunaux compétents de Ouagadougou, Burkina Faso, auront compétence exclusive.</p>

  <h2>12. Contact</h2>
  <p>Pour toute question relative aux présentes CGU, contactez-nous à :</p>
  <ul>
    <li>Email : <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a></li>
    <li>Téléphone / WhatsApp : +226 77 98 02 64</li>
  </ul>
  `;

  const enContent = `
  <h2>1. Purpose and Scope</h2>
  <p>These Terms of Service (ToS) govern access to and use of the SONGRE platform, accessible via the SONGRE mobile app.</p>
  <p>SONGRE is a platform connecting voluntary blood donors with patients or healthcare facilities in Burkina Faso. Use of SONGRE implies full acceptance of these Terms.</p>

  <h2>2. Definitions</h2>
  <p><strong>"SONGRE"</strong> means the SONGRE mobile app operated by SONGRE, based in Ouagadougou, Burkina Faso.</p>
  <p><strong>"Donor"</strong> means any individual registered on SONGRE as a voluntary blood donor.</p>
  <p><strong>"Requester"</strong> means any individual, healthcare facility or third party acting on behalf of a patient, who publishes a blood request via SONGRE.</p>

  <h2>3. Access to Service</h2>
  <p>Access to SONGRE is free and open to anyone residing in Burkina Faso or wishing to contribute to blood donation on Burkinabè territory. Registration requires being at least 18 years old and accepting these Terms.</p>

  <h2>4. Donor Responsibilities</h2>
  <p>The donor agrees to provide accurate medical information, not present themselves as a donor if medically unable, respect legal intervals between donations, and not receive payment for donations facilitated via SONGRE.</p>

  <h2>5. Medical Mediation</h2>
  <p>SONGRE is a <strong>connection platform only</strong>. SONGRE is not a medical provider and is not responsible for medical acts performed during donation. All blood donations must be carried out in a healthcare center approved by Burkina Faso's Ministry of Health.</p>

  <h2>6. Gratuity and Commerce Prohibition</h2>
  <p>Blood donation is a completely free and voluntary act. It is strictly prohibited via SONGRE to offer or receive remuneration for blood donation or to commercialize donor information.</p>

  <h2>7. Intellectual Property</h2>
  <p>All elements constituting SONGRE (logo, source code, design, editorial content) are the exclusive property of SONGRE.</p>

  <h2>8. Limitation of Liability</h2>
  <p>SONGRE strives to ensure 24/7 availability but cannot guarantee uninterrupted service. SONGRE cannot guarantee the availability of a compatible donor within a given timeframe.</p>

  <h2>9. Applicable Law</h2>
  <p>These Terms are governed by Burkinabè law. Any disputes shall be submitted to the competent courts of Ouagadougou, Burkina Faso.</p>

  <h2>10. Contact</h2>
  <p>For questions regarding these Terms:</p>
  <ul>
    <li>Email: <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a></li>
    <li>Phone / WhatsApp: +226 77 98 02 64</li>
  </ul>
  `;

  const content = `
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'CGU' : 'Terms'}</span>
      </nav>
      <div class="page-hero-badge reveal">${iconDocument} ${locale === 'fr' ? 'Documents Légaux' : 'Legal Documents'}</div>
      <h1 class="page-hero-title reveal">${tr.cgu.title}</h1>
      <p class="page-hero-desc reveal">${locale === 'fr' ? 'Le cadre juridique qui régit votre utilisation de SONGRE.' : 'The legal framework governing your use of SONGRE.'}</p>
    </div>
  </div>
  <section class="section legal-section">
    <div class="container">
      <div class="legal-content">
        <div class="legal-date">${iconDocument} ${tr.cgu.lastUpdate}</div>
        ${locale === 'fr' ? frContent : enContent}
        <div style="margin-top:3rem; padding:1.5rem; background:var(--primary-ultra-light); border-radius:var(--radius-md); border:1px solid rgba(200,30,58,0.15);">
          <h3 style="margin-bottom:0.75rem; font-size:1rem; display:flex; align-items:center; gap:0.5rem;">${iconLink} ${locale === 'fr' ? 'Documents connexes' : 'Related documents'}</h3>
          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <a href="${prefix}/${locale === 'fr' ? 'confidentialite' : 'privacy'}" class="btn btn-outline btn-sm">${locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}</a>
            <a href="${prefix}/contact" class="btn btn-outline btn-sm">${locale === 'fr' ? 'Nous contacter' : 'Contact us'}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl);
  return layout(locale, path, head, content);
}

// ─── Privacy Policy Page ──────────────────────────────────────────────────
export function privacyPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].privacy;
  const prefix = locale === 'fr' ? '/fr' : '/en';

  const frContent = `
  <h2>1. Qui Sommes-Nous ?</h2>
  <p>SONGRE est une plateforme numérique de mise en relation pour le don de sang, opérée par SONGRE, basée à Ouagadougou, Burkina Faso. Contact : <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a></p>
  <p>Cette politique de confidentialité est rédigée en conformité avec la loi burkinabè n°001-2021/AN du 30 mars 2021 portant protection des personnes à l'égard du traitement des données à caractère personnel.</p>

  <h2>2. Données Collectées</h2>
  <h3>2.1 Données d'inscription</h3>
  <ul>
    <li>Groupe sanguin (ABO et Rhésus), stocké anonymisé</li>
    <li>Ville de résidence (approximative, non l'adresse exacte)</li>
    <li>Statut de disponibilité (booléen : disponible/indisponible)</li>
    <li>Date du dernier don (pour respecter les délais légaux)</li>
  </ul>
  <h3>2.2 Données de contact</h3>
  <ul>
    <li>Numéro de téléphone ou adresse email (uniquement pour les notifications)</li>
    <li>Ces données sont chiffrées et leur accès est strictement limité aux besoins du service</li>
  </ul>
  <h3>2.3 Données techniques</h3>
  <ul>
    <li>Journaux de connexion (adresse IP, timestamp), conservés 30 jours maximum</li>
    <li>Version de l'application et système d'exploitation</li>
  </ul>

  <h2>3. Comment Nous Utilisons Vos Données</h2>
  <p>Vos données sont utilisées exclusivement pour :</p>
  <ul>
    <li>Vous envoyer des alertes d'urgence géolocalisées correspondant à votre groupe sanguin ;</li>
    <li>Vous permettre de gérer votre profil de donneur ;</li>
    <li>Améliorer le service et assurer sa sécurité ;</li>
    <li>Vous contacter en cas de problème technique (uniquement si vous avez fourni un email).</li>
  </ul>
  <p>Nous ne faisons jamais de profilage commercial, de ciblage publicitaire, ou d'analyse de comportement à des fins marketing.</p>

  <h2>4. Anonymisation et Protection des Données</h2>
  <p>SONGRE limite au strict nécessaire les informations partagées lors d'une mise en relation :</p>
  <ul>
    <li>Le groupe sanguin, la ville et le statut de disponibilité sont traités de façon anonymisée lors de l'envoi des alertes</li>
    <li>Vos données de contact restent chiffrées et leur accès est strictement limité au personnel habilité</li>
    <li>Un identifiant temporaire à usage unique est généré pour chaque session d'alerte, puis détruit après utilisation</li>
  </ul>

  <h2>5. Partage des Données</h2>
  <p>SONGRE ne partage jamais vos données personnelles avec des tiers à des fins commerciales. Des partages limités peuvent intervenir pour :</p>
  <ul>
    <li>Obligations légales (réquisition judiciaire ou administrative burkinabè) ;</li>
    <li>Hébergement technique (prestataires soumis à des engagements contractuels stricts de confidentialité).</li>
  </ul>

  <h2>6. Conservation des Données</h2>
  <ul>
    <li>Données de profil : conservées tant que le compte est actif, puis supprimées sous 30 jours après demande</li>
    <li>Journaux techniques : 30 jours maximum</li>
    <li>Historique des dons : 2 ans (pour garantir le respect des délais entre dons)</li>
  </ul>

  <h2>7. Vos Droits</h2>
  <p>Conformément à la loi n°001-2021/AN, vous disposez des droits suivants :</p>
  <ul>
    <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
    <li><strong>Droit de rectification :</strong> corriger des informations inexactes</li>
    <li><strong>Droit de suppression :</strong> demander l'effacement de vos données</li>
    <li><strong>Droit d'opposition :</strong> s'opposer à certains traitements</li>
    <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format lisible</li>
  </ul>
  <p>Pour exercer ces droits : <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a>, objet : "Exercice de droits RGPD"</p>

  <h2>8. Sécurité</h2>
  <p>Nous appliquons des mesures de sécurité techniques et organisationnelles conformes à l'état de l'art pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Ces mesures sont revues régulièrement afin de rester adaptées aux risques identifiés.</p>

  <h2>9. Cookies</h2>
  <p>Le site web SONGRE utilise uniquement des cookies techniques essentiels au fonctionnement du service (session, préférences de langue). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p>

  <h2>10. Modifications</h2>
  <p>Toute modification substantielle de cette politique sera notifiée aux utilisateurs via l'application 15 jours avant sa mise en vigueur.</p>

  <h2>11. Contact DPO</h2>
  <p>Pour toute question relative à la protection de vos données :</p>
  <ul>
    <li>Email : <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a>, Objet : "Protection des données"</li>
    <li>Téléphone / WhatsApp : +226 77 98 02 64</li>
  </ul>
  `;

  const enContent = `
  <h2>1. Who Are We?</h2>
  <p>SONGRE is a digital blood donation connection platform operated by SONGRE, based in Ouagadougou, Burkina Faso. Contact: <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a></p>
  <p>This privacy policy is written in compliance with Burkinabè law n°001-2021/AN of March 30, 2021 on the protection of individuals with regard to the processing of personal data.</p>

  <h2>2. Data Collected</h2>
  <h3>2.1 Registration data</h3>
  <ul>
    <li>Blood group (ABO and Rhesus), stored anonymized</li>
    <li>City of residence (approximate, not exact address)</li>
    <li>Availability status (boolean: available/unavailable)</li>
    <li>Date of last donation (to respect legal intervals)</li>
  </ul>
  <h3>2.2 Contact data</h3>
  <ul>
    <li>Phone number or email address (for notifications only)</li>
    <li>This data is encrypted and access is strictly limited to what the service requires</li>
  </ul>

  <h2>3. How We Use Your Data</h2>
  <p>Your data is used exclusively to: send you geolocated emergency alerts, allow you to manage your donor profile, and improve service security.</p>

  <h2>4. Anonymization and Data Protection</h2>
  <p>SONGRE limits shared information to what is strictly necessary during a match: blood type, city and availability are handled anonymously when alerts are sent, and contact data remains encrypted with strictly limited access.</p>

  <h2>5. Your Rights</h2>
  <p>In accordance with law n°001-2021/AN, you have rights of access, rectification, deletion, opposition, and portability. Contact: <a href="mailto:songre.contact@gmail.com">songre.contact@gmail.com</a></p>

  <h2>6. Security</h2>
  <p>We apply technical and organizational security measures consistent with industry standards to protect your data against unauthorized access, loss, or disclosure. These measures are reviewed regularly to remain aligned with identified risks.</p>
  `;

  const content = `
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${locale === 'fr' ? 'Confidentialité' : 'Privacy'}</span>
      </nav>
      <div class="page-hero-badge reveal">${iconShield} ${locale === 'fr' ? 'Protection des Données' : 'Data Protection'}</div>
      <h1 class="page-hero-title reveal">${tr.privacy.title}</h1>
      <p class="page-hero-desc reveal">${locale === 'fr' ? 'Comment nous protégeons vos informations personnelles.' : 'How we protect your personal information.'}</p>
    </div>
  </div>
  <section class="section legal-section">
    <div class="container">
      <div class="legal-content">
        <div class="legal-date">${iconDocument} ${tr.privacy.lastUpdate}</div>
        ${locale === 'fr' ? frContent : enContent}
        <div style="margin-top:3rem; padding:1.5rem; background:var(--success-light); border-radius:var(--radius-md); border:1px solid rgba(47,125,92,0.15);">
          <h3 style="margin-bottom:0.75rem; font-size:1rem; color:var(--success); display:flex; align-items:center; gap:0.5rem;">${iconLock} ${locale === 'fr' ? 'Votre vie privée est sacrée' : 'Your privacy is sacred'}</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:0;">
            ${locale === 'fr' 
              ? 'SONGRE a été conçu dès le premier jour avec la protection de la vie privée comme priorité absolue. Nous ne vendons jamais vos données.' 
              : 'SONGRE was designed from day one with privacy protection as a top priority. We never sell your data.'}
          </p>
        </div>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl);
  return layout(locale, path, head, content);
}
