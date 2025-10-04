// Types communs pour toute l'application
export interface ContentBlock {
  id: string
  type: 'title' | 'paragraph' | 'image-gallery' | 'video'
  content: string
  style?: string
  images?: string[]
  videos?: Array<{
    src: string
    title: string
    description: string
    poster: string
    width?: number
    height?: number
  }>
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
  contentBlocks: ContentBlock[]
  createdAt: string
  updatedAt: string
}
