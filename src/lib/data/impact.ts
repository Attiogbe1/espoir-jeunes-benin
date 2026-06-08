export const impactCounters = [
  { value: 600, suffix: '+', labelKey: 'counters.students', icon: '👨‍🎓' },
  { value: 4,   suffix: '',  labelKey: 'counters.years',    icon: '📅' },
  { value: 3,   suffix: '',  labelKey: 'counters.programs', icon: '🗂️' },
  { value: 1,   suffix: '',  labelKey: 'counters.commune',  icon: '📍' },
] as const;

export const impactMetrics = [
  { value: 600, suffix: '+', label: 'Élèves bénéficiaires', icon: '👨‍🎓', description: 'depuis la fondation en 2021' },
  { value: 4,   suffix: '',  label: "Années d'action",      icon: '📅', description: 'de présence continue sur le terrain' },
  { value: 3,   suffix: '',  label: 'Programmes actifs',    icon: '🗂️', description: 'TD, Fournitures et Formations' },
  { value: 1,   suffix: '',  label: 'Commune couverte',     icon: '📍', description: 'Aplahoué, Département du Couffo' },
  { value: 50,  suffix: '+', label: 'Bénévoles mobilisés',  icon: '🤝', description: 'engagés localement chaque année' },
  { value: 12,  suffix: '',  label: 'Sessions annuelles',   icon: '📚', description: 'de TD gratuits par an en moyenne' },
];

export const beneficiaryEvolution = [
  { year: 2021, count: 80 },
  { year: 2022, count: 210 },
  { year: 2023, count: 420 },
  { year: 2024, count: 600 },
];
