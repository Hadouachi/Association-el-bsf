'use client'

import { useState } from 'react'
import Image from 'next/image'

interface UploadedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  onError?: () => void
}

export default function UploadedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  sizes,
  priority = false,
  onError
}: UploadedImageProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Image par défaut si erreur ou pas d'image
  const defaultImage = '/images/activity-cover1.jpg'
  
  // Nettoyer l'URL de l'image et vérifier qu'elle est valide
  const cleanSrc = src && src.trim() !== '' && src !== 'undefined' && src !== 'null' ? src : defaultImage

  // Vérifier si l'URL est valide (pour les URLs relatives et absolues)
  const isValidUrl = (url: string) => {
    // URLs relatives commençant par / sont valides
    if (url.startsWith('/')) return true
    
    // URLs absolues
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const finalSrc = isValidUrl(cleanSrc) ? cleanSrc : defaultImage

  const handleError = () => {
    console.error('Erreur de chargement image:', finalSrc)
    setError(true)
    setIsLoading(false)
    onError?.() // Appeler le callback d'erreur si fourni
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center ${className}`}>
        <div className="text-primary-600 text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image non disponible</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className="object-cover object-center"
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        unoptimized={finalSrc.startsWith('/images/')} // Désactiver l'optimisation pour les images locales
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  )
} 