// Données locales des activités avec médias statiques
export interface LocalActivity {
  id: string
  title: string
  description: string
  longDescription?: string
  date: string
  time: string
  location: string
  participants: number
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
  coverImage: string
  images: string[]
  videos: Array<{
    src: string
    title: string
    description: string
    poster: string
  }>
  contentBlocks: Array<{
    id: string
    type: 'text' | 'image' | 'video' | 'gallery'
    content: string
    order: number
    settings?: any
  }>
  createdAt: string
  updatedAt: string
}

export const localActivities: LocalActivity[] = [
  {
    id: '1',
    title: 'Atelier de Formation Professionnelle',
    description: 'Formation intensive en développement web et design',
    longDescription: 'Un atelier complet de 3 jours pour apprendre les bases du développement web moderne, incluant HTML, CSS, JavaScript et React. Cette formation s\'adresse aux débutants et aux personnes souhaitant se reconvertir dans le domaine du numérique.',
    date: '2025-01-15',
    time: '09:00',
    location: 'Centre de Formation El BSF, Casablanca',
    participants: 25,
    status: 'UPCOMING',
    coverImage: '/images/activities/formation-web.jpg',
    images: [
      '/images/activities/formation-1.jpg',
      '/images/activities/formation-2.jpg',
      '/images/activities/formation-3.jpg'
    ],
    videos: [
      {
        src: '/videos/activities/formation-preview.mp4',
        title: 'Aperçu de la formation',
        description: 'Découvrez le contenu de notre formation en développement web',
        poster: '/images/activities/formation-poster.jpg'
      }
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Notre formation en développement web couvre tous les aspects essentiels pour devenir un développeur professionnel.',
        order: 1
      },
      {
        id: 'block-2',
        type: 'image',
        content: '/images/activities/formation-details.jpg',
        order: 2
      },
      {
        id: 'block-3',
        type: 'video',
        content: '/videos/activities/formation-demo.mp4',
        order: 3
      }
    ],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Campagne de Sensibilisation',
    description: 'Sensibilisation sur l\'importance de l\'éducation numérique',
    longDescription: 'Une campagne de sensibilisation dans les quartiers populaires pour promouvoir l\'importance de l\'éducation numérique et l\'accès aux technologies de l\'information.',
    date: '2025-01-20',
    time: '14:00',
    location: 'Quartier Hay Mohammadi, Casablanca',
    participants: 50,
    status: 'UPCOMING',
    coverImage: '/images/activities/sensibilisation.jpg',
    images: [
      '/images/activities/sensibilisation-1.jpg',
      '/images/activities/sensibilisation-2.jpg'
    ],
    videos: [
      {
        src: '/videos/activities/sensibilisation-campagne.mp4',
        title: 'Campagne de sensibilisation',
        description: 'Retour sur notre campagne de sensibilisation',
        poster: '/images/activities/sensibilisation-poster.jpg'
      }
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Notre campagne vise à sensibiliser les familles sur l\'importance de l\'éducation numérique pour leurs enfants.',
        order: 1
      },
      {
        id: 'block-2',
        type: 'gallery',
        content: JSON.stringify([
          '/images/activities/sensibilisation-gallery-1.jpg',
          '/images/activities/sensibilisation-gallery-2.jpg',
          '/images/activities/sensibilisation-gallery-3.jpg'
        ]),
        order: 2
      }
    ],
    createdAt: '2024-12-01T11:00:00Z',
    updatedAt: '2024-12-01T11:00:00Z'
  },
  {
    id: '3',
    title: 'Formation en Entrepreneuriat',
    description: 'Apprendre à créer et gérer son entreprise',
    longDescription: 'Formation complète sur l\'entrepreneuriat, incluant la création d\'entreprise, la gestion financière, le marketing et la vente. Cette formation s\'adresse aux jeunes entrepreneurs et aux porteurs de projets.',
    date: '2024-12-10',
    time: '10:00',
    location: 'Centre El BSF, Casablanca',
    participants: 30,
    status: 'COMPLETED',
    coverImage: '/images/activities/entrepreneuriat.jpg',
    images: [
      '/images/activities/entrepreneuriat-1.jpg',
      '/images/activities/entrepreneuriat-2.jpg',
      '/images/activities/entrepreneuriat-3.jpg',
      '/images/activities/entrepreneuriat-4.jpg'
    ],
    videos: [
      {
        src: '/videos/activities/entrepreneuriat-temoignage.mp4',
        title: 'Témoignages des participants',
        description: 'Les participants partagent leur expérience',
        poster: '/images/activities/entrepreneuriat-poster.jpg'
      }
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Formation réussie avec 30 participants qui ont pu développer leurs compétences entrepreneuriales.',
        order: 1
      },
      {
        id: 'block-2',
        type: 'image',
        content: '/images/activities/entrepreneuriat-success.jpg',
        order: 2
      }
    ],
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2024-12-10T18:00:00Z'
  },
  {
    id: '4',
    title: 'Atelier de Coding pour Enfants',
    description: 'Initiation à la programmation pour les 8-14 ans',
    longDescription: 'Atelier ludique d\'initiation à la programmation pour les enfants âgés de 8 à 14 ans. Utilisation de Scratch et d\'outils adaptés pour apprendre les bases de la logique de programmation.',
    date: '2025-01-25',
    time: '15:00',
    location: 'École Primaire Al Amal, Casablanca',
    participants: 20,
    status: 'UPCOMING',
    coverImage: '/images/activities/coding-enfants.jpg',
    images: [
      '/images/activities/coding-enfants-1.jpg',
      '/images/activities/coding-enfants-2.jpg'
    ],
    videos: [
      {
        src: '/videos/activities/coding-enfants-demo.mp4',
        title: 'Démonstration Scratch',
        description: 'Les enfants apprennent à programmer avec Scratch',
        poster: '/images/activities/coding-enfants-poster.jpg'
      }
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Un atelier spécialement conçu pour les enfants pour découvrir la programmation de manière ludique.',
        order: 1
      },
      {
        id: 'block-2',
        type: 'video',
        content: '/videos/activities/coding-enfants-tutorial.mp4',
        order: 2
      }
    ],
    createdAt: '2024-12-01T12:00:00Z',
    updatedAt: '2024-12-01T12:00:00Z'
  },
  {
    id: '5',
    title: 'Formation en Marketing Digital',
    description: 'Maîtriser les outils du marketing en ligne',
    longDescription: 'Formation complète sur le marketing digital, incluant les réseaux sociaux, le SEO, Google Ads, Facebook Ads et l\'email marketing. Formation pratique avec des cas d\'étude réels.',
    date: '2024-11-20',
    time: '09:30',
    location: 'Centre de Formation El BSF, Casablanca',
    participants: 35,
    status: 'COMPLETED',
    coverImage: '/images/activities/marketing-digital.jpg',
    images: [
      '/images/activities/marketing-digital-1.jpg',
      '/images/activities/marketing-digital-2.jpg',
      '/images/activities/marketing-digital-3.jpg'
    ],
    videos: [
      {
        src: '/videos/activities/marketing-digital-casestudy.mp4',
        title: 'Étude de cas marketing',
        description: 'Analyse d\'une campagne marketing réussie',
        poster: '/images/activities/marketing-digital-poster.jpg'
      }
    ],
    contentBlocks: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Formation intensive de 5 jours qui a permis aux participants de maîtriser les fondamentaux du marketing digital.',
        order: 1
      },
      {
        id: 'block-2',
        type: 'gallery',
        content: JSON.stringify([
          '/images/activities/marketing-gallery-1.jpg',
          '/images/activities/marketing-gallery-2.jpg',
          '/images/activities/marketing-gallery-3.jpg',
          '/images/activities/marketing-gallery-4.jpg'
        ]),
        order: 2
      }
    ],
    createdAt: '2024-10-15T08:00:00Z',
    updatedAt: '2024-11-25T17:00:00Z'
  }
]

// Fonction pour obtenir une activité par ID
export const getLocalActivityById = (id: string): LocalActivity | undefined => {
  return localActivities.find(activity => activity.id === id)
}

// Fonction pour obtenir toutes les activités
export const getAllLocalActivities = (): LocalActivity[] => {
  return localActivities
}

// Fonction pour obtenir les activités par statut
export const getLocalActivitiesByStatus = (status: LocalActivity['status']): LocalActivity[] => {
  return localActivities.filter(activity => activity.status === status)
}
