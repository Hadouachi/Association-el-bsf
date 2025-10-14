'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, User, ArrowLeft, Clock, Image as ImageIcon } from 'lucide-react'
import { useNewsStore, News } from '@/lib/newsStore'
import Link from 'next/link'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import UploadedImage from '@/components/ui/UploadedImage'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { currentNews, isLoading, error, fetchNewsById } = useNewsStore()
  const [news, setNews] = useState<News | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchNewsById(params.id as string)
    }
  }, [params.id, fetchNewsById])

  useEffect(() => {
    if (currentNews) {
      setNews(currentNews)
    }
  }, [currentNews])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link 
            href="/fr/news"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/fr/news"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Image */}
          {news.image && (
            <div className="news-image-container relative">
              <UploadedImage
                src={news.image}
                alt={news.title}
                fill
                className="news-image"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                {news.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {news.publishedAt ? formatDate(news.publishedAt) : 'Non publié'}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-8">
              <User className="w-5 h-5 mr-2" />
              <span className="font-medium">{news.author}</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {news.excerpt && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>
              )}
              
              <MarkdownRenderer content={news.content} />
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link 
            href="/fr/news"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    </div>
  )
}
