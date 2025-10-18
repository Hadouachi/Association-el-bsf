'use client'

import { useEffect } from 'react'
import { useAboutStore } from '@/lib/aboutStore'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface AboutPageProps {
  params: { locale: string }
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations('about')
  const { aboutContent, fetchAboutContent, isLoading, error } = useAboutStore()

  useEffect(() => {
    fetchAboutContent()
  }, [fetchAboutContent])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error || !aboutContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page À propos</h1>
          <p className="text-gray-600">
            {error || 'Aucun contenu disponible pour le moment.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-20 min-h-[500px] flex items-center">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero-bg.jpg"
            alt="À propos de l'Association El BSF"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay sombre pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Contenu */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {aboutContent.title}
            </h1>
            {aboutContent.subtitle && (
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {aboutContent.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {aboutContent.coverImage && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={aboutContent.coverImage}
                alt={aboutContent.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Description Section */}
      {aboutContent.description && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed text-justify">
                {aboutContent.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Blocks Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Notre Association
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos valeurs, notre mission et notre engagement envers la communauté
            </p>
          </div>
          
          {/* Placeholder for future content blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Éducation</h3>
              <p className="text-gray-600">
                Nous nous engageons à offrir une éducation islamique de qualité pour tous les âges.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
              <p className="text-gray-600">
                Nous construisons une communauté solidaire basée sur les valeurs islamiques.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans tous nos programmes et activités.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}