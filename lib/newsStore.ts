import { create } from 'zustand'

export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image: string
  status: 'draft' | 'published' | 'archived'
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

interface NewsStore {
  news: News[]
  currentNews: News | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchNews: () => Promise<void>
  fetchNewsById: (id: string) => Promise<void>
  addNews: (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateNews: (id: string, news: Partial<News>) => Promise<void>
  deleteNews: (id: string) => Promise<void>
  setCurrentNews: (news: News | null) => void
  clearError: () => void
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  news: [],
  currentNews: null,
  isLoading: false,
  error: null,

  fetchNews: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/news')
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des actualités')
      }
      const news = await response.json()
      set({ news, isLoading: false })
    } catch (error) {
      console.error('Erreur fetchNews:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  fetchNewsById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/news/${id}`)
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'actualité')
      }
      const news = await response.json()
      set({ currentNews: news, isLoading: false })
    } catch (error) {
      console.error('Erreur fetchNewsById:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  addNews: async (newsData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'actualité')
      }
      
      const newNews = await response.json()
      set(state => ({ 
        news: [newNews, ...state.news],
        isLoading: false 
      }))
    } catch (error) {
      console.error('Erreur addNews:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  updateNews: async (id, newsData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'actualité')
      }
      
      const updatedNews = await response.json()
      set(state => ({
        news: state.news.map(news => 
          news.id === id ? updatedNews : news
        ),
        currentNews: state.currentNews?.id === id ? updatedNews : state.currentNews,
        isLoading: false
      }))
    } catch (error) {
      console.error('Erreur updateNews:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  deleteNews: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'actualité')
      }
      
      set(state => ({
        news: state.news.filter(news => news.id !== id),
        currentNews: state.currentNews?.id === id ? null : state.currentNews,
        isLoading: false
      }))
    } catch (error) {
      console.error('Erreur deleteNews:', error)
      set({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      })
    }
  },

  setCurrentNews: (news) => set({ currentNews: news }),
  clearError: () => set({ error: null }),
}))
