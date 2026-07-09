import type { TranslationKey } from '../utils/translations';
import { t } from '../utils/translations';
import { getSeoData, generateHead } from '../utils/seo';
import { layout } from '../utils/components';

function faqData(locale: TranslationKey) {
  const fr = [
    {
      cat: 'donors',
      label: '💉 Pour les Donneurs',
      items: [
        { q: 'Qui peut donner du sang ?', a: 'Toute personne âgée de 18 à 60 ans, pesant au moins 50 kg et en bonne santé peut donner du sang. Certaines conditions médicales peuvent temporairement ou définitivement empêcher le don. Consultez un professionnel de santé en cas de doute.' },
        { q: 'À quelle fréquence puis-je donner ?', a: 'Les hommes peuvent donner tous les 3 mois (jusqu\'à 4 fois par an), les femmes tous les 4 mois (jusqu\'à 3 fois par an). Ces délais permettent à votre organisme de reconstituer ses réserves en globules rouges.' },
        { q: 'Est-ce que ça fait mal de donner du sang ?', a: 'La douleur est minimale. Vous sentirez une légère piqûre au moment de l\'insertion de l\'aiguille, mais le prélèvement lui-même est indolore. La plupart des donneurs ne ressentent aucune douleur pendant ou après le don.' },
        { q: 'Combien de temps dure un don de sang ?', a: 'Le don de sang total dure environ 8 à 10 minutes. Avec l\'accueil, la vérification médicale et le repos post-don, comptez environ 45 à 60 minutes au total.' },
        { q: 'Mon identité sera-t-elle révélée au receveur ?', a: 'Non, jamais. SONGRE garantit un anonymat total et réciproque. Le donneur ne connaît pas le receveur, et le receveur ne connaît pas le donneur. Notre architecture technique de séparation des données (Schéma v3) rend cette information impossible à récupérer, même par notre équipe.' },
      ],
    },
    {
      cat: 'recipients',
      label: '🏥 Pour les Demandeurs',
      items: [
        { q: 'Comment demander du sang en urgence ?', a: 'Via l\'application SONGRE, sélectionnez "Urgence" et indiquez le groupe sanguin requis et votre localisation. Les donneurs compatibles dans un rayon de 10 km recevront une notification dans les 30 secondes.' },
        { q: 'Quel est le délai moyen pour trouver un donneur ?', a: 'En zone urbaine (Ouagadougou, Bobo-Dioulasso), le délai moyen est de 12 à 25 minutes. En zone rurale, ce délai peut être plus long. Nous recommandons de contacter aussi le centre de transfusion local en parallèle.' },
        { q: 'Le service est-il payant pour les receveurs ?', a: 'L\'application SONGRE est entièrement gratuite pour les donneurs comme pour les receveurs. Nous sommes une organisation à but non lucratif. Le don de sang lui-même est gratuit et bénévole.' },
        { q: 'Puis-je spécifier une ville précise pour la recherche ?', a: 'Oui. Vous pouvez géolocaliser automatiquement votre position ou saisir manuellement l\'hôpital ou la ville. SONGRE couvre 23 villes au Burkina Faso avec une densité variable de donneurs.' },
        { q: 'Que faire si aucun donneur ne répond ?', a: 'SONGRE élargit automatiquement le rayon de recherche de 10 à 30 km si aucun donneur ne répond dans les 5 premières minutes. L\'application vous fournit aussi la liste des banques de sang les plus proches en temps réel.' },
      ],
    },
    {
      cat: 'technical',
      label: '⚙️ Questions Techniques',
      items: [
        { q: 'L\'application fonctionne-t-elle sans internet ?', a: 'L\'application nécessite une connexion internet pour envoyer et recevoir des alertes. Cependant, vos informations de profil et l\'historique de vos dons sont disponibles hors ligne.' },
        { q: 'Sur quels appareils puis-je utiliser SONGRE ?', a: 'SONGRE est disponible sur iOS (iPhone 7 et versions ultérieures, iOS 14+) et Android (version 8.0 et supérieure). Un site web responsive est également disponible pour tous les navigateurs modernes.' },
        { q: 'Comment fonctionne la géolocalisation ?', a: 'SONGRE utilise la géolocalisation de votre appareil uniquement au moment où vous activez une alerte ou une demande. En dehors de ces moments, votre position n\'est pas tracée. Vous pouvez également saisir votre ville manuellement.' },
        { q: 'Que se passe-t-il si je désactive les notifications ?', a: 'Si vous désactivez les notifications, vous ne recevrez plus les alertes d\'urgence. Nous recommandons fortement de les laisser activées si vous souhaitez contribuer activement comme donneur. Vous pouvez les désactiver temporairement si vous êtes indisponible.' },
        { q: 'Comment sont vérifiées les informations de santé des donneurs ?', a: 'Lors de chaque don, le personnel médical du centre de collecte vérifie votre éligibilité selon les protocoles médicaux nationaux. SONGRE ne remplace pas cette vérification médicale — nous facilitons la mise en relation, mais le don lui-même se déroule dans un cadre médical professionnel.' },
      ],
    },
    {
      cat: 'safety',
      label: '🔒 Sécurité & Confidentialité',
      items: [
        { q: 'Mes données personnelles sont-elles vendues ?', a: 'Absolument non. SONGRE ne vend, ne loue et ne partage jamais vos données personnelles avec des tiers. Nous n\'avons aucun modèle économique basé sur les données. Notre financement provient de donations et de partenariats institutionnels.' },
        { q: 'Comment puis-je supprimer mon compte ?', a: 'Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l\'application. La suppression est irréversible et entraîne l\'effacement complet de toutes vos données dans un délai de 30 jours conformément à la loi burkinabè.' },
        { q: 'Qui a accès à mes données ?', a: 'Seul un nombre très limité d\'ingénieurs SONGRE ayant signé des accords de confidentialité stricts peut accéder aux systèmes de données, et uniquement pour des raisons techniques justifiées. Vos données médicales sont accessibles séparément de vos données d\'identité.' },
        { q: 'SONGRE respecte-t-il la loi burkinabè sur les données personnelles ?', a: 'Oui. SONGRE est pleinement conforme à la loi n°010-2004/AN du Burkina Faso relative à la protection des données à caractère personnel. Nous avons déclaré notre activité auprès de l\'ANPDP (Autorité Nationale de Protection des Données à Caractère Personnel).' },
        { q: 'Puis-je accéder aux données que vous détenez sur moi ?', a: 'Oui. Conformément à la loi burkinabè, vous avez un droit d\'accès, de rectification et de suppression de vos données. Envoyez une demande à songre.contact@gmail.com avec pour objet "Demande d\'accès aux données". Nous répondrons sous 30 jours.' },
      ],
    },
  ];

  const en = [
    {
      cat: 'donors',
      label: '💉 For Donors',
      items: [
        { q: 'Who can donate blood?', a: 'Anyone aged 18 to 60, weighing at least 50 kg and in good health can donate blood. Certain medical conditions may temporarily or permanently prevent donation. Consult a healthcare professional if in doubt.' },
        { q: 'How often can I donate?', a: 'Men can donate every 3 months (up to 4 times a year), women every 4 months (up to 3 times a year). These delays allow your body to replenish its red blood cell reserves.' },
        { q: 'Does donating blood hurt?', a: 'The pain is minimal. You\'ll feel a slight pinch when the needle is inserted, but the actual collection is painless. Most donors feel no pain during or after the donation.' },
        { q: 'How long does a blood donation take?', a: 'The whole blood donation takes about 8 to 10 minutes. Including reception, medical check and post-donation rest, allow about 45 to 60 minutes total.' },
        { q: 'Will my identity be revealed to the recipient?', a: 'Never. SONGRE guarantees total and mutual anonymity. The donor doesn\'t know the recipient, and the recipient doesn\'t know the donor. Our data separation technical architecture (Schema v3) makes this information impossible to retrieve, even by our team.' },
      ],
    },
    {
      cat: 'recipients',
      label: '🏥 For Recipients',
      items: [
        { q: 'How do I request blood in an emergency?', a: 'Through the SONGRE app, select "Emergency" and indicate the required blood type and your location. Compatible donors within a 10 km radius will receive a notification within 30 seconds.' },
        { q: 'What is the average time to find a donor?', a: 'In urban areas (Ouagadougou, Bobo-Dioulasso), the average time is 12 to 25 minutes. In rural areas, this may be longer. We recommend also contacting the local transfusion center in parallel.' },
        { q: 'Is the service free for recipients?', a: 'The SONGRE app is completely free for both donors and recipients. We are a non-profit organization. Blood donation itself is free and voluntary.' },
        { q: 'Can I specify a precise city for the search?', a: 'Yes. You can automatically geolocate your position or manually enter the hospital or city. SONGRE covers 23 cities in Burkina Faso with varying donor density.' },
        { q: 'What if no donor responds?', a: 'SONGRE automatically expands the search radius from 10 to 30 km if no donor responds in the first 5 minutes. The app also provides you with a list of the nearest blood banks in real time.' },
      ],
    },
    {
      cat: 'technical',
      label: '⚙️ Technical Questions',
      items: [
        { q: 'Does the app work without internet?', a: 'The app requires an internet connection to send and receive alerts. However, your profile information and donation history are available offline.' },
        { q: 'On what devices can I use SONGRE?', a: 'SONGRE is available on iOS (iPhone 7 and later, iOS 14+) and Android (version 8.0 and above). A responsive website is also available for all modern browsers.' },
        { q: 'How does geolocation work?', a: 'SONGRE uses your device\'s geolocation only when you activate an alert or request. Outside of these moments, your position is not tracked. You can also enter your city manually.' },
        { q: 'What happens if I disable notifications?', a: 'If you disable notifications, you will no longer receive emergency alerts. We strongly recommend keeping them enabled if you want to actively contribute as a donor. You can temporarily disable them if you are unavailable.' },
        { q: 'How is donors\' health information verified?', a: 'At each donation, medical staff at the collection center verify your eligibility according to national medical protocols. SONGRE does not replace this medical verification — we facilitate connection, but the donation itself takes place in a professional medical setting.' },
      ],
    },
    {
      cat: 'safety',
      label: '🔒 Security & Privacy',
      items: [
        { q: 'Is my personal data sold?', a: 'Absolutely not. SONGRE never sells, rents or shares your personal data with third parties. We have no data-based business model. Our funding comes from donations and institutional partnerships.' },
        { q: 'How can I delete my account?', a: 'You can delete your account at any time from the app settings. Deletion is irreversible and results in the complete erasure of all your data within 30 days in accordance with Burkinabè law.' },
        { q: 'Who has access to my data?', a: 'Only a very limited number of SONGRE engineers who have signed strict confidentiality agreements can access data systems, and only for justified technical reasons. Your medical data is accessible separately from your identity data.' },
        { q: 'Does SONGRE comply with Burkinabè personal data law?', a: 'Yes. SONGRE is fully compliant with Burkina Faso law n°010-2004/AN on personal data protection. We have declared our activity to the ANPDP (National Authority for Personal Data Protection).' },
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
      <div class="page-hero-badge reveal">❓ ${locale === 'fr' ? 'Questions Fréquentes' : 'Frequent Questions'}</div>
      <h1 class="page-hero-title reveal">${tr.faq.title}</h1>
      <p class="page-hero-desc reveal">${tr.faq.subtitle}</p>
    </div>
  </div>

  <!-- ── FAQ CONTENT ───────────────────────────────────────── -->
  <section class="section" style="background:white;">
    <div class="container">
      <!-- Categories Filter -->
      <div class="faq-categories" role="tablist" aria-label="${locale === 'fr' ? 'Filtrer les questions' : 'Filter questions'}">
        <button class="faq-cat-btn active" data-cat="all" role="tab" aria-selected="true">${locale === 'fr' ? '📋 Toutes' : '📋 All'}</button>
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
        <a href="/${locale}/contact" class="btn btn-primary">${locale === 'fr' ? '✉️ Nous contacter' : '✉️ Contact us'}</a>
      </div>
    </div>
  </section>`;

  const head = generateHead(seo, baseUrl, jsonLd);
  return layout(locale, path, head, content);
}
