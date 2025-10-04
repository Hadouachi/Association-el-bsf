import { create } from 'zustand'

export interface AboutContent {
  id: string
  title: string
  subtitle?: string
  description?: string
  coverImage?: string
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

interface AboutStore {
  aboutContent: AboutContent | null
  isLoading: boolean
  error: string | null
  fetchAboutContent: () => Promise<void>
  updateAboutContent: (id: string, data: Partial<AboutContent>) => Promise<void>
  createAboutContent: (data: Omit<AboutContent, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  deleteAboutContent: (id: string) => Promise<void>
}

export const useAboutStore = create<AboutStore>((set, get) => ({
  aboutContent: null,
  isLoading: false,
  error: null,

  fetchAboutContent: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch('/api/about')
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du contenu À propos')
      }
      
      const data = await response.json()
      set({ aboutContent: data, isLoading: false })
    } catch (error) {
      console.error('Erreur fetchAboutContent:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  updateAboutContent: async (id: string, data: Partial<AboutContent>) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`/api/about/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du contenu À propos')
      }
      
      const updatedContent = await response.json()
      set({ aboutContent: updatedContent, isLoading: false })
    } catch (error) {
      console.error('Erreur updateAboutContent:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  createAboutContent: async (data: Omit<AboutContent, 'id' | 'createdAt' | 'updatedAt'>) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch('/api/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création du contenu À propos')
      }
      
      const newContent = await response.json()
      set({ aboutContent: newContent, isLoading: false })
    } catch (error) {
      console.error('Erreur createAboutContent:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  deleteAboutContent: async (id: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch(`/api/about/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du contenu À propos')
      }
      
      set({ aboutContent: null, isLoading: false })
    } catch (error) {
      console.error('Erreur deleteAboutContent:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },
}))
