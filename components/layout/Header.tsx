'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown, User } from 'lucide-react'

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('navigation')
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('activities'), href: `/${locale}/activities` },
    { name: t('news'), href: `/${locale}/news` },
    { name: t('programs'), href: `/${locale}/programs` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale)
  const isRTL = locale === 'ar'

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${currentPath}`)
    setIsLanguageOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ب</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                El BSF
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 justify-center flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-primary-600 bg-primary-50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector, Admin & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Consistent colors for all languages */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  {currentLanguage?.flag}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200`}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        locale === language.code 
                          ? 'bg-primary-50 text-primary-600 font-medium' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Button */}
            <Link
              href={`/${locale}/admin/login`}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-primary-600 transition-all duration-200"
              title="Administration"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Slides down from header */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600 shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 hover:shadow-sm'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-500 px-6 py-3">
            <p className="text-white text-sm text-center font-medium">
              Association El BSF - Mémorisation du Coran Karim
            </p>
          </div>
        </div>
      )}
    </header>
  )
} 