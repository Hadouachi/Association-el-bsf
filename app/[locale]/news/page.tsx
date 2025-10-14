'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Calendar, User, ArrowRight, Clock, Image as ImageIcon } from 'lucide-react'
import { useNewsStore, News } from '@/lib/newsStore'
import Link from 'next/link'
import UploadedImage from '@/components/ui/UploadedImage'

interface NewsPageProps {
  params: { locale: string }
}

export default function NewsPage({ params: { locale } }: NewsPageProps) {
  const t = useTranslations('news')
  const { news, isLoading, error, fetchNews } = useNewsStore()
  const [featuredNews, setFeaturedNews] = useState<News | null>(null)

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  useEffect(() => {
    if (news.length > 0) {
      setFeaturedNews(news[0])
    }
  }, [news])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programme': 'bg-blue-100 text-blue-800',
      'Événement': 'bg-green-100 text-green-800',
      'Formation': 'bg-purple-100 text-purple-800',
      'Partenariat': 'bg-orange-100 text-orange-800',
      'Général': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['Général']
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des actualités...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur: {error}</p>
          <button 
            onClick={() => fetchNews()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Actualités
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Restez informés de nos dernières nouvelles et événements
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune actualité</h3>
              <p className="text-gray-600">Aucune actualité n'est disponible pour le moment.</p>
            </div>
          ) : (
            <>
              {/* Featured News */}
              {featuredNews && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Article à la une
                  </h2>
                  <div className="news-card">
                    <div className="md:flex">
                      <div className="md:w-1/2 featured-news-image-container relative">
                        <UploadedImage
                          src={featuredNews.image}
                          alt={featuredNews.title}
                          fill
                          className="featured-news-image"
                        />
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredNews.category)}`}>
                            {featuredNews.category}
                          </span>
                          <span className="ml-4 text-gray-500 text-sm">
                            {featuredNews.publishedAt ? formatDate(featuredNews.publishedAt) : 'Non publié'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {featuredNews.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {featuredNews.excerpt || featuredNews.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-500">
                            <User className="w-4 h-4 mr-2" />
                            <span>{featuredNews.author}</span>
                          </div>
                          <Link 
                            href={`/fr/news/${featuredNews.id}`}
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Lire la suite
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.slice(1).map((article) => (
                  <Link key={article.id} href={`/fr/news/${article.id}`}>
                    <div className="news-card">
                      {/* Article Image */}
                      <div className="news-image-container relative">
                        <UploadedImage
                          src={article.image}
                          alt={article.title}
                          fill
                          className="news-image"
                        />
                      </div>

                      {/* Article Content */}
                      <div className="news-card-content">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {article.publishedAt ? formatDate(article.publishedAt) : 'Non publié'}
                          </span>
                        </div>

                        <h3 className="news-card-title">
                          {article.title}
                        </h3>

                        <p className="news-card-excerpt">
                          {article.excerpt}
                        </p>

                        <div className="news-card-meta">
                          <div className="flex items-center text-gray-500 text-sm">
                            <User className="w-4 h-4 mr-1" />
                            <span>{article.author}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
} 