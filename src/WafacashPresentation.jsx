import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import React, { useMemo, useState } from 'react';
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
    tagline: "Automatisation & Traçabilité des Paiements d'Immatriculation",
    highlights: [
      'Réalisé par : Oussama DARIF',
      'Encadré par : Mme Mouna SAIH / M. Anas NAHILI',
      '14 Novembre 2025',
    ],
    jury: [
      { name: 'Anas NAHILI', role: 'Directeur SI & Digitalisation' },
      { name: 'Membre 2', role: 'Membre du jury' },
      { name: 'Membre 3', role: 'Membre du jury' },
      { name: 'Zakaria Belyazid', role: 'Responsable RH' },
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
        '+30 ans d’expertise, réseau national',
        'Filiale Attijariwafa Bank, offres transfert & paiement',
        'Innovation continue et proximité clients',
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
      { label: 'Back Office', description: 'Validations ligne à ligne', status: 'manual' },
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
    title: 'PayCash 2.0 — La solution cible',
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
      title: 'Solution PayCash 2.0',
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
    title: 'Architecture Technique MVVM — 3 couches synchronisées',
    layers: [
      {
        tag: 'Client',
        caption: 'Interface WPF • Vue & ViewModel • Dashboard • PDF',
      },
      {
        tag: 'Common',
        caption: 'Services transverses • DTOs • Validation • Config',
        muted: true,
      },
      {
        tag: 'Server',
        caption: 'Worker Service • DAL SQL Server • BLL • API SOAP BINGA',
      },
    ],
    export: {
      title: 'Architecture MVVM',
      bullets: [
        'Client WPF (MVVM) pour la supervision',
        'Couche commune mutualisée (services & DTOs)',
        'Worker Service + DAL SQL + Intégration BINGA',
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
      { label: 'API & Outils', content: 'SOAP BINGA, SoapUI, Azure DevOps, Git' },
    ],
    export: {
      title: 'Technologies',
      bullets: [
        'Stack .NET / C# / Worker Service',
        'Client WPF MVVM, Data Binding',
        'SQL Server & procédures stockées',
        'SoapUI, Azure DevOps, Git',
      ],
    },
  },
  {
    id: 'demo-dashboard',
    template: 'demo',
    background: 'white',
    title: 'Démonstration — Dashboard de suivi PayCash',
    image: `${process.env.PUBLIC_URL}/dashboard-screenshot.png`,
    demoHighlights: [
      'Filtrage par adhérent, date et statut en direct',
      'Statuts visuels : Validé, En cours, Rejeté',
      'Actions rapides : Détails, export, reçus PDF',
    ],
    export: {
      title: 'Démo Dashboard',
      bullets: [
        'Supervision temps réel des fichiers reçus',
        'Filtres avancés et statuts visuels',
        'Accès rapide aux détails et exports PDF',
      ],
    },
  },
  {
    id: 'demo-pdf',
    template: 'receipt',
    background: 'white',
    title: 'Génération automatique des reçus PDF',
    image: `${process.env.PUBLIC_URL}/receipt-screenshot.png`,
    receipt: {
      metadata: [
        'Référence : REF-2025-001',
        'Concessionnaire : Auto Premium',
        'Date : 14/11/2025 10:30',
        'Lignes traitées : 120',
      ],
      stats: [
        '115 validées',
        '5 rejetées',
        '287 500 MAD traités',
        'Statut global : TRAITÉ',
      ],
      badge: 'Validé par Wafacash',
    },
    export: {
      title: 'Reçus PDF Automatiques',
      bullets: [
        'Reçus professionnels générés pour chaque lot',
        'Statistiques consolidées (volumes, montants)',
        'Validation officielle Wafacash',
      ],
    },
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
      'Collaboration : Support TMA, métiers, concessionnaires',
      'Livrables : documentation, guide utilisateur, rapport final',
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
    template: 'impact',
    background: 'black',
    title: 'Résultats obtenus',
    metrics: [
      { value: '100%', label: 'Automatisation du processus' },
      { value: '0', label: 'Doublons ou erreurs résiduelles' },
      { value: '-80%', label: 'Temps de traitement' },
    ],
    comparisons: [
      {
        heading: 'Temps de traitement',
        items: ['Avant : 2h par lot', 'Après : 24 min'],
      },
      {
        heading: 'Taux d’erreurs',
        items: ['Avant : 15%', 'Après : contrôles embarqués'],
      },
    ],
    export: {
      title: 'Résultats clés',
      bullets: [
        'Automatisation complète du flux PayCash',
        'Erreur/doublon éliminés, qualité garantie',
        'Temps de traitement réduit de 80%',
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
          'Traitement x10 du volume sans friction',
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
    quote: 'PayCash 2.0 : un système moderne, fiable et évolutif au service du réseau Wafacash',
    export: {
      title: 'Impacts & bénéfices',
      bullets: [
        'Gains opérationnels : productivité, scalabilité, qualité',
        'Gains business : satisfaction, conformité, image de marque',
        'PayCash 2.0 sécurise l’activité et prépare l’avenir',
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
        items: ['Dépôt direct sécurisé', 'API REST moderne', 'Application mobile'],
      },
      {
        label: 'Long terme',
        items: ['IA pour détection d’anomalies', 'Blockchain pour traçabilité', 'Automatisation totale'],
      },
    ],
    addOns: [
      'Extension internationale : Sénégal, Cameroun, Tunisie…',
      'Intégration future avec les modules Wafacash (Jibi, Hissab Bikhir)',
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
    banner: 'PayCash 2.0 : Fiabilité • Performance • Évolutivité',
    export: {
      title: 'Conclusion',
      bullets: [
        'En 3 mois : transformation complète du module PayCash',
        'Legacy remplacé par un système moderne, automatisé et traçable',
        'PayCash 2.0 : fiabilité, performance et évolutivité',
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
    id: 'annex',
    template: 'annex',
    background: 'white',
    title: 'Annexe technique — structure & composants',
    sections: [
      {
        heading: 'Structure du projet',
        items: ['PayCash.Client (WPF)', 'PayCash.Common (DTOs)', 'PayCash.Server (Worker)', 'PayCash.Data (SQL)'],
      },
      {
        heading: 'Composants clés',
        items: [
          'FileSystemWatcher — détection automatique',
          'ExcelProcessor — lecture & validation',
          'SOAP Client — appels FindOrder',
          'PDF Generator — reçus automatiques',
        ],
      },
      {
        heading: 'Sécurité',
        items: ['Authentification intégrée', 'Audit trail détaillé', 'Validation des données critiques'],
      },
      {
        heading: 'Performance',
        items: ['Traitement asynchrone', 'Pooling des connexions', 'Cache intelligent'],
      },
    ],
    export: {
      title: 'Annexe technique',
      bullets: [
        'Structure solution : Client, Common, Server, Data',
        'Composants : FileWatcher, ExcelProcessor, SOAP, PDF',
        'Sécurité & performance : audit trail, caching, asynchrone',
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
            <div className="diagram-grid">
              {slide.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="diagram-node"
                  style={{
                    background: layer.muted ? PALETTE.light : PALETTE.white,
                  }}
                >
                  <div className="diagram-node__label">{layer.tag}</div>
                  <div className="diagram-node__title">{layer.caption}</div>
                </div>
              ))}
            </div>
            <div
              className="callout"
              style={{ background: 'rgba(0,0,0,0.86)', color: PALETTE.white, border: 'none' }}
            >
              Architecture MVVM : séparation claire, maintenabilité maximale.
            </div>
          </div>
        </SlideWrapper>
      );

    case 'featureGrid':
      return (
        <SlideWrapper slide={slide}>
          <TitleBlock title={slide.title} />
          <div className="slide-content">
            <div className="grid-two">
              {slide.features.map((feature, idx) => (
                <div key={idx} className="callout">
                  <strong>{feature.heading}</strong>
                  <BulletList items={feature.points} />
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

    default:
      return null;
  }
};

const buildPptx = async (slides) => {
  try {
    // Vérifier que PptxGenJS est chargé
    let PptxGenJS = window.PptxGenJS || window.pptxgen;
    
    if (!PptxGenJS) {
      // Attendre un peu pour que le script se charge
      await new Promise((resolve) => setTimeout(resolve, 1000));
      PptxGenJS = window.PptxGenJS || window.pptxgen;
    }

    if (!PptxGenJS) {
      throw new Error(
        "PptxGenJS n'est pas disponible. Veuillez recharger la page ou vérifier votre connexion internet."
      );
    }

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Oussama DARIF';
    pptx.company = 'Wafacash';
    pptx.subject = 'Refonte du Module PayCash - Intégration en Masse';
    pptx.title = 'Refonte du Module PayCash';

    slides.forEach((slide, index) => {
      const slideObj = pptx.addSlide();
      
      // Définir la couleur de fond (format hexadécimal sans #)
      const bgColor =
        slide.background === 'black'
          ? '000000'
          : slide.background === 'yellow'
          ? 'FFD100'
          : 'FFFFFF';
      
      slideObj.background = { color: bgColor };

      // Couleurs de texte (format hexadécimal sans #)
      const textColor = slide.background === 'black' ? 'FFFFFF' : '000000';
      const subtitleColor = slide.background === 'black' ? 'D9D9D9' : '333333';
      const accentColor = 'FFD100';

      const content = slide.export || {};
      let yPos = 0.6;

      // Titre principal
      if (content.title) {
        slideObj.addText(content.title, {
          x: 0.5,
          y: yPos,
          w: 9,
          h: 0.8,
          fontSize: 32,
          fontFace: 'Arial',
          bold: true,
          color: textColor,
          align: 'left',
        });
        yPos += 1;
      }

      // Sous-titre
      if (content.subtitle) {
        slideObj.addText(content.subtitle, {
          x: 0.5,
          y: yPos,
          w: 9,
          h: 0.5,
          fontSize: 22,
          fontFace: 'Arial',
          color: subtitleColor,
          align: 'left',
        });
        yPos += 0.7;
      }

      // Puces
      if (content.bullets && Array.isArray(content.bullets) && content.bullets.length > 0) {
        // Filtrer et s'assurer que tous les éléments sont des chaînes
        const bulletStrings = content.bullets.filter(bullet => typeof bullet === 'string');
        
        if (bulletStrings.length > 0) {
          // Ajouter chaque bullet avec le caractère • pour éviter l'erreur de PptxGenJS
          bulletStrings.forEach((bullet, idx) => {
            slideObj.addText(`• ${bullet}`, {
              x: 0.8,
              y: yPos + (idx * 0.45),
              w: 8.5,
              h: 0.4,
              fontSize: 16,
              fontFace: 'Arial',
              color: textColor,
            });
          });
          yPos += bulletStrings.length * 0.45 + 0.3;
        }
      } else if (content.sections && Array.isArray(content.sections)) {
        // Sections multiples
        const sectionWidth = 4.2;
        content.sections.forEach((section, idx) => {
          const xPos = 0.5 + idx * (sectionWidth + 0.3);
          if (section.heading) {
            slideObj.addText(section.heading, {
              x: xPos,
              y: yPos,
              w: sectionWidth,
              h: 0.4,
              fontSize: 18,
              fontFace: 'Arial',
              bold: true,
              color: accentColor,
            });
          }
          
          if (section.items && Array.isArray(section.items) && section.items.length > 0) {
            // Ajouter chaque item avec le caractère • pour éviter l'erreur
            section.items.forEach((item, itemIdx) => {
              if (typeof item === 'string') {
                slideObj.addText(`• ${item}`, {
                  x: xPos,
                  y: yPos + 0.5 + (itemIdx * 0.4),
                  w: sectionWidth,
                  h: 0.35,
                  fontSize: 14,
                  fontFace: 'Arial',
                  color: textColor,
                });
              }
            });
          }
        });
      } else {
        // Contenu par défaut (pour les slides sans export spécifique)
        const slideTitle = slide.title || slide.heading || `Slide ${index + 1}`;
        slideObj.addText(slideTitle, {
          x: 0.5,
          y: yPos + 0.5,
          w: 9,
          h: 0.6,
          fontSize: 24,
          fontFace: 'Arial',
          bold: true,
          color: textColor,
          align: 'center',
        });
        
        if (slide.tagline || slide.statement) {
          slideObj.addText(slide.tagline || slide.statement, {
            x: 0.5,
            y: yPos + 1.2,
            w: 9,
            fontSize: 16,
            fontFace: 'Arial',
            color: subtitleColor,
            align: 'center',
          });
        }
      }

      // Ajouter les membres du jury pour la page de garde
      if (slide.template === 'cover' && slide.jury && Array.isArray(slide.jury) && slide.jury.length > 0) {
        let juryYPos = 5.5;
        
        // Titre de la section jury
        slideObj.addText('Membres du Jury', {
          x: 0.5,
          y: juryYPos,
          w: 9,
          h: 0.4,
          fontSize: 14,
          fontFace: 'Arial',
          bold: true,
          color: accentColor,
          align: 'center',
        });
        
        juryYPos += 0.5;
        
        // Ajouter chaque membre du jury
        slide.jury.forEach((member, idx) => {
          if (member.name && member.role) {
            const memberText = `${member.name} - ${member.role}`;
            slideObj.addText(memberText, {
              x: 0.5,
              y: juryYPos + (idx * 0.35),
              w: 9,
              h: 0.3,
              fontSize: 12,
              fontFace: 'Arial',
              color: subtitleColor,
              align: 'center',
            });
          }
        });
      }

      // Footer
      slideObj.addText('Wafacash', {
        x: 8,
        y: 6.8,
        w: 1.5,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        color: slide.background === 'black' ? '8C8C8C' : '6B6B6B',
        align: 'right',
        italic: true,
      });
    });

    // Générer et télécharger le fichier
    pptx.writeFile({ fileName: 'Wafacash_PayCash_Presentation.pptx' });
  } catch (error) {
    console.error('Erreur lors de la génération du PPTX:', error);
    throw error;
  }
};

const WafacashPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const slides = useMemo(() => slideDeck, []);
  const totalSlides = slides.length;
  const activeSlide = slides[currentSlide];

  const goTo = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  const handleDownload = async () => {
    if (isGenerating) return;
    
    try {
      setIsGenerating(true);
      await buildPptx(slides);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      alert(
        `Erreur lors de la génération du PPTX: ${error.message}\n\nVérifiez que:\n- La bibliothèque PptxGenJS est bien chargée\n- Votre navigateur autorise les téléchargements\n- Votre connexion internet est active`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="presentation-root">
      <header className="presentation-header">
        <div className="presentation-header__title">
          <span style={{ letterSpacing: '0.18em' }}>WAFACASH</span>
        </div>
        <div className="presentation-header__meta">
          Refonte du module PayCash — Intégration en Masse — Oussama DARIF
        </div>
        <button 
          type="button" 
          className="download-button" 
          onClick={handleDownload}
          disabled={isGenerating}
        >
          <span className="download-button__icon">
            <Download size={16} />
          </span>
          {isGenerating ? 'Génération...' : 'Télécharger le PPTX'}
        </button>
      </header>

      <main className="presentation-stage">
        <SlideRenderer slide={activeSlide} />
      </main>

      <footer className="presentation-footer">
        <button
          type="button"
          className="footer-nav-button"
          onClick={() => goTo(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={18} />
          Précédent
        </button>

        <div className="presentation-tip">
          Slide {currentSlide + 1} / {totalSlides} • Utilisez les flèches du clavier pour naviguer
        </div>

        <button
          type="button"
          className="footer-nav-button"
          onClick={() => goTo(currentSlide + 1)}
          disabled={currentSlide === totalSlides - 1}
        >
          Suivant
          <ChevronRight size={18} />
        </button>
      </footer>

      <div className="presentation-footer" style={{ background: 'rgba(0,0,0,0.04)' }}>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WafacashPresentation;

