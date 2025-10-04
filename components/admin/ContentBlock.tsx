'use client'

import { useState } from 'react'
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Type, 
  Image as ImageIcon, 
  Video,
  Plus, 
  X, 
  MoveUp, 
  MoveDown,
  Trash2,
  Palette
} from 'lucide-react'
import ContentBlockImageUpload from './ContentBlockImageUpload'
import ContentBlockVideoUpload from './ContentBlockVideoUpload'

import { ContentBlockForm } from '@/types/admin'

export interface ContentBlock extends ContentBlockForm {
  // Hérite de ContentBlockForm
}

interface ContentBlockProps {
  block: ContentBlock
  onUpdate: (block: ContentBlock) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  isFirst: boolean
  isLast: boolean
}

const titleStyles = [
  { value: 'h1', label: 'Titre principal', icon: Heading1, className: 'text-4xl font-bold text-gray-900' },
  { value: 'h2', label: 'Titre secondaire', icon: Heading2, className: 'text-2xl font-semibold text-gray-800' },
  { value: 'h3', label: 'Sous-titre', icon: Heading3, className: 'text-xl font-medium text-gray-700' },
  { value: 'h4', label: 'Titre petit', icon: Type, className: 'text-lg font-medium text-gray-600' }
]

const paragraphStyles = [
  { value: 'normal', label: 'Normal', className: 'text-base text-gray-700 leading-relaxed' },
  { value: 'large', label: 'Grand', className: 'text-lg text-gray-700 leading-relaxed' },
  { value: 'small', label: 'Petit', className: 'text-sm text-gray-600 leading-relaxed' },
  { value: 'citation', label: 'Citation', className: 'text-lg text-gray-600 italic border-l-4 border-primary-500 pl-4' },
  { value: 'highlight', label: 'Mise en évidence', className: 'text-base text-gray-800 bg-yellow-100 p-3 rounded-lg' }
]

export default function ContentBlock({
  block,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: ContentBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleContentChange = (content: string) => {
    onUpdate({ ...block, content })
  }

  const handleStyleChange = (style: string) => {
    onUpdate({ ...block, style })
  }

  const handleImagesChange = (images: string[]) => {
    onUpdate({ ...block, images })
  }

  const handleVideosChange = (videos: Array<{src: string, title: string, description: string, poster: string}>) => {
    onUpdate({ ...block, videos })
  }

  const getBlockIcon = () => {
    switch (block.type) {
      case 'title':
        return Heading1
      case 'paragraph':
        return Type
      case 'image-gallery':
        return ImageIcon
      case 'video':
        return Video
      default:
        return Type
    }
  }

  const getBlockTitle = () => {
    switch (block.type) {
      case 'title':
        return 'Titre'
      case 'paragraph':
        return 'Paragraphe'
      case 'image-gallery':
        return 'Galerie d\'images'
      case 'video':
        return 'Vidéo'
      default:
        return 'Bloc'
    }
  }

  const renderContentEditor = () => {
    switch (block.type) {
      case 'title':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style du titre
              </label>
              <div className="grid grid-cols-2 gap-2">
                {titleStyles.map((style) => {
                  const Icon = style.icon
                  return (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => handleStyleChange(style.value)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        block.style === style.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{style.label}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte du titre
              </label>
              <textarea
                value={block.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Entrez votre titre..."
              />
            </div>
          </div>
        )

      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style du paragraphe
              </label>
              <div className="grid grid-cols-2 gap-2">
                {paragraphStyles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => handleStyleChange(style.value)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      block.style === style.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Type className="w-4 h-4" />
                      <span className="text-sm font-medium">{style.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu du paragraphe
              </label>
              <textarea
                value={block.content}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Entrez votre paragraphe..."
              />
            </div>
          </div>
        )

      case 'image-gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images de la galerie
              </label>
              <ContentBlockImageUpload
                images={block.images?.map(img => typeof img === 'string' ? img : '') || []}
                onImagesChange={(urls) => {
                  // Les URLs sont déjà des strings, on les garde telles quelles
                  handleImagesChange(urls as any)
                }}
                label="Images de la galerie"
              />
            </div>
            {block.images && block.images.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aperçu des images
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {block.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = block.images?.filter((_, i) => i !== index) || []
                          handleImagesChange(newImages)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la section vidéo
              </label>
              <input
                type="text"
                value={block.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Ex: Vidéos de l'activité"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <ContentBlockVideoUpload
              videos={block.videos || []}
              onVideosChange={handleVideosChange}
              label="Vidéos de la section"
            />
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Section Vidéo</h4>
            {block.videos && block.videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {block.videos.map((video, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                      <Video className="w-8 h-8 text-gray-400" />
                    </div>
                    <h5 className="font-medium text-gray-900 mb-1">{video.title}</h5>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Aucune vidéo ajoutée</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const renderPreview = () => {
    switch (block.type) {
      case 'title':
        const titleStyle = titleStyles.find(s => s.value === block.style) || titleStyles[0]
        const TitleTag = titleStyle.value as keyof JSX.IntrinsicElements
        return (
          <TitleTag className={titleStyle.className}>
            {block.content || 'Votre titre ici...'}
          </TitleTag>
        )

      case 'paragraph':
        const paragraphStyle = paragraphStyles.find(s => s.value === block.style) || paragraphStyles[0]
        return (
          <p className={paragraphStyle.className}>
            {block.content || 'Votre paragraphe ici...'}
          </p>
        )

      case 'image-gallery':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Galerie d'images</h4>
            {block.images && block.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {block.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-medium">
                        Image {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Aucune image sélectionnée</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const Icon = getBlockIcon()

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Header du bloc */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{getBlockTitle()}</h3>
            <p className="text-sm text-gray-500">Ordre: {block.order + 1}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Boutons de déplacement */}
          <button
            type="button"
            onClick={() => onMoveUp(block.id)}
            disabled={isFirst}
            className={`p-2 rounded-lg transition-colors ${
              isFirst 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <MoveUp className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => onMoveDown(block.id)}
            disabled={isLast}
            className={`p-2 rounded-lg transition-colors ${
              isLast 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <MoveDown className="w-4 h-4" />
          </button>

          {/* Bouton d'expansion */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Bouton de suppression */}
          <button
            type="button"
            onClick={() => onDelete(block.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenu du bloc */}
      <div className="p-4">
        {/* Aperçu */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Aperçu</h4>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {renderPreview()}
          </div>
        </div>

        {/* Éditeur (expandable) */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Édition</h4>
            {renderContentEditor()}
          </div>
        )}
      </div>
    </div>
  )
}
