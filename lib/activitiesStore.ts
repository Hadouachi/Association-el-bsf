import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getAllLocalActivities, getLocalActivityById, LocalActivity } from '../data/localActivities'

export interface ContentBlock {
  id: string
  type: 'title' | 'paragraph' | 'image-gallery' | 'video'
  content: string
  images?: string[]
  videos?: Array<{
    src: string
    title: string
    description: string
    poster: string
  }>
  style?: string
  order: number
}

export interface Activity {
  id: string
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  location: string
  participants: string
  status: 'upcoming' | 'ongoing' | 'completed'
  coverImage: string
  images: string[]
  videos: Array<{
    src: string
    title: string
    description: string
    poster: string
  }>
  contentBlocks: ContentBlock[]
  createdAt: string
  updatedAt: string
}

interface ActivitiesStore {
  activities: Activity[]
  isLoading: boolean
  error: string | null
  setActivities: (activities: Activity[]) => void
  fetchActivities: () => Promise<void>
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateActivity: (id: string, activity: Partial<Activity>) => Promise<void>
  deleteActivity: (id: string) => Promise<void>
  getActivity: (id: string) => Activity | undefined
}

export const useActivitiesStoreNew = create<ActivitiesStore>()(
  persist(
    (set, get) => ({
      activities: [],
      isLoading: false,
      error: null,

      setActivities: (activities) => set({ activities }),

      fetchActivities: async () => {
        set({ isLoading: true, error: null })
        try {
          console.log('🔄 Récupération des activités...')
          
          // Essayer d'abord l'API
          try {
            const response = await fetch('/api/activities')
            if (response.ok) {
              const data = await response.json()
              console.log('✅ Activités récupérées depuis l\'API:', data.length)
              set({ activities: data, isLoading: false })
              return
            }
          } catch (apiError) {
            console.warn('⚠️ API non disponible, utilisation des données locales')
          }
          
          // Fallback vers les données locales
          const localData = getAllLocalActivities()
          console.log('✅ Activités chargées depuis les données locales:', localData.length)
          set({ activities: localData, isLoading: false })
          
        } catch (error) {
          console.error('❌ Erreur lors de la récupération des activités:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Erreur inconnue', 
            isLoading: false 
          })
        }
      },

      addActivity: async (activityData) => {
        set({ isLoading: true, error: null })
        try {
          console.log('➕ Création d\'une nouvelle activité...')
          const response = await fetch('/api/activities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Erreur lors de la création de l\'activité')
          }

          const data = await response.json()
          console.log('✅ Activité créée:', data.id)
          
          set((state) => ({
            activities: [...state.activities, data],
            isLoading: false
          }))
        } catch (error) {
          console.error('❌ Erreur lors de la création de l\'activité:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Erreur inconnue', 
            isLoading: false 
          })
          throw error
        }
      },

      updateActivity: async (id, updates) => {
        set({ isLoading: true, error: null })
        try {
          console.log('🔄 Mise à jour de l\'activité:', id)
          const response = await fetch(`/api/activities/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Erreur lors de la mise à jour de l\'activité')
          }

          console.log('✅ Activité mise à jour')
          
          set((state) => ({
            activities: state.activities.map(a => 
              a.id === id ? { ...a, ...updates } : a
            ),
            isLoading: false
          }))
        } catch (error) {
          console.error('❌ Erreur lors de la mise à jour de l\'activité:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Erreur inconnue', 
            isLoading: false 
          })
          throw error
        }
      },

      deleteActivity: async (id) => {
        set({ isLoading: true, error: null })
        try {
          console.log('🗑️ Suppression de l\'activité:', id)
          const response = await fetch(`/api/activities/${id}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Erreur lors de la suppression de l\'activité')
          }

          console.log('✅ Activité supprimée')
          
          set((state) => ({
            activities: state.activities.filter(a => a.id !== id),
            isLoading: false
          }))
        } catch (error) {
          console.error('❌ Erreur lors de la suppression de l\'activité:', error)
          set({ 
            error: error instanceof Error ? error.message : 'Erreur inconnue', 
            isLoading: false 
          })
          throw error
        }
      },

      getActivity: (id) => {
        const state = get()
        let activity = state.activities.find(activity => activity.id === id)
        
        // Si pas trouvé dans le store, essayer les données locales
        if (!activity) {
          activity = getLocalActivityById(id)
          if (activity) {
            console.log('✅ Activité trouvée dans les données locales:', id)
          }
        }
        
        return activity
      }
    }),
    {
      name: 'activities-storage-new',
    }
  )
)

export const useActivitiesStore = useActivitiesStoreNew
