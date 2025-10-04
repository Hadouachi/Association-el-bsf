export type BlockType = 
  | 'TEXT' 
  | 'IMAGE_GALLERY' 
  | 'VIDEO_GALLERY' 
  | 'HEADING' 
  | 'DIVIDER' 
  | 'BUTTON' 
  | 'QUOTE' 
  | 'STATS'

export interface ImageData {
  id: string
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface VideoData {
  id: string
  src: string
  title: string
  description?: string
  thumbnail?: string
}

export interface BlockSettings {
  // Paramètres généraux
  backgroundColor?: string
  textColor?: string
  padding?: string
  margin?: string
  
  // Paramètres spécifiques aux images
  imageLayout?: 'grid' | 'carousel' | 'masonry'
  imageSize?: 'small' | 'medium' | 'large'
  autoPlay?: boolean
  showCaptions?: boolean
  
  // Paramètres spécifiques au texte
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  fontSize?: 'small' | 'medium' | 'large' | 'xl'
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

export interface ContentBlock {
  id: string
  aboutContentId: string
  type: BlockType
  title?: string
  content?: string
  images?: ImageData[]
  videos?: VideoData[]
  settings?: BlockSettings
  order_index: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateBlockData {
  aboutContentId: string
  type: BlockType
  title?: string
  content?: string
  images?: File[] | ImageData[]
  videos?: File[] | VideoData[]
  settings?: BlockSettings
  order_index?: number
}

export interface UpdateBlockData {
  type?: BlockType
  title?: string
  content?: string
  images?: File[] | ImageData[]
  videos?: File[] | VideoData[]
  settings?: BlockSettings
  order_index?: number
  isActive?: boolean
}

export interface BlockFormData {
  type: BlockType
  title: string
  content: string
  images: File[]
  videos: File[]
  settings: Partial<BlockSettings>
}
