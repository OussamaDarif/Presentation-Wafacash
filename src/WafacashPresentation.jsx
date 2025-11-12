import html2canvas from 'html2canvas';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './WafacashPresentation.css';

const PALETTE = {
  yellow: '#FFD100',
  yellowAlt: '#FFC627',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#333333',
  light: '#F5F5F5',
  error: '#C62828',
};

const LOGO_SRC = `${process.env.PUBLIC_URL}/wafacash-logo.png`;

const backgroundThemes = {
  white: {
    background: PALETTE.white,
    text: PALETTE.black,
    logoVariant: 'light',
  },
  black: {
    background: PALETTE.black,
    text: PALETTE.white,
    logoVariant: 'dark',
  },
  yellow: {
    background: PALETTE.yellow,
    text: PALETTE.black,
    logoVariant: 'light',
  },
};

const slideDeck = [
  {
    id: 'cover',
    template: 'cover',
    background: 'black',
    heading: 'Refonte du Module PayCash',
    subheading: 'Intégration en Masse',
    tagline: "Dédié Pour Paiements des Frais d'Immatriculation",
    highlights: [
      'Réalisé par : Oussama DARIF',
      'Encadré par : Mme Mouna SAIH / M. Anas NAHILI',
      '14 Novembre 2025',
    ],
    jury: [
      { name: 'Anas NAHILI', role: 'Directeur SI & Digitalisation' },
      { name: 'NAFAKH LAZRAQ', role: 'Directrice Business & Développement' },
      { name: 'Mohamed Karim RATBY', role: 'Directeur Finances & Administratif' },
      { name: 'Zakaria BELYAZID', role: 'Responsable développement RH' },
    ],
    export: {
      title: 'Refonte du Module PayCash',
      subtitle: 'Intégration en Masse',
      bullets: [
        "Automatisation & Traçabilité des Paiements d'Immatriculation",
        'Oussama DARIF – 14 Novembre 2025',
      ],
    },
  },
  {
    id: 'agenda',
    template: 'agenda',
    background: 'white',
    title: 'Sommaire',
    columns: [
      [
        'Contexte & Problématique',
        "Analyse de l'existant",
        'Objectifs du projet',
        'Solution proposée',
        'Architecture technique',
        'Fonctionnalités développées',
      ],
      [
        'Technologies utilisées',
        'Démonstration',
        'Défis techniques relevés',
        'Méthodologie & gestion',
        'Résultats & impacts',
        "Perspectives d’évolution",
      ],
    ],
    export: {
      title: 'Sommaire',
      bullets: [
        'Contexte, Analyse, Objectifs',
        'Solution, Architecture, Fonctionnalités',
        'Technologies, Démo, Défis',
        'Méthodologie, Résultats, Perspectives',
      ],
    },
  },
  {
    id: 'wafacash',
    template: 'cards',
    background: 'white',
    title: 'Wafacash — Leader des Services Financiers',
    cards: [
      { headline: '+30 ans', caption: "d'expertise" },
      { headline: 'Leader', caption: "Transfert d'argent" },
      { headline: 'National', caption: 'Réseau étendu' },
    ],
    bulletList: [
      'Filiale du groupe Attijariwafa Bank',
      'Services : Transfert, Paiements, Gestion de trésorerie',
      'Innovation continue dans les services financiers de proximité',
    ],
    export: {
      title: 'Wafacash — Leader des Services Financiers',
      bullets: [
        '+30 ans d\'expertise, réseau national',
        'Filiale Attijariwafa Bank, offres transfert & paiement',
        'Innovation continue et proximité clients',
      ],
    },
  },
  {
    id: 'wafacash-products',
    template: 'products',
    background: 'white',
    title: 'Produits de Wafacash',
    products: [
      {
        name: 'Transfert d\'argent',
        description: 'national et international',
        icon: '💸',
      },
      {
        name: 'Floussy',
        description: 'carte électronique prépayée rechargeable',
        icon: '💳',
      },
      {
        name: 'Hissab Bikhir',
        description: 'Le premier compte bancaire économique au MAROC',
        icon: '🏦',
      },
      {
        name: 'Change manuel',
        description: 'Wafacash propose deux services liés au change Achat et Vente',
        icon: '💱',
      },
      {
        name: 'Paycash & Binga',
        description: 'permettent d\'effectuer le paiement en espèces des commandes sur les sites de e-commerce',
        icon: '🛒',
      },
      {
        name: 'Jibi',
        description: 'le premier compte de paiement mobile au Maroc lancé par un établissement de paiement',
        icon: '📱',
      },
      {
        name: 'Crédit',
        description: 'avec deux produits principaux SalafCash et Prêt AL AMANA',
        icon: '💰',
      },
    ],
    export: {
      title: 'Produits Wafacash',
      bullets: [
        'Transfert d\'argent, Floussy, Hissab Bikhir',
        'Change manuel, Paycash & Binga, Jibi, Crédit',
      ],
    },
  },
  {
    id: 'wafacash-values',
    template: 'values',
    background: 'white',
    title: 'Valeurs de Wafacash',
    values: [
      { name: 'Performance', position: 'top-left' },
      { name: 'Innovation', position: 'top-right' },
      { name: 'Esprit d\'équipe', position: 'bottom-left' },
      { name: 'Disponibilité', position: 'bottom-right' },
    ],
    export: {
      title: 'Valeurs de Wafacash',
      bullets: [
        'Performance, Innovation',
        'Esprit d\'équipe, Disponibilité',
      ],
    },
  },
  {
    id: 'problem',
    template: 'problem',
    background: 'white',
    title: 'Problématique',
    statement: 'Un exécutable legacy non maintenable menaçant la continuité du service',
    columns: [
      {
        heading: 'Défis Techniques',
        points: [
          'Application monolithique non maintenable',
          'Absence totale de documentation',
          'Code source indisponible',
          'Risque opérationnel majeur',
        ],
      },
      {
        heading: 'Impacts Métiers',
        points: [
          'Aucune traçabilité ni reporting',
          'Processus 100% manuel et chronophage',
          'Erreurs fréquentes et doublons',
          'Communication fragile avec le réseau',
        ],
      },
    ],
    footer: 'Urgence : remplacer la solution legacy avant rupture de service',
    export: {
      title: 'Problématique',
      bullets: [
        'Legacy non maintenable, absence de documentation',
        'Processus manuel, zéro traçabilité, erreurs critiques',
        'Risque opérationnel nécessitant une refonte en urgence',
      ],
    },
  },
  {
    id: 'process-before',
    template: 'beforeAfter',
    background: 'white',
    title: "Processus historique — \"Avant\"",
    beforeLabel: 'Chaîne manuelle',
    stages: [
      { label: 'Concessionnaire', description: 'Fichier Excel transmis', status: 'manual' },
      { label: 'Email Outlook', description: 'Envoi manuel au BO', status: 'manual' },
      { label: 'Back Office', description: 'Validations format fichier', status: 'manual' },
      { label: 'Répertoire', description: 'Dépôt Binga Masse', status: 'manual' },
    ],
    issues: [
      'Dépendance humaine et erreurs récurrentes',
      'Zéro visibilité sur les statuts temps réel',
      'Scalabilité limitée, pas de reporting',
    ],
    export: {
      title: 'Processus Historique',
      bullets: [
        'Flux manuel Excel > Email > BO > Répertoire',
        'Validation ligne par ligne, aucune automatisation',
        'Manque de visibilité, risques d’erreurs et de doublons',
      ],
    },
  },
  {
    id: 'objectives',
    template: 'objectives',
    background: 'white',
    title: 'Objectifs du Projet',
    goals: [
      {
        title: 'Sécuriser la continuité',
        description: 'Remplacer le legacy par un worker service maintenable',
      },
      {
        title: 'Automatiser le traitement',
        description: 'Industrialiser le traitement en masse et réduire les erreurs',
      },
      {
        title: 'Assurer la traçabilité',
        description: 'Dashboard, reporting et suivi temps réel des paiements',
      },
    ],
    export: {
      title: 'Objectifs du Projet',
      bullets: [
        'Sécuriser la continuité de service (worker moderne)',
        'Automatiser 100% du traitement en masse',
        'Garantir la traçabilité et le pilotage temps réel',
      ],
    },
  },
  {
    id: 'solution',
    template: 'solution',
    background: 'white',
    title: 'PayCash — La solution cible',
    flow: [
      { label: 'Concessionnaire', description: 'Dépôt sécurisé des lots' },
      { label: 'Worker Service', description: 'Détection & orchestration' },
      { label: 'Traitement API', description: 'Validation automatique BINGA' },
      { label: 'Dashboard', description: 'Supervision & reporting' },
    ],
    pillars: [
      { label: 'Automatisation intégrale', description: 'Flux pilotés, zéro tâche manuelle' },
      { label: 'Traçabilité native', description: 'Chaque étape historisée & auditable' },
      { label: 'Fiabilité renforcée', description: 'Contrôles qualité & gestion d’erreurs' },
    ],
    export: {
      title: 'Solution PayCash',
      bullets: [
        'Dépôt automatisé des fichiers concessionnaires',
        'Worker orchestrateur + API BINGA pour validation',
        'Dashboard temps réel pour pilotage et reporting',
      ],
    },
  },
  {
    id: 'architecture',
    template: 'architecture',
    background: 'white',
    title: 'Architecture Technique',
    schema: {
      left: {
        title: 'Integra BO',
        architecture: 'MVVM',
        components: [
          'Client — Interface WPF (Views & ViewModels, dashboard)',
          'Common — DTOs & services partagés',
          'Server — Logique métier & accès SQL Server',
        ],
      },
      bridge: {
        title: 'SQL Server',
        caption: 'Canal de synchronisation ↔ Le Worker insère • Integra BO consulte',
      },
      right: {
        title: 'Worker Service',
        architecture: 'Services orchestrés',
        components: [
          'Models — DataFileIntegration, IntegrationFile, IntegrationData',
          'Services — ExcelProcessor, SoapClientService, PdfGeneratorService',
          'Worker.cs — Orchestrateur (FileSystemWatcher, erreurs, logging)',
        ],
      },
    },
    export: {
      title: 'Architecture technique',
      bullets: [
        'Integra BO : client MVVM (Client/Common/Server) pour la consultation',
        'Worker Service : Models, Services, Worker.cs pour le traitement automatisé',
        'SQL Server : synchronisation temps réel entre les deux systèmes',
        'Architecture bicéphale : indépendante, scalable, maintenable et fiable',
      ],
    },
  },
  {
    id: 'features',
    template: 'featureGrid',
    background: 'white',
    title: 'Fonctionnalités développées',
    features: [
      {
        heading: 'Worker Service intelligent',
        points: [
          'Détection et ingestion automatique des fichiers',
          'Traitement ligne par ligne avec reprise sur incident',
          'Gestion fine des erreurs et notifications ciblées',
        ],
      },
      {
        heading: 'Pilotage & supervision',
        points: [
          'Dashboard temps réel avec filtres avancés',
          'Historique complet et audit trail',
          'Indicateurs de performance clés',
        ],
      },
      {
        heading: 'Génération documentaire',
        points: [
          'Reçus PDF instantanés et sécurisés',
          'Archivage structuré des pièces',
          'Distribution contrôlée et export',
        ],
      },
      {
        heading: 'Intégration API BINGA',
        points: [
          'Appels FindOrder & validation de statut',
          'Gestion des timeouts et des cas Pending',
          'Synchronisation des statuts Success/Rejet',
        ],
      },
    ],
    export: {
      title: 'Fonctionnalités clés',
      bullets: [
        'Worker Service orchestrateur & reprise sur incident',
        'Dashboard & traçabilité complète temps réel',
        'Génération de reçus PDF et archivage maîtrisé',
        'Intégration API BINGA et gestion des statuts',
      ],
    },
  },
  {
    id: 'technologies',
    template: 'technology',
    background: 'white',
    title: 'Technologies utilisées',
    stacks: [
      { label: 'Backend', content: 'C#, .NET, Worker Service, Entity Framework' },
      { label: 'Frontend', content: 'WPF, MVVM, Data Binding avancé' },
      { label: 'Database', content: 'SQL Server, Stored Procedures, optimisation requêtes' },
      { label: 'API & Outils', content: 'SoapUI, Azure DevOps' },
    ],
    export: {
      title: 'Technologies',
      bullets: [
        'Stack .NET / C# / Worker Service',
        'Client WPF MVVM, Data Binding',
        'SQL Server & procédures stockées',
        'SoapUI, Azure DevOps',
      ],
    },
  },
  {
    id: 'demo-dashboard',
    template: 'demo',
    background: 'white',
    title: 'Démonstration — Dashboard de suivi PayCash',
    image: `${process.env.PUBLIC_URL}/dashboard-screenshot.png`,
  },
  {
    id: 'demo-dashboard',
    template: 'demo',
    background: 'white',
    title: 'Démonstration — Détails du fichier traité',
    image: `${process.env.PUBLIC_URL}/detail-screenshot.png`,
  },
  {
    id: 'demo-pdf',
    template: 'receipt',
    background: 'white',
    title: 'Génération des reçus PDF',
    image: `${process.env.PUBLIC_URL}/receipt-screenshot.png`,
  },
  {
    id: 'sequence',
    template: 'sequence',
    background: 'white',
    title: 'Flux de traitement — séquence unifiée',
    steps: [
      'Dépôt du fichier Excel par le backoffice',
      'Détection automatique via FileWatcher',
      'Analyse & validation préliminaire des lignes',
      'Appel API BINGA',
      'Insertion maîtrisée dans les tables cibles',
      'Archivage, notifications et visualisation dashboard',
    ],
    export: {
      title: 'Flux de traitement',
      bullets: [
        'Détection automatique des dépôts',
        'Analyse, validation et appel API BINGA',
        'Insertion contrôlée + archivage + reporting',
      ],
    },
  },
  {
    id: 'challenges',
    template: 'challenges',
    background: 'white',
    title: 'Défis techniques relevés',
    challenges: [
      {
        label: 'Migration Legacy',
        points: [
          'Absence de documentation initiale',
          'Reverse engineering fonctionnel complet',
          'Compatibilité métier garantie',
        ],
      },
      {
        label: 'Performance',
        points: [
          'Traitement de lots massifs (200+ lignes)',
          'Optimisation SQL & tuning ressources',
          'Gestion mémoire surveillée',
        ],
      },
      {
        label: 'Synchronisation',
        points: [
          'Gestion statuts Pending / Success / Rejet',
          'Résilience face aux timeouts SOAP',
          'Élimination des doublons',
        ],
      },
      {
        label: 'Fiabilité',
        points: [
          'Gestion exhaustive des erreurs',
          'Logging structuré pour audit trail',
          'Batterie de tests avant déploiement',
        ],
      },
    ],
    export: {
      title: 'Défis techniques',
      bullets: [
        'Reverser et fiabiliser un legacy sans doc',
        'Performance & maîtrise des volumes massifs',
        'Synchronisation statuts BINGA & robustesse',
      ],
    },
  },
  {
    id: 'methodology',
    template: 'timeline',
    background: 'white',
    title: 'Méthodologie & gestion de projet',
    phases: [
      { label: 'Analyse', icon: '📋', duration: '2 semaines' },
      { label: 'Conception', icon: '🎨', duration: '1 semaine' },
      { label: 'Développement', icon: '💻', duration: '6 semaines' },
      { label: 'Tests', icon: '✅', duration: '2 semaines' },
      { label: 'Déploiement', icon: '🚀', duration: '1 semaine' },
    ],
    supports: [
      'Outils : Azure DevOps, Git, Gantt de pilotage',
      'Collaboration : Support TMA, métiers',
      'Livrables : documentation, rapport final',
    ],
    export: {
      title: 'Méthodologie',
      bullets: [
        'Cycle Analyse → Conception → Dev → Tests → Go-Live',
        'Pilotage Azure DevOps & Gantt, collaboration TMA & métiers',
        'Livrables complets (docs, guides, rapport final)',
      ],
    },
  },
  {
    id: 'results',
    template: 'featureGrid',
    background: 'black',
    title: 'Résultats obtenus',
    features: [
      {
        heading: 'Processus maîtrisé',
        points: [
          'Automatisation continue des traitements',
          'Supervision consolidée dans un tableau de bord unique',
          'Suivi des dossiers fiabilisé pour les équipes BO',
        ],
      },
      {
        heading: 'Qualité renforcée',
        points: [
          'Réduction drastique des erreurs humaines',
          'Contrôles métier appliqués de bout en bout',
          'Historique complet pour chaque opération sensible',
        ],
      },
      {
        heading: 'Expérience améliorée',
        points: [
          'Temps de prise en charge significativement raccourci',
          'Génération automatique et archivage des reçus',
          'Visibilité temps réel pour répondre aux concessionnaires',
        ],
      },
    ],
    export: {
      title: 'Résultats clés',
      bullets: [
        'Automatisation du flux PayCash et pilotage centralisé',
        'Contrôles renforcés assurant une qualité homogène',
        'Expérience plus fluide pour le réseau et le back office',
      ],
    },
  },
  {
    id: 'impacts',
    template: 'impacts',
    background: 'white',
    title: 'Impacts & bénéfices',
    blocks: [
      {
        title: 'Impacts opérationnels',
        items: [
          'Productivité renforcée des équipes BO',
          'Suppression des saisies répétitives',
          'Capacité accrue pour absorber les pics de charge',
        ],
      },
      {
        title: 'Impacts business',
        items: [
          'Concessionnaires informés en temps réel',
          'Traçabilité totale pour audit & conformité',
          'Image de marque innovante & fiable',
        ],
        inverted: true,
      },
    ],
    quote: 'PayCash : un système moderne, fiable et évolutif au service du réseau Wafacash',
    export: {
      title: 'Impacts & bénéfices',
      bullets: [
        'Gains opérationnels : productivité, agilité, qualité',
        'Gains business : satisfaction, conformité, image de marque',
        'PayCash sécurise l’activité et prépare l’avenir',
      ],
    },
  },
  {
    id: 'perspectives',
    template: 'perspectives',
    background: 'white',
    title: "Perspectives d'évolution",
    horizons: [
      {
        label: 'Court terme',
        items: ['Portail web dédié', 'Notifications automatiques', 'Analytics avancées'],
      },
      {
        label: 'Moyen terme',
        items: ['Dépôt direct sécurisé', 'Automatiser la validation'],
      },
      {
        label: 'Long terme',
        items: ['Portail dédié', 'Automatisation totale'],
      },
    ],
    addOns: [
      'Extension internationale : Sénégal, Cameroun, Tunisie…',
   
      'Business Intelligence pour la direction',
    ],
    export: {
      title: 'Perspectives',
      bullets: [
        'Court terme : portail web, notifications, analytics',
        'Moyen terme : API REST, application mobile',
        'Long terme : IA, blockchain, automatisation globale',
      ],
    },
  },
  {
    id: 'transition-impact',
    template: 'transition',
    background: 'yellow',
    label: 'Synthèse',
    heading: 'Refonte PayCash : de la contrainte legacy au levier de performance',
    meta: 'Fiabilité • Automatisation • Traçabilité',
    export: {
      title: 'Synthèse',
      bullets: [
        'Refonte PayCash : contrainte legacy → levier de performance',
        'Fiabilité, automatisation et traçabilité au cœur de la solution',
      ],
    },
  },
  {
    id: 'conclusion',
    template: 'cover-lite',
    background: 'black',
    heading: 'Conclusion',
    tiles: [
      { icon: '✓', label: 'Legacy → Moderne' },
      { icon: '✓', label: 'Manuel → Automatisé' },
      { icon: '✓', label: 'Opaque → Traçable' },
    ],
    banner: 'PayCash : Fiabilité • Performance • Évolutivité',
    export: {
      title: 'Conclusion',
      bullets: [
        'En 3 mois : transformation complète du module PayCash',
        'Legacy remplacé par un système moderne, automatisé et traçable',
        'PayCash : fiabilité, performance et évolutivité',
      ],
    },
  },
  {
    id: 'thanks',
    template: 'thanks',
    background: 'white',
    title: 'Remerciements',
    acknowledgements: [
      { title: 'Direction Wafacash', role: 'M. Anas NAHILI — Directeur SI & Digitalisation' },
      { title: 'Encadrement', role: 'Mme Mouna SAIH — Responsable Support TMA' },
      { title: 'Équipe Support TMA & SI', role: 'Collaboration et expertise terrain' },
    ],
    export: {
      title: 'Remerciements',
      bullets: [
        'Direction Wafacash — M. Anas NAHILI',
        'Encadrement — Mme Mouna SAIH',
        'Équipe Support TMA & SI pour leur accompagnement',
      ],
    },
  },
  {
    id: 'questions',
    template: 'questions',
    background: 'black',
    title: 'Questions ?',
    subtitle: 'Je suis à votre disposition',
    footer: 'Oussama DARIF • PayCash — Intégration en Masse',
    export: {
      title: 'Questions ?',
      bullets: ['Session de Q&A', "Contact : Oussama DARIF — PayCash Intégration en Masse"],
    },
  },
  {
    id: 'cover',
    template: 'cover',
    background: 'black',
    heading: 'Refonte du Module PayCash',
    subheading: 'Intégration en Masse',
    tagline: "Dédié Pour Paiements des Frais d'Immatriculation",
    highlights: [
      'Réalisé par : Oussama DARIF',
      'Encadré par : Mme Mouna SAIH / M. Anas NAHILI',
      '13 Novembre 2025',
    ],
    jury: [
      { name: 'Anas NAHILI', role: 'Directeur SI & Digitalisation' },
      { name: 'Samira NAFAKH LAZRAQ', role: 'Directrice Business & Développement' },
      { name: 'Mohamed Karim Ratby', role: 'Directeur Finances & Administratif' },
      { name: 'Zakaria Belyazid', role: 'Responsable  développement RH' },
    ],
    export: {
      title: 'Refonte du Module PayCash',
      subtitle: 'Intégration en Masse',
      bullets: [
        "Automatisation & Traçabilité des Paiements d'Immatriculation",
        'Oussama DARIF – 13 Novembre 2025',
      ],
    },
  },
];

