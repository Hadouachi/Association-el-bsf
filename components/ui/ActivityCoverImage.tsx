'use client'

import { useState } from 'react'

interface ActivityCoverImageProps {
  activityId: string
  coverImage?: string | null
  title: string
  className?: string
  showDefaultIndicator?: boolean
}

export default function ActivityCoverImage({
  activityId,
  coverImage,
  title,
  className = '',
  showDefaultIndicator = true
}: ActivityCoverImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Générer une image par défaut basée sur l'ID de l'activité
  const getDefaultImage = (id: string) => {
    const numId = parseInt(id)
    if (isNaN(numId)) return '/images/activity-cover1.jpg'
    return `/images/activity-cover${(numId % 3) + 1}.jpg`
  }
  
  // Utiliser l'image de couverture si elle existe, sinon l'image par défaut
  const imageSrc = coverImage || getDefaultImage(activityId)
  const isDefaultImage = !coverImage
  
  // Si l'image de couverture a échoué, utiliser l'image par défaut
  const finalImageSrc = imageError ? getDefaultImage(activityId) : imageSrc
  
  // Debug: afficher les URLs dans la console
  console.log(`ActivityCoverImage [${activityId}]:`, {
    title,
    coverImage,
    imageSrc,
    finalImageSrc,
    isDefaultImage
  })
  
  const handleImageError = () => {
    console.error(`Erreur de chargement pour l'activité ${activityId}:`, finalImageSrc)
    setImageError(true)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }
  
  return (
    <div className={`relative ${className}`}>
      <img
        src={finalImageSrc}
        alt={title}
        className="w-full h-full object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {/* Indicateur d'image par défaut */}
      {showDefaultIndicator && isDefaultImage && (
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full shadow-sm">
            Image par défaut
          </span>
        </div>
      )}
      
      {/* Indicateur d'erreur de chargement */}
      {imageError && (
        <div className="absolute bottom-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
            Erreur image
          </span>
        </div>
      )}
    </div>
  )
}
