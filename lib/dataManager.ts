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

// Fonction pour obtenir les activités
export const getActivities = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    const data = await loadStaticData()
    return data.activities
  }
}

// Fonction pour obtenir une activité par ID
export const getActivityById = async (id: string) => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    const data = await loadStaticData()
    return data.activities.find(activity => activity.id === id)
  }
}

// Fonction pour obtenir les actualités
export const getNews = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    const data = await loadStaticData()
    return data.news
  }
}

// Fonction pour obtenir le contenu À propos
export const getAbout = async () => {
  if (isLocal) {
    // En local, utiliser la base de données
    return null // Les APIs locales géreront cela
  } else {
    // En production, utiliser les données statiques
    const data = await loadStaticData()
    return data.about
  }
}

console.log(`🔧 Mode: ${isLocal ? 'LOCAL (Base de données)' : 'PRODUCTION (Données statiques)'}`)
