'use client'

import { useEffect } from 'react'
import { useAboutStore } from '@/lib/aboutStore'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import ScrollAnimation, { StaggeredAnimation, StaggeredItem } from '@/components/animations/ScrollAnimation'

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
      <section className="relative text-white py-20 min-h-[500px] flex items-center overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero-bg.jpg"
            alt="À propos de l'Association A Rahma"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Overlay sombre pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Contenu */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center max-w-4xl mx-auto w-full" direction="fade" delay={0.3}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-2">
              {aboutContent.title}
            </h1>
            {aboutContent.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 px-2">
                {aboutContent.subtitle}
              </p>
            )}
          </ScrollAnimation>
        </div>
      </section>

      {/* Section Mosquée LED */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggeredAnimation className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center" staggerDelay={0.3}>
            {/* Image */}
            <StaggeredItem className="order-2 lg:order-1" direction="left" distance={60}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                <Image
                  src="/images/about/mosque_led.jpg"
                  alt="Mosquée Akhachab Amghar avec éclairage LED spectaculaire"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </StaggeredItem>

            {/* Texte */}
            <StaggeredItem className="order-1 lg:order-2" direction="right" distance={60}>
              <div className="max-w-lg mx-auto lg:mx-0 px-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Découvrir la mosquée Akhachab Amghar
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  Grâce à un éclairage LED spectaculaire, notre mosquée brille de mille feux,
                  créant une atmosphère spirituelle et moderne qui inspire la sérénité et la contemplation.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🕌</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">Architecture moderne</h3>
                    <p className="text-sm text-gray-600">Alliance entre tradition et innovation</p>
                  </div>
                </div>
              </div>
            </StaggeredItem>
          </StaggeredAnimation>
        </div>
      </section>

      {/* Description Section */}
      {aboutContent.description && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation className="prose prose-lg max-w-none w-full" direction="fade" delay={0.4}>
              <div className="text-gray-700 leading-relaxed text-justify px-2">
                {aboutContent.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 break-words">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </section>
      )}

      {/* Content Blocks Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center mb-12 px-2" direction="fade" delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Notre Association
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos valeurs, notre mission et notre engagement envers la communauté
            </p>
          </ScrollAnimation>
          
          {/* Placeholder for future content blocks */}
          <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.2}>
            <StaggeredItem direction="up" distance={40}>
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center w-full">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Éducation</h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">
                  Nous nous engageons à offrir une éducation islamique de qualité pour tous les âges.
                </p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem direction="up" distance={40}>
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center w-full">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">
                  Nous construisons une communauté solidaire basée sur les valeurs islamiques.
                </p>
              </div>
            </StaggeredItem>
            
            <StaggeredItem direction="up" distance={40}>
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center w-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm sm:text-base text-gray-600 break-words">
                  Nous visons l'excellence dans tous nos programmes et activités.
                </p>
              </div>
            </StaggeredItem>
          </StaggeredAnimation>
        </div>
      </section>
    </div>
  )
}