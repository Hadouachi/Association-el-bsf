'use client'

import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'
import { News } from '@/lib/newsStore'

interface NewsCardProps {
  article: News
  locale: string
  formatDate: (dateString: string) => string
  getCategoryColor: (category: string) => string
  className?: string
}

export default function NewsCard({ 
  article, 
  locale, 
  formatDate, 
  getCategoryColor, 
  className = '' 
}: NewsCardProps) {
  return (
    <div className={`news-carousel-item ${className}`}>
      <Link href={`/${locale}/news/${article.id}`}>
        <div className="news-card">
          {/* Article Image */}
          <div className="news-image-container h-48">
            {article.image ? (
              <img 
                src={article.image} 
                alt={article.title}
                className="news-image"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                <div className="text-white text-6xl">📰</div>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="news-card-content p-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`category-badge category-${article.category.toLowerCase()}`}>
                {article.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {article.publishedAt ? formatDate(article.publishedAt) : 'Récent'}
                </span>
              </div>
            </div>

            <h3 className="news-card-title text-lg mb-3">
              {article.title}
            </h3>

            <div className="news-card-meta">
              <div className="flex items-center text-gray-500 text-sm">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center text-primary-600 text-sm font-medium">
                Lire la suite
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
