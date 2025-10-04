'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNewsStore } from '@/lib/newsStore'
import { ArrowLeft, Save, Eye, Upload, X, Calendar, User, Tag, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import RichTextEditor from '@/components/admin/RichTextEditor'
import AdminNav from '@/components/admin/AdminNav'

export default function AddNewsPage() {
  const router = useRouter()
  const { addNews } = useNewsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Général',
    image: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    publishedAt: ''
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const categories = [
    'Général',
    'Programme',
    'Événement',
    'Formation',
    'Partenariat',
    'Communiqué',
    'Annonce'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (file: File) => {
    console.log('📤 Upload de l\'image:', file.name)
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData })
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Upload image réussi:', data.url)
        setFormData(prev => ({ ...prev, image: data.url }))
        setImagePreview(data.url)
      } else {
        console.error('❌ Erreur upload image:', response.status, response.statusText)
        alert('Erreur lors de l\'upload de l\'image')
      }
    } catch (error) {
      console.error('❌ Erreur upload image:', error)
      alert('Erreur lors de l\'upload de l\'image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log('📝 Création de l\'actualité avec les données:', formData)
      
      const newsData = {
        ...formData,
        publishedAt: formData.status === 'published' ? new Date().toISOString() : null
      }

      await addNews(newsData)
      console.log('✅ Actualité créée avec succès')
      
      // Redirection vers la liste des actualités
      router.push('/fr/admin/news')
    } catch (error) {
      console.error('❌ Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'actualité')
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <AdminNav locale="fr" currentPage="news" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/fr/admin/news"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Nouvel article</h1>
                <p className="text-gray-600 mt-2">Créez un nouvel article d'actualité</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={togglePreview}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Éditer' : 'Aperçu'}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Titre */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Entrez le titre de l'article..."
                  required
                />
              </div>

              {/* Résumé */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Résumé
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Résumé court de l'article (optionnel)..."
                />
              </div>

              {/* Contenu */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu de l'article *
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Rédigez le contenu de votre article..."
                  rows={12}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Utilisez la barre d'outils pour formater votre texte ou les raccourcis Markdown.
                </p>
              </div>

              {/* Aperçu du contenu */}
              {previewMode && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu</h3>
                  <div className="prose max-w-none">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{formData.title}</h1>
                    {formData.excerpt && (
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-700 font-medium">{formData.excerpt}</p>
                      </div>
                    )}
                    <div className="text-gray-700 whitespace-pre-line">
                      {formData.content}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de l'article
                </label>
                
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Aperçu"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData(prev => ({ ...prev, image: '' }))
                      }}
                      className="w-full flex items-center justify-center px-3 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Supprimer l'image
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0])
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">Cliquez pour uploader une image</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Métadonnées */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Métadonnées</h3>
                
                <div className="space-y-4">
                  {/* Auteur */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Auteur *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Nom de l'auteur..."
                      required
                    />
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Statut */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>

                  {/* Date de publication */}
                  {formData.status === 'published' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de publication
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.publishedAt}
                        onChange={(e) => handleInputChange('publishedAt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Création...' : 'Créer l\'article'}
                  </button>
                  
                  <Link
                    href="/fr/admin/news"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
