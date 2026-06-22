export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  initials: string;
  photo: string | null;
  joinedYear: number;
  quote: string;
  bio: string;
  roleDescription: string;
  responsibilities: string[];
}

export const founder: TeamMember = {
  slug: 'attiogbe-emile',
  name: 'ATTIOGBE K. Emile',
  role: 'Fondateur & Directeur',
  initials: 'EA',
  photo: '/team/emile.jpg',
  joinedYear: 2021,
  quote: "Je crois profondément que chaque élève porte en lui un potentiel qui n'attend que les bonnes conditions pour s'épanouir. ESPOIR JEUNES BÉNIN est née de cette conviction.",
  bio: "Emile ATTIOGBE est titulaire d'une Licence en Génie Logiciel obtenue à l'Institut de Formation et de Recherche en Informatique (IFRI) de l'Université d'Abomey-Calavi. Alumni de la Fondation Mastercard, il a bénéficié du programme FAST (Fund for Alumni Start-ups in Transition), une initiative de la Fondation Mastercard qui accompagne les jeunes entrepreneurs africains en leur offrant un financement pouvant atteindre 15 000 USD ainsi qu'un encadrement structuré pour consolider et faire croître leurs startups en phase de transition. Il bénéficie actuellement du programme Associates de la Fondation Mastercard, un stage rémunéré de 12 mois conçu pour les jeunes diplômés africains souhaitant développer leurs compétences en leadership, en entrepreneuriat et en employabilité au sein d'organisations partenaires à travers plus de 22 pays du continent. Originaire d'Aplahoué, dans le département du Couffo, Emile a fondé ESPOIR JEUNES BÉNIN en 2021 après avoir constaté le manque criant de ressources pédagogiques dans sa commune. Il a mobilisé bénévoles et partenaires pour bâtir une organisation structurée et impactante au service de plus de 600 élèves.",
  roleDescription: "En tant que Fondateur et Directeur, Emile définit la vision et la stratégie globale de l'organisation. Il supervise l'ensemble des programmes, coordonne les relations avec les partenaires institutionnels et financiers, et représente ESPOIR JEUNES BÉNIN lors des événements publics. Son parcours en génie logiciel et son expérience au sein des programmes de la Fondation Mastercard lui permettent d'apporter une approche moderne et structurée à la gestion de l'ONG.",
  responsibilities: [
    "Définition de la vision et des orientations stratégiques",
    "Coordination des programmes pédagogiques",
    "Relations avec les partenaires et bailleurs de fonds",
    "Représentation institutionnelle de l'ONG",
    "Recrutement et formation des bénévoles",
    "Suivi et évaluation de l'impact des actions",
  ],
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'attiogbe-emile',
    name: 'ATTIOGBE K. Emile',
    role: 'Fondateur & Directeur',
    initials: 'EA',
    photo: '/team/emile.jpg',
    joinedYear: 2021,
    quote: "Je crois profondément que chaque élève porte en lui un potentiel qui n'attend que les bonnes conditions pour s'épanouir.",
    bio: "Emile ATTIOGBE est titulaire d'une Licence en Génie Logiciel obtenue à l'Institut de Formation et de Recherche en Informatique (IFRI) de l'Université d'Abomey-Calavi. Alumni de la Fondation Mastercard, il a bénéficié du programme FAST (Fund for Alumni Start-ups in Transition), une initiative de la Fondation Mastercard qui accompagne les jeunes entrepreneurs africains en leur offrant un financement pouvant atteindre 15 000 USD ainsi qu'un encadrement structuré pour consolider et faire croître leurs startups en phase de transition. Il bénéficie actuellement du programme Associates de la Fondation Mastercard, un stage rémunéré de 12 mois conçu pour les jeunes diplômés africains souhaitant développer leurs compétences en leadership, en entrepreneuriat et en employabilité au sein d'organisations partenaires à travers plus de 22 pays du continent. Originaire d'Aplahoué, dans le département du Couffo, Emile a fondé ESPOIR JEUNES BÉNIN en 2021 après avoir constaté le manque criant de ressources pédagogiques dans sa commune. Il a mobilisé bénévoles et partenaires pour bâtir une organisation structurée et impactante au service de plus de 600 élèves.",
    roleDescription: "En tant que Fondateur et Directeur, Emile définit la vision et la stratégie globale de l'organisation. Il supervise l'ensemble des programmes, coordonne les relations avec les partenaires institutionnels et financiers, et représente ESPOIR JEUNES BÉNIN lors des événements publics. Son parcours en génie logiciel et son expérience au sein des programmes de la Fondation Mastercard lui permettent d'apporter une approche moderne et structurée à la gestion de l'ONG.",
    responsibilities: [
      "Définition de la vision et des orientations stratégiques",
      "Coordination des programmes pédagogiques",
      "Relations avec les partenaires et bailleurs de fonds",
      "Représentation institutionnelle de l'ONG",
      "Recrutement et formation des bénévoles",
      "Suivi et évaluation de l'impact des actions",
    ],
  },
  {
    slug: 'adjoua-marie',
    name: 'Adjoua Marie',
    role: 'Coordinatrice pédagogique',
    initials: 'AM',
    photo: '/team/marie.jpg',
    joinedYear: 2021,
    quote: "Accompagner un élève vers la réussite, c'est lui offrir bien plus qu'un cours — c'est lui redonner confiance en lui-même.",
    bio: "Enseignante de formation, Adjoua Marie a rejoint ESPOIR JEUNES BÉNIN dès ses premiers mois d'existence en 2021. Passionnée par la pédagogie différenciée, elle a contribué à structurer les séances de TD en groupes de niveau, permettant un suivi plus personnalisé de chaque élève. Elle coordonne aujourd'hui une équipe de 20 bénévoles enseignants et veille à la qualité des contenus pédagogiques dispensés lors des sessions.",
    roleDescription: "Adjoua Marie est le pilier pédagogique de l'organisation. Elle conçoit les programmes de soutien scolaire, organise les emplois du temps des bénévoles enseignants et assure la liaison avec les établissements scolaires partenaires. Elle est aussi responsable de l'évaluation régulière des progrès des élèves bénéficiaires.",
    responsibilities: [
      "Conception et mise en œuvre des programmes de TD",
      "Coordination de l'équipe de bénévoles enseignants",
      "Liaison avec les établissements scolaires",
      "Évaluation des progrès des élèves bénéficiaires",
      "Organisation des sessions de soutien scolaire",
      "Formation continue des bénévoles pédagogiques",
    ],
  },
  {
    slug: 'kossi-bernard',
    name: 'Kossi Bernard',
    role: 'Responsable logistique',
    initials: 'KB',
    photo: '/team/bernard.jpg',
    joinedYear: 2022,
    quote: "Derrière chaque distribution réussie, il y a des semaines de planification discrète. Je suis heureux d'être cette main invisible.",
    bio: "Kossi Bernard a intégré l'équipe en 2022, apportant son expérience en gestion de projets associatifs. Rigoureux et organisé, il a mis en place les premiers processus logistiques de l'ONG, notamment pour les distributions de fournitures scolaires. Son travail de terrain l'amène régulièrement à visiter les familles des élèves bénéficiaires pour s'assurer que les kits scolaires correspondent réellement aux besoins de chacun.",
    roleDescription: "Kossi Bernard est chargé de l'ensemble de la chaîne logistique de l'organisation : approvisionnement en fournitures scolaires, gestion des stocks, organisation des distributions et coordination des équipes de bénévoles sur le terrain. Il est également responsable de la gestion du matériel et des équipements utilisés lors des formations pratiques.",
    responsibilities: [
      "Gestion des achats et de l'approvisionnement en fournitures",
      "Organisation des distributions de kits scolaires",
      "Coordination des équipes bénévoles sur le terrain",
      "Gestion des stocks et des équipements",
      "Planification logistique des événements",
      "Suivi budgétaire des opérations logistiques",
    ],
  },
  {
    slug: 'fifonsi-grace',
    name: 'Fifonsi Grâce',
    role: 'Chargée de communication',
    initials: 'FG',
    photo: '/team/grace.jpg',
    joinedYear: 2022,
    quote: "Notre mission mérite d'être connue. Chaque histoire partagée est une chance d'inspirer un nouveau bénévole ou partenaire.",
    bio: "Fifonsi Grâce a rejoint l'équipe en 2022 avec une formation en communication et médias. C'est grâce à elle que l'ONG a développé sa présence sur les réseaux sociaux et amélioré sa visibilité auprès des partenaires potentiels. Elle est l'auteure des rapports d'activités annuels de l'organisation et gère les relations avec la presse locale. Son travail de documentation photographique constitue aujourd'hui une mémoire visuelle précieuse pour l'ONG.",
    roleDescription: "Fifonsi Grâce pilote l'ensemble de la stratégie de communication interne et externe d'ESPOIR JEUNES BÉNIN. Elle gère les réseaux sociaux, rédige les contenus du site web, prépare les dossiers de partenariat et assure la couverture médiatique des événements. Elle est aussi l'interlocutrice principale pour les journalistes et médias souhaitant couvrir les actions de l'ONG.",
    responsibilities: [
      "Gestion des réseaux sociaux et du site web",
      "Rédaction des rapports d'activités annuels",
      "Couverture photo et vidéo des événements",
      "Relations presse et médias",
      "Production de supports de communication",
      "Gestion des dossiers de partenariat",
    ],
  },
];

export const timeline = [
  {
    year: 2021,
    event: "Création de l'ONG",
    detail: "Premiers TD gratuits organisés à Aplahoué avec une équipe de 5 bénévoles et 80 élèves bénéficiaires.",
  },
  {
    year: 2022,
    event: "Lancement des fournitures scolaires",
    detail: "Premier programme de distribution de kits scolaires, touchant 130 nouveaux élèves.",
  },
  {
    year: 2023,
    event: "Démarrage des formations pratiques",
    detail: "Introduction d'ateliers thématiques sur les compétences transversales, avec des formateurs externes.",
  },
  {
    year: 2024,
    event: "600e bénéficiaire franchi",
    detail: "Milestone historique : l'ONG dépasse les 600 élèves accompagnés depuis sa création.",
  },
];
