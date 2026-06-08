export const programs = [
  {
    id: 'td-gratuits',
    slug: 'td-gratuits',
    icon: '📖',
    colorVar: '--clr-primary',
    color: '#1B6B45',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80&auto=format&fit=crop',
    bgGradient: 'linear-gradient(135deg, #0D1A12 0%, #1B6B45 100%)',
    title: 'TD Gratuits',
    subtitle: 'Travaux Dirigés Gratuits',
    tagline: 'Soutien scolaire hebdomadaire',
    summary: 'Des sessions de travaux dirigés gratuites organisées chaque semaine pour aider les élèves à consolider leurs acquis.',
    detail: `Chaque semaine, nos bénévoles organisent des sessions de travaux dirigés ouvertes à tous les élèves d'Aplahoué, du CM2 à la terminale. Les TD couvrent les matières fondamentales : mathématiques, français, sciences et anglais.

Les séances se déroulent dans un environnement structuré et bienveillant, où les élèves peuvent poser leurs questions sans jugement. Nos encadreurs, eux-mêmes issus de la communauté, comprennent les réalités et les défis des élèves.`,
    stats: [
      { label: 'Sessions/an', value: '12+' },
      { label: 'Bénévoles', value: '20+' },
      { label: 'Matières', value: '4' },
      { label: 'Niveaux', value: 'CM2 → Tle' },
    ],
  },
  {
    id: 'fournitures',
    slug: 'fournitures',
    icon: '🎒',
    colorVar: '--clr-accent',
    color: '#E8A44A',
    img: 'https://images.unsplash.com/photo-1456513080867-f4b36cec0b1a?w=900&q=80&auto=format&fit=crop',
    bgGradient: 'linear-gradient(135deg, #1a0e00 0%, #CF8E35 100%)',
    title: 'Fournitures Scolaires',
    subtitle: 'Distribution de Fournitures',
    tagline: 'Distribution de kits scolaires',
    summary: 'Distribution de fournitures et de matériel scolaire aux élèves dans le besoin pour garantir une rentrée équitable.',
    detail: `Au début de chaque année scolaire, l'ONG organise une campagne de collecte et de distribution de fournitures scolaires. Chaque kit comprend : cahiers, stylos, règles, crayons, équerre, compas et trousse.

Les bénéficiaires sont sélectionnés en coordination avec les établissements scolaires locaux, sur la base de critères socio-économiques définis et transparents. La priorité est donnée aux élèves en situation de vulnérabilité.`,
    stats: [
      { label: 'Kits distribués', value: '300+' },
      { label: 'Établissements', value: '5+' },
      { label: 'Articles/kit', value: '8' },
      { label: 'Distribution', value: 'Annuelle' },
    ],
  },
  {
    id: 'formations',
    slug: 'formations',
    icon: '🏅',
    colorVar: '--clr-primary-muted',
    color: '#2EAD6F',
    img: 'https://images.unsplash.com/photo-1521737604082-b39e2b1cca47?w=900&q=80&auto=format&fit=crop',
    bgGradient: 'linear-gradient(135deg, #0a1f13 0%, #2EAD6F 100%)',
    title: 'Formations',
    subtitle: "Sessions de Formation",
    tagline: 'Ateliers pratiques et transversaux',
    summary: "Des ateliers thématiques pour développer les compétences pratiques et transversales des jeunes au-delà du cadre académique.",
    detail: `Nos ateliers de formation abordent des thèmes essentiels pour la vie des jeunes : gestion du temps et des priorités, communication et expression orale, initiation à l'entrepreneuriat, hygiène et santé, et orientation scolaire et professionnelle.

Ces formations, animées par des professionnels bénévoles, permettent aux élèves de développer des compétences transversales qui complètent leur parcours académique et les préparent aux défis de la vie.`,
    stats: [
      { label: 'Thèmes', value: '6+' },
      { label: 'Formateurs', value: '12+' },
      { label: 'Durée/atelier', value: '3–4h' },
      { label: 'Fréquence', value: 'Trimestrielle' },
    ],
  },
] as const;

export const galleryItems = [
  {
    id: 1, category: 'td', color: '#0F7A4A',
    label: 'Session TD — Mathématiques',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 2, category: 'supplies', color: '#F97316',
    label: 'Distribution kits scolaires 2023',
    img: 'https://images.unsplash.com/photo-1434030216411-0b5816ebe5bf?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 3, category: 'training', color: '#16A34A',
    label: 'Atelier — Expression orale',
    img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 4, category: 'td', color: '#0A5C37',
    label: 'Session TD — Français',
    img: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 5, category: 'supplies', color: '#EA580C',
    label: 'Remise de fournitures — Aplahoué',
    img: 'https://images.unsplash.com/photo-1456513080867-f4b36cec0b1a?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 6, category: 'training', color: '#0F7A4A',
    label: 'Atelier — Orientation scolaire',
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 7, category: 'td', color: '#16A34A',
    label: 'TD Sciences — Lycée',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 8, category: 'supplies', color: '#EAB308',
    label: 'Collecte de fournitures',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 9, category: 'training', color: '#0F7A4A',
    label: 'Atelier — Gestion du temps',
    img: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 10, category: 'td', color: '#0A5C37',
    label: 'Cérémonie remise attestations',
    img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 11, category: 'supplies', color: '#F97316',
    label: 'Distribution 2024 — École primaire',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f84c6?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 12, category: 'training', color: '#16A34A',
    label: 'Atelier — Entrepreneuriat jeune',
    img: 'https://images.unsplash.com/photo-1521737604082-b39e2b1cca47?w=700&q=80&auto=format&fit=crop',
  },
];

export const newsArticles = [
  {
    id: 1,
    date: '2024-11-15',
    category: 'Événement',
    title: 'ESPOIR JEUNES BÉNIN franchit le cap des 600 élèves bénéficiaires',
    excerpt: "Une étape historique pour notre ONG : depuis sa fondation en 2021, plus de 600 élèves ont bénéficié de nos programmes d'accompagnement scolaire à Aplahoué.",
    readTime: '3 min',
  },
  {
    id: 2,
    date: '2024-09-05',
    category: 'Programme',
    title: 'Rentrée scolaire 2024 : distribution de 150 kits scolaires',
    excerpt: "Pour la quatrième année consécutive, l'ONG a distribué des fournitures scolaires aux élèves dans le besoin d'Aplahoué, à l'occasion de la rentrée des classes.",
    readTime: '2 min',
  },
  {
    id: 3,
    date: '2024-07-20',
    category: 'Formation',
    title: 'Atelier entrepreneuriat : 45 lycéens formés à l\'initiative',
    excerpt: "Un atelier de deux jours sur l'entrepreneuriat et l'initiative a réuni 45 lycéens d'Aplahoué, animé par des professionnels bénévoles issus de la diaspora béninoise.",
    readTime: '4 min',
  },
];