const SlideWrapper = ({ slide, children }) => {
  const theme = backgroundThemes[slide.background] ?? backgroundThemes.white;
  return (
    <div
      className="slide-shell"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <img
        src={LOGO_SRC}
        alt="Wafacash"
        className={`slide-shell__logo ${
          theme.logoVariant === 'dark' ? 'slide-shell__logo--dark' : ''
        }`}
      />
      <div className="slide-shell__inner">{children}</div>
    </div>
  );
};

const TitleBlock = ({ title, eyebrow, description, theme = 'light' }) => (
  <div className="slide-shell__title">
    {eyebrow && (
      <span
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          fontSize: 12,
          fontWeight: 600,
          color: theme === 'dark' ? 'rgba(255,255,255,0.75)' : PALETTE.dark,
        }}
      >
        {eyebrow}
      </span>
    )}
    <h1
      className="slide-shell__title-text"
      style={{
        color: theme === 'dark' ? PALETTE.white : PALETTE.black,
      }}
    >
      {title}
    </h1>
    <div className="slide-shell__title-bar" />
    {description && (
      <p
        className="slide-shell__subtitle"
        style={{
          color: theme === 'dark' ? 'rgba(255,255,255,0.75)' : PALETTE.dark,
        }}
      >
        {description}
      </p>
    )}
  </div>
);

