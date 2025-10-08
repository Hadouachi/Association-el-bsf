'use client'

import { useTranslations } from 'next-intl'
import { BookOpen, Users, Heart, ArrowRight, Calendar, MapPin, Newspaper, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import FeatureIcon from '@/app/components/FeatureIcon'
import UploadedImage from '@/components/ui/UploadedImage'
import NewsCard from '@/components/NewsCard'

interface HomePageProps {
  params: { locale: string }
}

interface Activity {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  status: string
  coverImage: string
}

interface News {
  id: string
  title: string
  excerpt: string
  author: string
  category: string
  image: string
  publishedAt: string
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations('home')
  const [activities, setActivities] = useState<Activity[]>([])
  const [news, setNews] = useState<News[]>([])
  const [activitiesLoading, setActivitiesLoading] = useState(true)
  const [newsLoading, setNewsLoading] = useState(true)

  // Charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les activités
        const activitiesResponse = await fetch('/api/activities')
        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json()
          setActivities(activitiesData)
        }
        setActivitiesLoading(false)

        // Charger les actualités
        const newsResponse = await fetch('/api/news')
        if (newsResponse.ok) {
          const newsData = await newsResponse.json()
          setNews(newsData)
        }
        setNewsLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        setActivitiesLoading(false)
        setNewsLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    {
      icon: '/images/memorization-icon.png',
      title: t('features.memorization.title'),
      description: t('features.memorization.description'),
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: '/images/education-icon.png',
      title: t('features.education.title'),
      description: t('features.education.description'),
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: '/images/youth-icon.png',
      title: t('features.youth.title'),
      description: t('features.youth.description'),
      color: 'from-islamic-green to-green-600'
    }
  ]

  // Prendre les 4 activités les plus récentes ou à venir
  const recentActivities = activities
    .sort((a, b) => {
      // Priorité aux activités à venir, puis par date de création
      const now = new Date()
      const activityDate = new Date(a.date)
      const isUpcoming = activityDate > now
      const isUpcomingB = new Date(b.date) > now
      
      if (isUpcoming && !isUpcomingB) return -1
      if (!isUpcoming && isUpcomingB) return 1
      
      // Si les deux sont à venir ou passées, trier par date
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 4)

  // Prendre les 3 actualités les plus récentes publiées
  const recentNews = news
    .filter(article => article.status === 'published')
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0)
      const dateB = new Date(b.publishedAt || b.createdAt || 0)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 3)

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Fonction pour obtenir la couleur de catégorie
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programme': 'bg-blue-100 text-blue-800',
      'Événement': 'bg-green-100 text-green-800',
      'Formation': 'bg-purple-100 text-purple-800',
      'Partenariat': 'bg-orange-100 text-orange-800',
      'Communiqué': 'bg-red-100 text-red-800',
      'Annonce': 'bg-yellow-100 text-yellow-800',
      'Général': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['Général']
  }

  return (
    <div className="min-h-screen home-page">
      {/* Hero Section avec Image de Bannière */}
      <section className="hero-banner">
        {/* Image de fond responsive */}
        <div className="hero-banner-image">
          {/* Version Desktop */}
          <Image
            src="/images/bannier-ordi.png"
            alt="Association El BSF - Mémorisation du Coran"
            fill
            priority
            className="object-cover object-center hidden md:block"
            sizes="100vw"
            quality={90}
          />
          {/* Version Mobile */}
          <Image
            src="/images/bannier-mobile.png"
            alt="Association El BSF - Mémorisation du Coran"
            fill
            priority
            className="object-cover object-center block md:hidden"
            sizes="100vw"
            quality={90}
          />
          {/* Overlay gradient avec opacité réduite */}
          <div className="hero-banner-overlay-light"></div>
        </div>

        {/* Contenu centré */}
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="hero-buttons">
                <Link
                  href={`/${locale}/programs`}
                  className="hero-button hero-button-primary"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="hero-button hero-button-secondary"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs */}
        <div className="hero-decorative">
          <div className="hero-decorative-circle"></div>
          <div className="hero-decorative-circle"></div>
          <div className="hero-decorative-circle"></div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-indicator-container">
            <div className="scroll-indicator-dot"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Notre association s'engage à promouvoir l'éducation islamique et la mémorisation du Coran
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
              >
                <div className="feature-icon-container">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={128}
                    height={128}
                    className="feature-icon"
                  />
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
              Activités Récentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Découvrez nos dernières activités et événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="activity-card"
              >
                <div className="h-40 relative overflow-hidden">
                  {/* Test direct avec Image Next.js */}
                  {activity.coverImage ? (
                    <Image
                      src={activity.coverImage}
                      alt={activity.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        console.error('Erreur image:', activity.coverImage)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <div className="text-primary-600 text-4xl">📅</div>
                    </div>
                  )}
                  {/* Badge de statut */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      new Date(activity.date) > new Date() 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {new Date(activity.date) > new Date() ? 'À venir' : 'Passée'}
                    </span>
                  </div>
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-4xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                      👁️
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {activity.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{new Date(activity.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                  <div className="text-center">
                    <Link
                      href={`/${locale}/activities/${activity.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center text-sm"
                    >
                      Voir plus
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune activité pour le moment</h3>
                <p className="text-gray-500">Revenez bientôt pour découvrir nos prochaines activités !</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/activities`}
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Voir toutes les activités
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="text-gray-600 mt-3 text-sm">
              {activities.length > 4 ? `${activities.length - 4} autres activités disponibles` : 'Toutes nos activités'}
            </p>
          </div>
        </div>
      </section>

      {/* Recent News Section */}
      {recentNews.length > 0 && (
        <section className="section-spacing home-news-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 news-section-header">
              <div className="flex items-center justify-center mb-4">
                <Newspaper className="w-8 h-8 text-primary-600 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                  Dernières actualités
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Restez informé de nos dernières nouvelles et annonces
              </p>
            </div>

            {newsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : recentNews.length > 0 ? (
              <div className="news-carousel-container">
                <div className="news-carousel">
                  {recentNews.map((article) => (
                    <NewsCard
                      key={`original-${article.id}`}
                      article={article}
                      locale={locale}
                      formatDate={formatDate}
                      getCategoryColor={getCategoryColor}
                    />
                  ))}
                  
                  {/* Duplicate for seamless loop */}
                  {recentNews.map((article) => (
                    <NewsCard
                      key={`duplicate-${article.id}`}
                      article={article}
                      locale={locale}
                      formatDate={formatDate}
                      getCategoryColor={getCategoryColor}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucune actualité disponible pour le moment.</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href={`/${locale}/news`}
                className="btn-primary"
              >
                Voir toutes les actualités
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-spacing community-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto community-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Rejoignez notre communauté
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Participez à nos programmes de mémorisation et d'éducation islamique
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/programs`}
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Nos programmes
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-primary border-2 border-white bg-transparent hover:bg-white hover:text-primary-600"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 