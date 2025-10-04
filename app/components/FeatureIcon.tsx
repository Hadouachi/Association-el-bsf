'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FeatureIconProps {
  src: string
  alt: string
  width: number
  height: number
  className: string
}

export default function FeatureIcon({ src, alt, width, height, className }: FeatureIconProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="text-white text-4xl font-bold">
        📖
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
    />
  )
} 