const BulletList = ({ items, tone = 'dark' }) => (
  <div className="bullet-cluster">
    {items.map((item, idx) => (
      <div key={idx} className="bullet-row">
        <span className="bullet-dot" />
        <span
          className="bullet-text"
          style={{ color: tone === 'light' ? 'rgba(255,255,255,0.82)' : PALETTE.black }}
        >
          {item}
        </span>
      </div>
    ))}
  </div>
);

const SlideRenderer = ({ slide }) => {
  switch (slide.template) {
    case 'cover':
      return (
        <SlideWrapper slide={slide}>
          <div className="full-bleed cover-content" style={{ color: PALETTE.white }}>
            <div className="cover-header">
              <div className="transition-slide__label" style={{ color: 'rgba(255,255,255,0.68)' }}>
                WAFACASH
              </div>
              <div className="full-bleed__title" style={{ color: PALETTE.yellow }}>
                {slide.heading}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>{slide.subheading}</div>
              <div style={{ fontSize: 17, maxWidth: 720, lineHeight: 1.5 }}>
                {slide.tagline}
              </div>
            </div>
            
            <div className="cover-body">
              <div className="badge-list">
                {slide.highlights.map((line, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(4px)',
                      fontSize: 14,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
              
              {slide.jury && slide.jury.length > 0 && (
                <div className="jury-section">
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: PALETTE.yellow,
                      marginBottom: 14,
                    }}
                  >
                    Membres du Jury
                  </div>
                  <div className="jury-grid">
                    {slide.jury.map((member, idx) => (
                      <div key={idx} className="jury-member">
                        <div className="jury-member__name">{member.name}</div>
                        <div className="jury-member__role">{member.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'agenda':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="two-column-grid">
              {slide.columns.map((col, colIdx) => (
                <BulletList key={colIdx} items={col} />
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'cards':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="data-card-grid">
              {slide.cards.map((card, idx) => (
                <div key={idx} className="data-card">
                  <div className="data-card__number">{card.headline}</div>
                  <div className="data-card__label">{card.caption}</div>
                </div>
              ))}
            </div>
            <BulletList items={slide.bulletList} />
          </div>
        </SlideWrapper>
      );

    case 'problem':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="callout callout--emphasis" style={{ textAlign: 'center' }}>
              {slide.statement}
            </div>
            <div className="two-column-grid">
              {slide.columns.map((column, idx) => (
                <div key={idx} className="callout">
                  <strong>{column.heading}</strong>
                  <BulletList items={column.points} />
                </div>
              ))}
            </div>
            <div
              className="callout"
              style={{
                background: 'rgba(0,0,0,0.85)',
                color: PALETTE.white,
                borderColor: 'transparent',
              }}
            >
              <strong style={{ color: PALETTE.yellow }}>Urgence</strong> — {slide.footer}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'beforeAfter':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="callout" style={{ background: 'rgba(255,209,0,0.16)' }}>
              <strong>{slide.beforeLabel}</strong>
              <div className="timeline-track" style={{ marginTop: 20 }}>
                {slide.stages.map((stage, idx) => (
                  <div key={idx} className="timeline-node">
                    <div className="timeline-node__phase">{stage.label}</div>
                    <div className="timeline-node__icon">⬢</div>
                    <div className="timeline-node__duration">{stage.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="callout">
              <strong>Points de douleur</strong>
              <BulletList items={slide.issues} />
            </div>
          </div>
        </SlideWrapper>
      );

    case 'objectives':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="data-card-grid">
              {slide.goals.map((goal, idx) => (
                <div key={idx} className="data-card">
                  <div className="data-card__number">{goal.title}</div>
                  <div className="data-card__body">{goal.description}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'solution':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="timeline-track" style={{ marginBottom: 28 }}>
              {slide.flow.map((step, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-node__phase">{step.label}</div>
                  <div className="timeline-node__icon">→</div>
                  <div className="timeline-node__duration">{step.description}</div>
                </div>
              ))}
            </div>
            <div className="data-card-grid">
              {slide.pillars.map((pillar, idx) => (
                <div key={idx} className="callout">
                  <strong>{pillar.label}</strong>
                  <span>{pillar.description}</span>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'architecture':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="architecture-schema">
              <div className="architecture-schema__header">{slide.schema?.header}</div>
              <div className="architecture-schema__body">
                <div className="architecture-panel">
                  <div className="architecture-panel__title">{slide.schema?.left?.title}</div>
                  <div className="architecture-panel__section">
                    <span className="architecture-panel__label">Architecture</span>
                    <span className="architecture-panel__value">{slide.schema?.left?.architecture}</span>
                  </div>
                  <ul className="architecture-panel__list">
                    {slide.schema?.left?.components?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                </div>

                <div className="architecture-bridge">
                  <div className="architecture-bridge__title">{slide.schema?.bridge?.title}</div>
                  <div className="architecture-bridge__icon">⇆</div>
                  <div className="architecture-bridge__caption">{slide.schema?.bridge?.caption}</div>
                </div>

                <div className="architecture-panel">
                  <div className="architecture-panel__title">{slide.schema?.right?.title}</div>
                  <div className="architecture-panel__section">
                    <span className="architecture-panel__label">Architecture</span>
                    <span className="architecture-panel__value">{slide.schema?.right?.architecture}</span>
                  </div>
                  <ul className="architecture-panel__list">
                    {slide.schema?.right?.components?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>
      );

    case 'featureGrid':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} theme={slide.background === 'black' ? 'dark' : 'light'} />
          <div className="slide-content">
            <div className="grid-two">
              {slide.features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`callout${slide.background === 'black' ? ' callout--dark' : ''}`}
                >
                  <strong>{feature.heading}</strong>
                  <BulletList
                    items={feature.points}
                    tone={slide.background === 'black' ? 'light' : 'dark'}
                  />
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'technology':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="data-card-grid">
              {slide.stacks.map((stack, idx) => (
                <div key={idx} className="data-card">
                  <div className="data-card__label">{stack.label}</div>
                  <div className="data-card__body">{stack.content}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'demo':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content" style={slide.image ? { gap: 16 } : {}}>
            {slide.image && (
              <div className="demo-image-container">
                <img
                  src={slide.image}
                  alt="Capture d'écran du dashboard"
                  className="demo-image"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            {slide.demoHighlights && slide.demoHighlights.length > 0 && (
              <div className="callout" style={slide.image ? { padding: '16px 20px', marginTop: 0 } : {}}>
                <strong>Points clés</strong>
                <BulletList items={slide.demoHighlights} />
              </div>
            )}
          </div>
        </SlideWrapper>
      );

    case 'receipt':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content" style={slide.image ? { gap: 0, paddingTop: 20 } : {}}>
            {slide.image ? (
              <div className="receipt-image-container">
                <img
                  src={slide.image}
                  alt="Capture d'écran du reçu PDF"
                  className="receipt-image"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="data-card" style={{ background: PALETTE.white }}>
                <div className="grid-two">
                  <div>
                    <strong>Informations fichier</strong>
                    <BulletList items={slide.receipt.metadata} />
                  </div>
                  <div>
                    <strong>Statistiques</strong>
                    <BulletList items={slide.receipt.stats} />
                  </div>
                </div>
                <div className="callout callout--emphasis" style={{ alignSelf: 'center' }}>
                  {slide.receipt.badge}
                </div>
              </div>
            )}
          </div>
        </SlideWrapper>
      );

    case 'sequence':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="diagram-sequence">
              {slide.steps.map((step, idx) => (
                <div key={idx} className="diagram-sequence__step">
                  <div className="diagram-sequence__badge">{idx + 1}</div>
                  <div className="diagram-sequence__body">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'challenges':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="grid-two">
              {slide.challenges.map((challenge, idx) => (
                <div key={idx} className="callout">
                  <strong>{challenge.label}</strong>
                  <BulletList items={challenge.points} />
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'timeline':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="timeline-track">
              {slide.phases.map((phase, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-node__phase">{phase.label}</div>
                  <div className="timeline-node__icon">{phase.icon}</div>
                  <div className="timeline-node__duration">{phase.duration}</div>
                </div>
              ))}
            </div>
            <div className="metrics-row">
              {slide.supports.map((support, idx) => (
                <div key={idx} className="metrics-row__item">
                  <div className="metrics-row__heading">+</div>
                  <div className="metrics-row__body">{support}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'impact':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} theme="dark" />
          <div className="slide-content">
            <div className="data-card-grid">
              {slide.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="impact-metric"
                  style={{ background: 'rgba(255,255,255,0.04)', padding: 24, borderRadius: 20 }}
                >
                  <div className="impact-metric__value">{metric.value}</div>
                  <div className="impact-metric__label">{metric.label}</div>
                </div>
              ))}
            </div>
            <div className="metrics-row">
              {slide.comparisons.map((block, idx) => (
                <div key={idx} className="metrics-row__item" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="metrics-row__heading">{block.heading}</div>
                  <div className="metrics-row__body">
                    {block.items.map((line, lineIdx) => (
                      <div key={lineIdx}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'impacts':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="grid-two">
              {slide.blocks.map((block, idx) => (
                <div
                  key={idx}
                  className={block.inverted ? 'callout callout--emphasis' : 'callout'}
                >
                  <strong>{block.title}</strong>
                  <BulletList items={block.items} />
                </div>
              ))}
            </div>
            <div className="impact-banner">{slide.quote}</div>
          </div>
        </SlideWrapper>
      );

    case 'perspectives':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="data-card-grid">
              {slide.horizons.map((horizon, idx) => (
                <div key={idx} className="data-card">
                  <div className="data-card__number">{horizon.label}</div>
                  <BulletList items={horizon.items} />
                </div>
              ))}
            </div>
            <div className="callout">
              <strong>Cap 2026+</strong>
              <BulletList items={slide.addOns} />
            </div>
          </div>
        </SlideWrapper>
      );

    case 'transition':
      return (
        <SlideWrapper slide={slide}>
          <div className="transition-slide">
            <div className="transition-slide__label">{slide.label}</div>
            <div className="transition-slide__title">{slide.heading}</div>
            <div className="transition-slide__meta">{slide.meta}</div>
          </div>
        </SlideWrapper>
      );

    case 'cover-lite':
      return (
        <SlideWrapper slide={slide}>
          <div className="full-bleed" style={{ color: PALETTE.white }}>
            <div className="full-bleed__title" style={{ color: PALETTE.yellow }}>
              {slide.heading}
            </div>
            <div className="full-bleed__grid">
              {slide.tiles.map((tile, idx) => (
                <div key={idx} className="full-bleed__card">
                  <div className="full-bleed__card-icon">{tile.icon}</div>
                  <div className="full-bleed__card-title">{tile.label}</div>
                </div>
              ))}
            </div>
            <div className="impact-banner">{slide.banner}</div>
          </div>
        </SlideWrapper>
      );

    case 'thanks':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="thanks-grid">
              {slide.acknowledgements.map((item, idx) => (
                <div key={idx} className="thanks-card">
                  <div className="thanks-card__title">{item.title}</div>
                  <div className="thanks-card__role">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'questions':
      return (
        <SlideWrapper slide={slide}>
          <div className="questions-slide">
            <div className="questions-slide__icon">❓</div>
            <div className="questions-slide__title">{slide.title}</div>
            <div className="questions-slide__note">{slide.subtitle}</div>
            <div className="questions-slide__footer">{slide.footer}</div>
          </div>
        </SlideWrapper>
      );

    case 'annex':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="grid-two">
              {slide.sections.map((section, idx) => (
                <div key={idx} className="callout">
                  <strong>{section.heading}</strong>
                  <BulletList items={section.items} />
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'products':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="products-grid">
              {slide.products.map((product, idx) => (
                <div key={idx} className="product-item">
                  <div className="product-item__icon">{product.icon}</div>
                  <div className="product-item__content">
                    <div className="product-item__name">{product.name}</div>
                    <div className="product-item__description">{product.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideWrapper>
      );

    case 'values':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="values-diagram">
              {/* Top row */}
              <div className="values-diagram__box values-diagram__box--top-left">
                {slide.values[0].name}
              </div>
              <div className="values-diagram__box values-diagram__box--top-right">
                {slide.values[1].name}
              </div>
              {/* Bottom row */}
              <div className="values-diagram__box values-diagram__box--bottom-left">
                {slide.values[2].name}
              </div>
              <div className="values-diagram__box values-diagram__box--bottom-right">
                {slide.values[3].name}
              </div>
            </div>
          </div>
        </SlideWrapper>
      );

    default:
      return null;
  }
};

const WafacashPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useMemo(() => slideDeck, []);
  const totalSlides = slides.length;
  const activeSlide = slides[currentSlide];
  const stageRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const goTo = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        // If already loaded
        if (existing.dataset.loaded === 'true') resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = (e) => reject(e);
      document.body.appendChild(script);
    });

  const getJsPDF = async () => {
    // Always load from CDN to avoid bundling issues
    if (!(window.jspdf && window.jspdf.jsPDF)) {
      await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
    }
    return window.jspdf.jsPDF;
  };

  const getPptxGen = async () => {
    // Always load UMD from CDN to avoid bundling Node deps
    if (!window.PptxGenJS) {
      await loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs');
    }
    return window.PptxGenJS;
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const waitForFonts = async () => {
    if (document && document.fonts && typeof document.fonts.ready?.then === 'function') {
      try {
        await document.fonts.ready;
      } catch {
        // ignore
      }
    }
  };

  const waitForImages = async (root) => {
    const images = Array.from(root.querySelectorAll('img'));
    const promises = images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalWidth > 0) return resolve();
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener(
            'error',
            () => {
              resolve();
            },
            { once: true }
          );
        })
    );
    await Promise.all(promises);
  };

  const captureCurrentStageAsImage = async () => {
    const node = stageRef.current;
    if (!node) return null;

    // Ensure fonts and images are fully loaded for maximum fidelity
    await waitForFonts();
    await waitForImages(node);

    // Use the slide background when capturing to avoid transparency artifacts
    const computedBg = window.getComputedStyle(node).backgroundColor;
    const bgColor =
      computedBg && computedBg !== 'rgba(0, 0, 0, 0)' && computedBg !== 'transparent'
        ? computedBg
        : '#ffffff';

    const canvas = await html2canvas(node, {
      scale: 2, // reduce memory footprint to avoid dataURL overflow
      backgroundColor: bgColor,
      useCORS: true,
      allowTaint: false,
      imageTimeout: 15000,
      logging: false,
      foreignObjectRendering: false,
    });
    // Prefer JPEG to reduce dataURL size, which helps avoid "Invalid string length"
    return canvas.toDataURL('image/jpeg', 0.88);
  };

  const exportAsPdf = async () => {
    if (totalSlides === 0) return;
    setIsExporting(true);
    const filename = 'WafacashPresentation.pdf';

    try {
      const JsPDFCtor = await getJsPDF();
      // Prepare a landscape A4 PDF
      const pdf = new JsPDFCtor({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const originalIndex = currentSlide;
      let addedPages = 0;

      for (let i = 0; i < totalSlides; i++) {
        goTo(i);
        // Allow React to render before capture (fonts/images are handled in capture)
        await wait(150);
        const img = await captureCurrentStageAsImage();
        if (!img) {
          continue;
        }
        if (addedPages > 0) {
          pdf.addPage('a4', 'landscape');
        }

        // Fit image into page while preserving aspect ratio
        const stage = stageRef.current;
        const sw = stage.clientWidth || pageWidth;
        const sh = stage.clientHeight || pageHeight;
        const stageRatio = sw / sh;
        const pageRatio = pageWidth / pageHeight;

        let drawW = pageWidth;
        let drawH = pageHeight;
        if (stageRatio > pageRatio) {
          // Constrain by width
          drawW = pageWidth;
          drawH = pageWidth / stageRatio;
        } else {
          // Constrain by height
          drawH = pageHeight;
          drawW = pageHeight * stageRatio;
        }
        const x = (pageWidth - drawW) / 2;
        const y = (pageHeight - drawH) / 2;

        pdf.addImage(img, 'PNG', x, y, drawW, drawH);
        addedPages += 1;
      }

      // If nothing was added, bail out gracefully
      if (addedPages === 0) {
        setIsExporting(false);
        return;
      }

      try {
        pdf.save(filename);
      } catch {
        // Fallback: manual Blob download (guard types across jsPDF builds)
        let blob;
        try {
          const maybeBlob = await pdf.output('blob');
          if (maybeBlob && typeof maybeBlob === 'object' && typeof maybeBlob.size === 'number') {
            blob = maybeBlob;
          }
        } catch {
          // ignore and try arraybuffer
        }
        if (!blob) {
          const ab = await pdf.output('arraybuffer');
          blob = new Blob([ab], { type: 'application/pdf' });
        }
        const url = (typeof pdf.output === 'function' && typeof pdf.output('bloburl') === 'string')
          ? pdf.output('bloburl')
          : URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (!url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      } finally {
        // Restore original slide
        goTo(originalIndex);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPptxImage = async () => {
    if (totalSlides === 0) return;
    setIsExporting(true);
    const filename = 'WafacashPresentation.pptx';

    try {
      const PptxGenJS = await getPptxGen();
      const pres = new PptxGenJS();
      // 16:9 layout by default; ensure full-bleed images fill slide
      for (let i = 0; i < totalSlides; i++) {
        goTo(i);
        await wait(150);
        const img = await captureCurrentStageAsImage();
        const slide = pres.addSlide();
        if (img) {
          slide.addImage({ data: img, x: 0, y: 0, w: '100%', h: '100%' });
        }
      }
      // Try native download; fallback to manual blob download
      try {
        await pres.writeFile({ fileName: filename });
      } catch (e) {
        // Some environments need a manual blob download
        if (typeof pres.write === 'function') {
          // Prefer 'blob' which returns a Blob in browser builds
          const blob = await pres.write('blob');
          if (blob) {
            downloadBlob(blob, filename);
          } else {
            // Last resort: arraybuffer
            const arrayBuffer = await pres.write('arraybuffer');
            const mime =
              'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            const abBlob = new Blob([arrayBuffer], { type: mime });
            downloadBlob(abBlob, filename);
          }
        } else {
          throw e;
        }
      }
    } finally {
      setIsExporting(false);
    }
  };

  const getSlideThemeColors = (slide) => {
    const theme = backgroundThemes[slide.background] || backgroundThemes.white;
    return {
      bg: theme.background,
      text: theme.text,
      accent: PALETTE.yellow,
    };
  };

  const addTitleBlock = (pptSlide, text, colors) => {
    if (!text) return;
    pptSlide.addText(text, {
      x: 0.5,
      y: 0.4,
      w: 9,
      h: 1,
      bold: true,
      fontSize: 28,
      color: colors.text,
    });
  };

  const addBulletBlock = (pptSlide, items, box, colors) => {
    if (!items || !items.length) return;
    pptSlide.addText(
      items.map((t) => ({ text: t, options: { bullet: true } })),
      {
        x: box.x,
        y: box.y,
        w: box.w,
        h: box.h,
        color: colors.text,
        fontSize: 16,
        lineSpacingMultiple: 1.2,
      }
    );
  };

  const exportAsPptx = async () => {
    if (totalSlides === 0) return;
    setIsExporting(true);
    const filename = 'WafacashPresentation (natif).pptx';

    try {
      const PptxGenJS = await getPptxGen();
      const pres = new PptxGenJS();

      for (let i = 0; i < totalSlides; i++) {
        const slideData = slides[i];
        const pptSlide = pres.addSlide();
        const colors = getSlideThemeColors(slideData);
        pptSlide.background = { color: colors.bg };

        // Generic title
        addTitleBlock(pptSlide, slideData.title || slideData.heading, colors);

        let handledNatively = false;

        switch (slideData.template) {
          case 'cover': {
            if (slideData.subheading) {
              pptSlide.addText(slideData.subheading, {
                x: 0.5,
                y: 1.2,
                w: 9,
                h: 0.6,
                fontSize: 20,
                color: colors.text,
              });
            }
            if (slideData.tagline) {
              pptSlide.addText(slideData.tagline, {
                x: 0.5,
                y: 1.8,
                w: 9,
                h: 0.6,
                fontSize: 18,
                color: colors.accent,
              });
            }
            if (Array.isArray(slideData.highlights)) {
              addBulletBlock(pptSlide, slideData.highlights, { x: 0.7, y: 2.6, w: 8.6, h: 2.5 }, colors);
            }
            handledNatively = true;
            break;
          }
          case 'agenda': {
            const cols = slideData.columns || [];
            if (cols[0]) {
              addBulletBlock(pptSlide, cols[0], { x: 0.7, y: 1.5, w: 4.1, h: 3.6 }, colors);
            }
            if (cols[1]) {
              addBulletBlock(pptSlide, cols[1], { x: 5.0, y: 1.5, w: 4.1, h: 3.6 }, colors);
            }
            handledNatively = true;
            break;
          }
          case 'cards': {
            if (Array.isArray(slideData.cards)) {
              const gap = 0.3;
              const cardW = (9 - gap * 2) / 3;
              slideData.cards.slice(0, 3).forEach((c, idx) => {
                const x = 0.5 + idx * (cardW + gap);
                pptSlide.addShape(pres.ShapeType.roundRect, {
                  x,
                  y: 1.6,
                  w: cardW,
                  h: 2.2,
                  fill: { color: 'FFFFFF' },
                  line: { color: colors.accent, width: 1.5 },
                  shadow: { type: 'outer', opacity: 0.2, blur: 4 },
                });
                if (c.headline) {
                  pptSlide.addText(c.headline, {
                    x: x + 0.3,
                    y: 1.8,
                    w: cardW - 0.6,
                    h: 0.6,
                    fontSize: 22,
                    bold: true,
                    color: colors.text,
                  });
                }
                if (c.caption) {
                  pptSlide.addText(c.caption, {
                    x: x + 0.3,
                    y: 2.4,
                    w: cardW - 0.6,
                    h: 0.6,
                    fontSize: 14,
                    color: colors.text,
                  });
                }
              });
            }
            if (Array.isArray(slideData.bulletList)) {
              addBulletBlock(pptSlide, slideData.bulletList, { x: 0.7, y: 4.0, w: 8.6, h: 1.4 }, colors);
            }
            handledNatively = true;
            break;
          }
          case 'problem': {
            if (slideData.statement) {
              pptSlide.addText(slideData.statement, {
                x: 0.5,
                y: 1.1,
                w: 9,
                h: 0.6,
                fontSize: 18,
                italic: true,
                color: colors.accent,
              });
            }
            const cols = slideData.columns || [];
            if (cols[0]?.points) {
              addBulletBlock(pptSlide, cols[0].points, { x: 0.7, y: 1.9, w: 4.1, h: 3.2 }, colors);
            }
            if (cols[1]?.points) {
              addBulletBlock(pptSlide, cols[1].points, { x: 5.0, y: 1.9, w: 4.1, h: 3.2 }, colors);
            }
            if (slideData.footer) {
              pptSlide.addText(slideData.footer, {
                x: 0.5,
                y: 5.2,
                w: 9,
                h: 0.4,
                fontSize: 12,
                color: colors.text,
              });
            }
            handledNatively = true;
            break;
          }
          case 'objectives': {
            const goals = slideData.goals || [];
            addBulletBlock(
              pptSlide,
              goals.map((g) => `${g.title}: ${g.description}`),
              { x: 0.7, y: 1.5, w: 8.6, h: 3.6 },
              colors
            );
            handledNatively = true;
            break;
          }
          default:
            handledNatively = false;
        }

        // For templates not yet mapped natively, fall back to image to preserve style
        if (!handledNatively) {
          goTo(i);
          await wait(150);
          const img = await captureCurrentStageAsImage();
          if (img) {
            pptSlide.addImage({ data: img, x: 0, y: 0, w: '100%', h: '100%' });
          }
        }
      }

      // Try native download; fallback to manual blob download
      try {
        await pres.writeFile({ fileName: filename });
      } catch (e) {
        if (typeof pres.write === 'function') {
          const blob = await pres.write('blob');
          if (blob) {
            downloadBlob(blob, filename);
          } else {
            const arrayBuffer = await pres.write('arraybuffer');
            const mime =
              'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            const abBlob = new Blob([arrayBuffer], { type: mime });
            downloadBlob(abBlob, filename);
          }
        } else {
          throw e;
        }
      }
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = (e.target && e.target.tagName) || '';
      // Ignore when typing in inputs/textareas to avoid hijacking typing
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.isComposing) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goTo(currentSlide + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goTo(currentSlide - 1);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(totalSlides - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, totalSlides, goTo]);

  return (
    <div className="presentation-root">


      <main ref={stageRef} className="presentation-stage">
        <SlideRenderer slide={activeSlide} />
      </main>

      {/* Export actions (top-right) */}
      {!isExporting && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 8,
            zIndex: 1200,
          }}
        >
        <button
          type="button"
            onClick={exportAsPdf}
            style={{
              padding: '8px 12px',
              background: PALETTE.yellow,
              color: PALETTE.black,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              fontWeight: 600,
            }}
            title="Exporter en PDF"
          >
            Export PDF
        </button>
          <button
            type="button"
            onClick={exportAsPptx}
            style={{
              padding: '8px 12px',
              background: PALETTE.yellow,
              color: PALETTE.black,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              fontWeight: 600,
            }}
            title="Exporter en PPTX (natif — texte et formes)"
          >
            Export PPTX (natif)
          </button>
          <button
            type="button"
            onClick={exportAsPptxImage}
            style={{
              padding: '8px 12px',
              background: PALETTE.yellow,
              color: PALETTE.black,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              fontWeight: 600,
            }}
            title="Exporter en PPTX (image — capture d’écran de chaque slide)"
          >
            Export PPTX (image)
          </button>
        </div>
      )}

      {/* Overlay navigation arrows (center left/right) */}
      {!isExporting && <button
          type="button"
        aria-label="Diapo précédente"
        onClick={() => goTo(currentSlide - 1)}
        disabled={currentSlide === 0}
        style={{
          position: 'fixed',
          top: '50%',
          left: 8,
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: PALETTE.yellow,
          color: PALETTE.black,
          border: 'none',
          cursor: currentSlide === 0 ? 'default' : 'pointer',
          opacity: currentSlide === 0 ? 0.3 : 1,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        title="Précédent (←)"
      >
        <ChevronLeft size={20} />
      </button>}

      {!isExporting && <button
        type="button"
        aria-label="Diapo suivante"
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === totalSlides - 1}
        style={{
          position: 'fixed',
          top: '50%',
          right: 8,
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: PALETTE.yellow,
          color: PALETTE.black,
          border: 'none',
          cursor: currentSlide === totalSlides - 1 ? 'default' : 'pointer',
          opacity: currentSlide === totalSlides - 1 ? 0.3 : 1,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        title="Suivant (→)"
      >
        <ChevronRight size={20} />
      </button>}

      {!isExporting && <div
        className="presentation-footer"
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 4,
          background: 'transparent',
          borderRadius: 999,
          marginTop: 10,
          padding: '6px 10px',
          zIndex: 1000,
        }}
      >
        <div className="slide-progress">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={[
                'slide-progress__dot',
                idx === currentSlide ? 'slide-progress__dot--active' : '',
                idx < currentSlide ? 'slide-progress__dot--complete' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => goTo(idx)}
              title={`Aller à la slide ${idx + 1}`}
              style={{
                background:
                  idx === currentSlide || idx < currentSlide
                    ? PALETTE.yellow
                    : 'rgba(255,209,0,0.35)',
                border: `1px solid ${PALETTE.yellow}`,
              }}
            />
          ))}
        </div>
      </div>}
    </div>
  );
};

export default WafacashPresentation;

