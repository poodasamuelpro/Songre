// SEO Utilities SONGRE
export interface SEOMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  canonical: string;
  locale: string;
  alternateLocale: string;
  alternateUrl: string;
}

// URL de base dynamique : utilise la variable d'environnement ou une valeur par défaut
export const getBaseUrl = (env?: any) => {
  return env?.BASE_URL || 'https://songre.bf';
};

export const getSeoData = (baseUrl: string): Record<string, Record<string, SEOMeta>> => {
  const OG_IMAGE = `${baseUrl}/static/images/og-image.png`;
  
  return {
    fr: {
      home: {
        title: 'SONGRE — Donnez le Don de Vie | Application de Don de Sang au Burkina Faso',
        description: 'SONGRE connecte donneurs et receveurs de sang au Burkina Faso. Plateforme anonyme, sécurisée, disponible 24h/24. Rejoignez +12 000 donneurs et sauvez des vies.',
        keywords: 'don de sang, Burkina Faso, SONGRE, donneur de sang, urgence médicale, groupe sanguin, Ouagadougou',
        ogTitle: 'SONGRE — La Plateforme Qui Sauve des Vies',
        ogDescription: 'Connectez donneurs et receveurs de sang au Burkina Faso. Anonyme, sécurisé, disponible 24h/24.',
        ogImage: OG_IMAGE,
        twitterTitle: 'SONGRE — Don de Sang au Burkina Faso',
        twitterDescription: '+12 000 donneurs. Des milliers de vies sauvées. Rejoignez SONGRE.',
        canonical: `${baseUrl}/fr`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en`,
      },
      about: {
        title: 'À Propos de SONGRE | Notre Mission pour le Don de Sang',
        description: 'Découvrez la mission de SONGRE : révolutionner le don de sang au Burkina Faso avec une technologie moderne, sécurisée et respectueuse de la vie privée.',
        keywords: 'SONGRE mission, don de sang Burkina, application santé Afrique, innovation médicale',
        ogTitle: 'Notre Mission — SONGRE',
        ogDescription: 'SONGRE : une mission humaine pour sauver des vies au Burkina Faso.',
        ogImage: OG_IMAGE,
        twitterTitle: 'La Mission de SONGRE',
        twitterDescription: 'Révolutionner le don de sang au Burkina Faso. Découvrez notre histoire.',
        canonical: `${baseUrl}/fr/a-propos`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/about`,
      },
      security: {
        title: 'Anonymat & Sécurité | SONGRE — Chiffrement AES-256',
        description: 'SONGRE protège vos données avec un chiffrement AES-256. Séparation totale des identités. Conformité loi 010-2004/AN du Burkina Faso. Votre vie privée est sacrée.',
        keywords: 'sécurité données, anonymat, chiffrement AES-256, protection vie privée, loi Burkina Faso',
        ogTitle: 'Sécurité & Anonymat — SONGRE',
        ogDescription: 'Vos données protégées par un chiffrement AES-256. L\'anonymat est notre priorité.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Sécurité Maximale — SONGRE',
        twitterDescription: 'Chiffrement AES-256, anonymat total, conformité légale burkinabè.',
        canonical: `${baseUrl}/fr/securite`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/security`,
      },
      faq: {
        title: 'FAQ | Questions Fréquentes sur SONGRE et le Don de Sang',
        description: 'Toutes vos questions sur SONGRE, le don de sang au Burkina Faso, la sécurité des données et le fonctionnement de la plateforme. Réponses claires et détaillées.',
        keywords: 'FAQ SONGRE, questions don de sang, aide, support, comment fonctionne SONGRE',
        ogTitle: 'FAQ — SONGRE',
        ogDescription: 'Retrouvez toutes les réponses à vos questions sur SONGRE et le don de sang.',
        ogImage: OG_IMAGE,
        twitterTitle: 'FAQ SONGRE — Toutes vos Questions',
        twitterDescription: '15+ questions/réponses sur le don de sang et SONGRE.',
        canonical: `${baseUrl}/fr/faq`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/faq`,
      },
      contact: {
        title: 'Contactez SONGRE | Équipe & Support',
        description: 'Contactez l\'équipe SONGRE pour toute question, partenariat ou signalement. Nous vous répondons sous 24 heures. Votre message compte.',
        keywords: 'contact SONGRE, support, partenariat, aide, équipe SONGRE',
        ogTitle: 'Contactez SONGRE',
        ogDescription: 'L\'équipe SONGRE est disponible pour vous aider. Envoyez-nous un message.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Contact — SONGRE',
        twitterDescription: 'Contactez l\'équipe SONGRE. Réponse sous 24h.',
        canonical: `${baseUrl}/fr/contact`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/contact`,
      },
      cgu: {
        title: 'CGU — Conditions Générales d\'Utilisation | SONGRE',
        description: 'Conditions Générales d\'Utilisation de l\'application et du site SONGRE. Droits, obligations, responsabilités et cadre juridique du don de sang au Burkina Faso.',
        keywords: 'CGU, conditions utilisation, juridique, SONGRE, don de sang légal',
        ogTitle: "Conditions Générales d'Utilisation — SONGRE",
        ogDescription: "Le cadre juridique qui encadre votre utilisation de SONGRE.",
        ogImage: OG_IMAGE,
        twitterTitle: 'CGU SONGRE',
        twitterDescription: "Conditions générales d'utilisation de SONGRE.",
        canonical: `${baseUrl}/fr/cgu`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/terms`,
      },
      privacy: {
        title: 'Politique de Confidentialité | SONGRE — Loi 010-2004/AN',
        description: 'Comment SONGRE collecte, utilise et protège vos données personnelles. Conformité à la loi burkinabè 010-2004/AN relative à la protection des données personnelles.',
        keywords: 'confidentialité, vie privée, données personnelles, RGPD, loi Burkina Faso, SONGRE',
        ogTitle: 'Politique de Confidentialité — SONGRE',
        ogDescription: 'Vos données personnelles protégées conformément à la loi burkinabè.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Confidentialité — SONGRE',
        twitterDescription: 'Protection de vos données. Conformité loi 010-2004/AN.',
        canonical: `${baseUrl}/fr/confidentialite`,
        locale: 'fr_BF',
        alternateLocale: 'en',
        alternateUrl: `${baseUrl}/en/privacy`,
      },
    },
    en: {
      home: {
        title: 'SONGRE — Give the Gift of Life | Blood Donation App in Burkina Faso',
        description: 'SONGRE connects blood donors and recipients in Burkina Faso. Anonymous, secure platform available 24/7. Join 12,000+ donors and save lives today.',
        keywords: 'blood donation, Burkina Faso, SONGRE, blood donor, medical emergency, blood type, Ouagadougou',
        ogTitle: 'SONGRE — The Platform That Saves Lives',
        ogDescription: 'Connect blood donors and recipients in Burkina Faso. Anonymous, secure, available 24/7.',
        ogImage: OG_IMAGE,
        twitterTitle: 'SONGRE — Blood Donation in Burkina Faso',
        twitterDescription: '12,000+ donors. Thousands of lives saved. Join SONGRE.',
        canonical: `${baseUrl}/en`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr`,
      },
      about: {
        title: 'About SONGRE | Our Mission for Blood Donation',
        description: 'Discover SONGRE\'s mission: revolutionizing blood donation in Burkina Faso with modern, secure, privacy-respecting technology.',
        keywords: 'SONGRE mission, blood donation Burkina, health app Africa, medical innovation',
        ogTitle: 'Our Mission — SONGRE',
        ogDescription: 'SONGRE: a human mission to save lives in Burkina Faso.',
        ogImage: OG_IMAGE,
        twitterTitle: "SONGRE's Mission",
        twitterDescription: 'Revolutionizing blood donation in Burkina Faso. Discover our story.',
        canonical: `${baseUrl}/en/about`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/a-propos`,
      },
      security: {
        title: 'Anonymity & Security | SONGRE — AES-256 Encryption',
        description: 'SONGRE protects your data with AES-256 encryption. Total identity separation. Compliance with Burkina Faso law 010-2004/AN. Your privacy is sacred.',
        keywords: 'data security, anonymity, AES-256 encryption, privacy protection, Burkina Faso law',
        ogTitle: 'Security & Anonymity — SONGRE',
        ogDescription: 'Your data protected by AES-256 encryption. Anonymity is our priority.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Maximum Security — SONGRE',
        twitterDescription: 'AES-256 encryption, total anonymity, legal compliance.',
        canonical: `${baseUrl}/en/security`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/securite`,
      },
      faq: {
        title: 'FAQ | Frequently Asked Questions about SONGRE',
        description: 'All your questions about SONGRE, blood donation in Burkina Faso, data security and platform functionality. Clear and detailed answers.',
        keywords: 'FAQ SONGRE, blood donation questions, help, support, how SONGRE works',
        ogTitle: 'FAQ — SONGRE',
        ogDescription: 'Find all the answers to your questions about SONGRE and blood donation.',
        ogImage: OG_IMAGE,
        twitterTitle: 'SONGRE FAQ — All Your Questions',
        twitterDescription: '15+ Q&As about blood donation and SONGRE.',
        canonical: `${baseUrl}/en/faq`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/faq`,
      },
      contact: {
        title: 'Contact SONGRE | Team & Support',
        description: 'Contact the SONGRE team for any question, partnership or report. We respond within 24 hours. Your message matters.',
        keywords: 'contact SONGRE, support, partnership, help, SONGRE team',
        ogTitle: 'Contact SONGRE',
        ogDescription: 'The SONGRE team is available to help you. Send us a message.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Contact — SONGRE',
        twitterDescription: 'Contact the SONGRE team. Response within 24h.',
        canonical: `${baseUrl}/en/contact`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/contact`,
      },
      terms: {
        title: 'Terms of Service | SONGRE',
        description: 'Terms of Service for the SONGRE application and website. Rights, obligations, responsibilities and legal framework for blood donation in Burkina Faso.',
        keywords: 'terms of service, legal, SONGRE, blood donation legal',
        ogTitle: 'Terms of Service — SONGRE',
        ogDescription: 'The legal framework governing your use of SONGRE.',
        ogImage: OG_IMAGE,
        twitterTitle: 'SONGRE Terms of Service',
        twitterDescription: 'Terms of Service for SONGRE.',
        canonical: `${baseUrl}/en/terms`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/cgu`,
      },
      privacy: {
        title: 'Privacy Policy | SONGRE — Law 010-2004/AN',
        description: 'How SONGRE collects, uses and protects your personal data. Compliance with Burkina Faso law 010-2004/AN on personal data protection.',
        keywords: 'privacy, personal data, GDPR, Burkina Faso law, SONGRE',
        ogTitle: 'Privacy Policy — SONGRE',
        ogDescription: 'Your personal data protected in accordance with Burkinabè law.',
        ogImage: OG_IMAGE,
        twitterTitle: 'Privacy — SONGRE',
        twitterDescription: 'Data protection. Compliance with law 010-2004/AN.',
        canonical: `${baseUrl}/en/privacy`,
        locale: 'en_BF',
        alternateLocale: 'fr',
        alternateUrl: `${baseUrl}/fr/confidentialite`,
      },
    },
  };
};

export function generateHead(seo: SEOMeta, baseUrl: string, jsonLd?: object): string {
  const jsonLdScript = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : '';
  return `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords}">
    <link rel="canonical" href="${seo.canonical}">
    <link rel="alternate" hreflang="${seo.alternateLocale}" href="${seo.alternateUrl}">
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/fr">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${seo.ogTitle}">
    <meta property="og:description" content="${seo.ogDescription}">
    <meta property="og:image" content="${seo.ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${seo.canonical}">
    <meta property="og:locale" content="${seo.locale}">
    <meta property="og:site_name" content="SONGRE">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seo.twitterTitle}">
    <meta name="twitter:description" content="${seo.twitterDescription}">
    <meta name="twitter:image" content="${seo.ogImage}">
    <meta name="twitter:site" content="@songre_bf">
    ${jsonLdScript}
  `;
}
