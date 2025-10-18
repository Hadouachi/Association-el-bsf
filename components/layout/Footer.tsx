'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer')
  const navT = useTranslations('navigation')

  const navigation = [
    { name: navT('home'), href: `/${locale}` },
    { name: navT('about'), href: `/${locale}/about` },
    { name: navT('activities'), href: `/${locale}/activities` },
    { name: navT('news'), href: `/${locale}/news` },
    { name: navT('programs'), href: `/${locale}/programs` },
    { name: navT('contact'), href: `/${locale}/contact` },
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src="/images/logo_rahma.png"
                    alt="Logo A Rahma"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
              <span className="ml-3 text-xl font-bold">A Rahma</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md mx-auto md:mx-0 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">{t('links')}</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Rue de la Mosquée, Ville</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@elbsf.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Association A Rahma. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
} 