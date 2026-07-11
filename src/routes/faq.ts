import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

function icon(name: string, size = 18): string {
  const paths: Record<string, string> = {
    droplet: '<path d="M12 2.7 17.7 8.4a8 8 0 1 1-11.4 0Z"/>',
    hospital: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/><path d="M9 9h6M12 6v6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 4.5v2M12 17.5v2M19.5 12h-2M6.5 12h-2M17.3 6.7l-1.4 1.4M8.1 15.9l-1.4 1.4M17.3 17.3l-1.4-1.4M8.1 8.1 6.7 6.7"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-4px;margin-right:6px;flex-shrink:0;" aria-hidden="true">${paths[name] || ''}</svg>`;
}

function faqData(locale: TranslationKey) {
  const fr = [
    {
      cat: 'donors',
      label: `${icon('droplet')}Pour les Donneurs`,
      items: [
        { q: 'Qui peut donner du sang ?', a: 'Toute personne âgée de 18 à 60 ans, pesant au moins 50 kg et en bonne santé peut donner du sang. Certaines conditions médicales peuvent temporairement ou définitivement empêcher le don. Consultez un professionnel de santé en cas de doute.' },
        { q: 'À quelle fréquence puis-je donner ?', a: 'Les hommes peuvent donner tous les 3 mois (jusqu\'à 4 fois par an), les femmes tous les 4 mois (jusqu\'à 3 fois par an). Ces délais permettent à votre organisme de reconstituer ses réserves en globules rouges.' },
        { q: 'Est-ce que ça fait mal de donner du sang ?', a: 'La douleur est minimale. Vous sentirez une légère piqûre au moment de l\'insertion de l\'aiguille, mais le prélèvement lui-même est indolore. La plupart des donneurs ne ressentent aucune douleur pendant ou après le don.' },
        { q: 'Combien de temps dure un don de sang ?', a: 'Le don de sang total dure environ 8 à 10 minutes. Avec l\'accueil, la vérification médicale et le repos post-don, comptez environ 45 à 60 minutes au total.' },
        { q: 'Mon identité sera-t-elle révélée au receveur ?', a: 'Non, jamais. SONGRE garantit un anonymat total et réciproque. Le donneur ne connaît pas le receveur, et le receveur ne connaît pas le donneur ; vos données sont conservées de manière chiffrée et sécurisée pour préserver cette confidentialité à chaque étape.' },
      ],
    },
    {
      cat: 'recipients',
      label: `${icon('hospital')}Pour les Demandeurs`,
      items: [
        { q: 'Comment faire une demande de sang ?', a: 'Depuis l\'application SONGRE, vous pouvez faire une demande de sang en indiquant le groupe sanguin recherché, votre ville, la structure sanitaire concernée ainsi que l\'adresse. Un contact est également demandé, mais il ne sera visible que par les donneurs ayant accepté de répondre à votre demande. SONGRE vous met ensuite en relation avec des donneurs compatibles, selon leur disponibilité, leur groupe sanguin et leur ville.' },
        { q: 'Quel est le délai moyen pour trouver un donneur ?', a: 'La recherche et la notification des donneurs compatibles se font en général assez rapidement. Le délai pour qu\'un donneur accepte et se rende disponible peut en revanche varier, de quelques minutes à plusieurs heures, selon la disponibilité de chacun. Nous recommandons de contacter aussi le centre de transfusion local en parallèle.' },
        { q: 'Le service est-il payant pour les receveurs ?', a: 'L\'application SONGRE est entièrement gratuite pour les donneurs comme pour les receveurs. Nous sommes une organisation à but non lucratif. Le don de sang lui-même est gratuit et bénévole.' },
        { q: 'Puis-je spécifier une ville précise pour la recherche ?', a: 'Oui. Vous indiquez la ville ainsi que la structure sanitaire ou l\'hôpital concerné. SONGRE couvre 23 villes au Burkina Faso avec une densité variable de donneurs.' },
        { q: 'Que faire si aucun donneur ne répond ?', a: 'Si aucun donneur ne répond dans l\'immédiat, SONGRE élargit la recherche aux donneurs compatibles disponibles dans votre ville, en tenant compte de leur dernier don ainsi que de leur statut d\'activation dans l\'application. Nous vous recommandons également de contacter en parallèle le centre de transfusion le plus proche.' },
      ],
    },
    {
      cat: 'technical',
      label: `${icon('settings')}Questions Techniques`,
      items: [
        { q: 'L\'application fonctionne-t-elle sans internet ?', a: 'L\'application nécessite une connexion internet pour envoyer et recevoir des alertes. Cependant, vos informations de profil et l\'historique de vos dons sont disponibles hors ligne.' },
        { q: 'Sur quels appareils puis-je utiliser SONGRE ?', a: 'SONGRE est disponible sur iOS (iPhone 7 et versions ultérieures, iOS 14+) et Android (version 8.0 et supérieure). Un site web responsive est également disponible pour tous les navigateurs modernes.' },
        { q: 'Comment SONGRE trouve-t-il des donneurs près de moi ?', a: 'SONGRE ne s\'appuie pas sur la géolocalisation. Vous indiquez simplement votre ville lors de votre inscription, ce qui permet à l\'application de vous mettre en relation avec des donneurs situés dans la même zone.' },
        { q: 'Que se passe-t-il si je désactive les notifications ?', a: 'Si vous désactivez les notifications, vous ne recevrez plus les alertes d\'urgence. Nous recommandons fortement de les laisser activées si vous souhaitez contribuer activement comme donneur. Vous pouvez les désactiver temporairement si vous êtes indisponible.' },
        { q: 'Comment sont vérifiées les informations de santé des donneurs ?', a: 'Lors de chaque don, le personnel médical du centre de collecte vérifie votre éligibilité selon les protocoles médicaux nationaux. SONGRE ne remplace pas cette vérification médicale, nous facilitons la mise en relation, mais le don lui-même se déroule dans un cadre médical professionnel.' },
      ],
    },
    {
      cat: 'safety',
      label: `${icon('shield')}Sécurité et Confidentialité`,
      items: [
        { q: 'Mes données personnelles sont-elles vendues ?', a: 'Absolument non. SONGRE ne vend, ne loue et ne partage jamais vos données personnelles avec des tiers ; nous n\'avons aucun modèle économique fondé sur l\'exploitation de vos données.' },
        { q: 'Comment puis-je supprimer mon compte ?', a: 'Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l\'application. La suppression est irréversible et entraîne l\'effacement complet de toutes vos données dans un délai de 30 jours conformément à la loi burkinabè.' },
        { q: 'Qui a accès à mes données ?', a: 'Vos données sont chiffrées, y compris au sein même de nos bases de données, ce qui rend leur accès extrêmement difficile. Seul un nombre très restreint de personnes habilitées peut, dans des cas exceptionnels et strictement encadrés, intervenir sur les systèmes techniques. Vos données médicales restent en tout état de cause dissociées de votre identité.' },
        { q: 'SONGRE respecte-t-il la loi burkinabè sur les données personnelles ?', a: 'Oui. SONGRE s\'engage à respecter la loi n°001-2021/AN du Burkina Faso relative à la protection des données à caractère personnel, ainsi que les recommandations de la Commission de l\'Informatique et des Libertés (CIL).' },
        { q: 'Puis-je accéder aux données que vous détenez sur moi ?', a: 'Oui. Conformément à la loi burkinabè, vous avez un droit d\'accès, de rectification et de suppression de vos données. Envoyez une demande à songre.contact@gmail.com avec pour objet "Demande d\'accès aux données". Nous répondrons sous 30 jours.' },
      ],
    },
  ];

  const en = [
    {
      cat: 'donors',
      label: `${icon('droplet')}For Donors`,
      items: [
        { q: 'Who can donate blood?', a: 'Anyone aged 18 to 60, weighing at least 50 kg and in good health can donate blood. Certain medical conditions may temporarily or permanently prevent donation. Consult a healthcare professional if in doubt.' },
        { q: 'How often can I donate?', a: 'Men can donate every 3 months (up to 4 times a year), women every 4 months (up to 3 times a year). These delays allow your body to replenish its red blood cell reserves.' },
        { q: 'Does donating blood hurt?', a: 'The pain is minimal. You\'ll feel a slight pinch when the needle is inserted, but the actual collection is painless. Most donors feel no pain during or after the donation.' },
        { q: 'How long does a blood donation take?', a: 'The whole blood donation takes about 8 to 10 minutes. Including reception, medical check and post-donation rest, allow about 45 to 60 minutes total.' },
        { q: 'Will my identity be revealed to the recipient?', a: 'Never. SONGRE guarantees total and mutual anonymity. The donor doesn\'t know the recipient, and the recipient doesn\'t know the donor ; your data is kept encrypted and secure to preserve this confidentiality at every step.' },
      ],
    },
    {
      cat: 'recipients',
      label: `${icon('hospital')}For Recipients`,
      items: [
        { q: 'How do I request blood?', a: 'From the SONGRE app, you can request blood by indicating the blood type needed, your city, the health facility involved and the address. A contact is also requested, but it will only be visible to donors who have agreed to respond to your request. SONGRE then connects you with compatible donors, based on their availability, blood type and city.' },
        { q: 'What is the average time to find a donor?', a: 'Searching for and notifying compatible donors is generally quite fast. The time it takes for a donor to accept and become available can vary, however, from a few minutes to several hours, depending on individual availability. We recommend also contacting the local transfusion center in parallel.' },
        { q: 'Is the service free for recipients?', a: 'The SONGRE app is completely free for both donors and recipients. We are a non-profit organization. Blood donation itself is free and voluntary.' },
        { q: 'Can I specify a precise city for the search?', a: 'Yes. You indicate the city as well as the health facility or hospital concerned. SONGRE covers 23 cities in Burkina Faso with varying donor density.' },
        { q: 'What if no donor responds?', a: 'If no donor responds right away, SONGRE expands the search to compatible donors available in your city, taking into account their last donation and their activation status in the app. We also recommend contacting the nearest transfusion center in parallel.' },
      ],
    },
    {
      cat: 'technical',
      label: `${icon('settings')}Technical Questions`,
      items: [
        { q: 'Does the app work without internet?', a: 'The app requires an internet connection to send and receive alerts. However, your profile information and donation history are available offline.' },
        { q: 'On what devices can I use SONGRE?', a: 'SONGRE is available on iOS (iPhone 7 and later, iOS 14+) and Android (version 8.0 and above). A responsive website is also available for all modern browsers.' },
        { q: 'How does SONGRE find donors near me?', a: 'SONGRE does not rely on geolocation. You simply enter your city when signing up, which allows the app to connect you with donors located in the same area.' },
        { q: 'What happens if I disable notifications?', a: 'If you disable notifications, you will no longer receive emergency alerts. We strongly recommend keeping them enabled if you want to actively contribute as a donor. You can temporarily disable them if you are unavailable.' },
        { q: 'How is donors\' health information verified?', a: 'At each donation, medical staff at the collection center verify your eligibility according to national medical protocols. SONGRE does not replace this medical verification, we facilitate connection, but the donation itself takes place in a professional medical setting.' },
      ],
    },
    {
      cat: 'safety',
      label: `${icon('shield')}Security and Privacy`,
      items: [
        { q: 'Is my personal data sold?', a: 'Absolutely not. SONGRE never sells, rents or shares your personal data with third parties ; we have no business model based on exploiting your data.' },
        { q: 'How can I delete my account?', a: 'You can delete your account at any time from the app settings. Deletion is irreversible and results in the complete erasure of all your data within 30 days in accordance with Burkinabè law.' },
        { q: 'Who has access to my data?', a: 'Your data is encrypted, including within our own databases, which makes it extremely difficult to access. Only a very limited number of authorized people can, in exceptional and strictly controlled cases, work on the technical systems. Your medical data always remains kept separate from your identity.' },
        { q: 'Does SONGRE comply with Burkinabè personal data law?', a: 'Yes. SONGRE is committed to complying with Burkina Faso law n°001-2021/AN on personal data protection, as well as the recommendations of the Commission de l\'Informatique et des Libertés (CIL), Burkina Faso\'s data protection authority.' },
        { q: 'Can I access the data you hold about me?', a: 'Yes. Under Burkinabè law, you have the right to access, rectify and delete your data. Send a request to songre.contact@gmail.com with the subject "Data Access Request". We will respond within 30 days.' },
      ],
    },
  ];
  return locale === 'fr' ? fr : en;
}

export function faqPage(locale: TranslationKey, path: string, baseUrl: string): string {
  const tr = t(locale);
  const seo = getSeoData(baseUrl)[locale].faq;
  const faqs = faqData(locale);

  const allFaqs = faqs.flatMap(group => group.items.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs,
  };

  const content = `
  <!-- ── PAGE HERO ─────────────────────────────────────────── -->
  <div class="page-hero">
    <div class="container text-center">
      <nav class="breadcrumb" style="justify-content:center;" aria-label="Breadcrumb">
        <a href="/${locale}">${locale === 'fr' ? 'Accueil' : 'Home'}</a>
        <span class="breadcrumb-sep">›</span>
        <span>FAQ</span>
      </nav>
      <div class="page-hero-badge reveal">${locale === 'fr' ? 'Questions Fréquentes' : 'Frequent Questions'}</div>
      <h1 class="page-hero-title reveal">${tr.faq.title}</h1>
      <p class="page-hero-desc reveal">${tr.faq.subtitle}</p>
    </div>
  </div>

  <!-- ── FAQ CONTENT ───────────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <!-- Categories Filter -->
      <div class="faq-categories" role="tablist" aria-label="${locale === 'fr' ? 'Filtrer les questions' : 'Filter questions'}">
        <button class="faq-cat-btn active" data-cat="all" role="tab" aria-selected="true">${locale === 'fr' ? 'Toutes' : 'All'}</button>
        ${faqs.map(g => `<button class="faq-cat-btn" data-cat="${g.cat}" role="tab" aria-selected="false">${g.label}</button>`).join('')}
      </div>

      <!-- FAQ Items -->
      <div class="faq-list">
        ${faqs.map(group => `
          <div class="faq-group" data-cat="${group.cat}">
            <h2 class="faq-group-title">${group.label}</h2>
            ${group.items.map((item, idx) => `
              <div class="faq-item" id="faq-${group.cat}-${idx}">
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${group.cat}-${idx}">
                  <span>${item.q}</span>
                  <span class="faq-icon" aria-hidden="true">+</span>
                </button>
                <div class="faq-answer" id="faq-answer-${group.cat}-${idx}" role="region">
                  <div class="faq-answer-inner">${item.a}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>

      <!-- Still Have Questions? -->
      <div style="text-align:center; margin-top:4rem; padding:3rem; background:var(--primary-ultra-light); border-radius:var(--radius-lg); border:1px solid rgba(200,30,58,0.1);" class="reveal">
        <h3 style="margin-bottom:1rem;">${locale === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : 'Can\'t find your answer?'}</h3>
        <p style="color:var(--text-muted); margin-bottom:2rem;">${locale === 'fr' ? 'Notre équipe est disponible 7j/7 pour répondre à toutes vos questions.' : 'Our team is available 7 days a week to answer all your questions.'}</p>
        <a href="/${locale}/contact" class="btn btn-primary">${icon('mail')}${locale === 'fr' ? 'Nous contacter' : 'Contact us'}</a>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl, jsonLd);
  return layout(locale, path, head, content);
}
