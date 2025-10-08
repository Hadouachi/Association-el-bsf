// Gestionnaire de données pour local vs production
import { getAllLocalActivities, getLocalActivityById } from '../data/localActivities'

// Détection de l'environnement
export const isLocal = process.env.NODE_ENV === 'development' || process.env.VERCEL !== 'true'
export const isProduction = process.env.VERCEL === 'true'

// Données statiques pour la production (seront générées automatiquement)
let staticData: {
  activities: any[]
  news: any[]
  about: any[]
} | null = null

// Fonction pour charger les données statiques en production
export const loadStaticData = async () => {
  if (staticData) return staticData

  try {
    // En production, charger depuis le fichier exporté
    const fs = require('fs')
    const path = require('path')
    const dataPath = path.join(process.cwd(), 'data-export.json')
    
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, 'utf8')
      const exportedData = JSON.parse(rawData)
      
      staticData = {
        activities: exportedData.activities || [],
        news: exportedData.news || [],
        about: exportedData.about || []
      }
      
      console.log('✅ Données statiques chargées:', {
        activities: staticData.activities.length,
        news: staticData.news.length,
        about: staticData.about.length
      })
    } else {
      // Fallback vers les données locales
      staticData = {
        activities: getAllLocalActivities(),
        news: [],
        about: []
      }
      console.log('⚠️ Fichier data-export.json non trouvé, utilisation des données locales')
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des données statiques:', error)
    // Fallback vers les données locales
    staticData = {
      activities: getAllLocalActivities(),
      news: [],
      about: []
    }
  }

  return staticData
}

// Données statiques hardcodées pour la production (fallback)
const FALLBACK_DATA = {
  activities: [
    {
      id: "1",
      title: "Formation React - Développement Web",
      description: "Apprenez React de A à Z avec des projets pratiques",
      longDescription: "Cette formation complète vous permettra de maîtriser React et de développer des applications web modernes.",
      date: "2024-12-15",
      time: "14:00",
      location: "Salle de formation",
      participants: "20",
      status: "upcoming",
      coverImage: "/images/activities/test-react.svg",
      images: [],
      videos: [],
      contentBlocks: [],
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2024-12-01T10:00:00.000Z"
    }
  ],
  news: [
    {
      id: "1",
      title: "Ouverture de nouveaux cours de Tajweed",
      excerpt: "Nous sommes ravis d'annoncer l'ouverture de nouveaux cours de Tajweed pour tous les niveaux.",
      content: "Ces cours sont conçus pour améliorer votre récitation du Coran avec les règles appropriées.",
      author: "Association El BSF",
      category: "Éducation",
      image: "/images/news/tajweed.jpg",
      status: "published",
      publishedAt: "2024-12-01T10:00:00.000Z",
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2024-12-01T10:00:00.000Z"
    }
  ],
  about: [
    {
      id: "1",
      title: "À propos de l'Association El BSF",
      subtitle: "Notre mission",
      description: "L'Association El BSF œuvre pour l'éducation et le développement communautaire.",
      coverImage: "/images/about/association.jpg",
      status: "published",
      createdAt: "2024-12-01T10:00:00.000Z",
      updatedAt: "2024-12-01T10:00:00.000Z"
    }
  ]
}

// Fonction pour obtenir les activités
export const getActivities = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    try {
      const data = await loadStaticData()
      return data.activities.length > 0 ? data.activities : FALLBACK_DATA.activities
    } catch (error) {
      console.log('⚠️ Utilisation des données de fallback pour les activités')
      return FALLBACK_DATA.activities
    }
  }
}

// Fonction pour obtenir une activité par ID
export const getActivityById = async (id: string) => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    try {
      const data = await loadStaticData()
      const activities = data.activities.length > 0 ? data.activities : FALLBACK_DATA.activities
      return activities.find(activity => activity.id === id)
    } catch (error) {
      console.log('⚠️ Utilisation des données de fallback pour l\'activité')
      return FALLBACK_DATA.activities.find(activity => activity.id === id)
    }
  }
}

// Fonction pour obtenir les actualités
export const getNews = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    try {
      const data = await loadStaticData()
      return data.news.length > 0 ? data.news : FALLBACK_DATA.news
    } catch (error) {
      console.log('⚠️ Utilisation des données de fallback pour les actualités')
      return FALLBACK_DATA.news
    }
  }
}

// Fonction pour obtenir le contenu À propos
export const getAbout = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    try {
      const data = await loadStaticData()
      return data.about.length > 0 ? data.about : FALLBACK_DATA.about
    } catch (error) {
      console.log('⚠️ Utilisation des données de fallback pour le contenu À propos')
      return FALLBACK_DATA.about
    }
  }
}

console.log(`🔧 Mode: ${isLocal ? 'LOCAL (Base de données)' : 'PRODUCTION (Données statiques)'}`)
