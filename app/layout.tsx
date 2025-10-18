import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Association A Rahma - Mémorisation du Coran Karim',
  description: 'Association dédiée à la mémorisation du Coran Karim pour les jeunes et la communauté musulmane.',
  keywords: 'Coran, mémorisation, association, islam, jeunes, éducation',
  authors: [{ name: 'Association A Rahma' }],
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
} 