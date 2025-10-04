import { useTranslations } from 'next-intl'
import { BookOpen, Users, Clock, Star, ArrowRight } from 'lucide-react'

interface ProgramsPageProps {
  params: { locale: string }
}

export default function ProgramsPage({ params: { locale } }: ProgramsPageProps) {
  const t = useTranslations('programs')

  const programs = [
    {
      id: 1,
      title: t('memorization'),
      subtitle: 'Programme complet de mémorisation',
      description: 'Un programme structuré pour mémoriser le Coran complet avec des méthodes éprouvées et un suivi personnalisé.',
      duration: '2-3 ans',
      level: 'Tous niveaux',
      students: 45,
      features: [
        'Mémorisation progressive',
        'Révélation régulière',
        'Suivi personnalisé',
        'Certification finale'
      ],
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 2,
      title: t('tajweed'),
      subtitle: 'Maîtrise des règles de récitation',
      description: 'Apprenez les règles de Tajweed pour une récitation parfaite du Coran avec des professeurs qualifiés.',
      duration: '6 mois',
      level: 'Débutant à avancé',
      students: 30,
      features: [
        'Règles de prononciation',
        'Pratique intensive',
        'Évaluation continue',
        'Certificat de compétence'
      ],
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      id: 3,
      title: t('tarbiyah'),
      subtitle: 'Éducation spirituelle et morale',
      description: 'Programme d\'éducation islamique pour développer la spiritualité et les bonnes mœurs.',
      duration: '1 an',
      level: 'Tous âges',
      students: 60,
      features: [
        'Sciences islamiques',
        'Éthique et morale',
        'Histoire islamique',
        'Développement personnel'
      ],
      color: 'from-islamic-green to-green-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Découvrez nos programmes d'enseignement spécialisés
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Program Header */}
                <div className={`h-48 bg-gradient-to-r ${program.color} flex items-center justify-center`}>
                  <div className="text-white text-6xl">📖</div>
                </div>

                {/* Program Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {program.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Program Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Durée : {program.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Niveau : {program.level}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="w-4 h-4 mr-2" />
                      <span>{program.students} étudiants inscrits</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Ce programme inclut :</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center justify-center">
                    S'inscrire au programme
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi choisir nos programmes ?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Méthodes éprouvées</h3>
                  <p className="text-gray-600">Nos méthodes d'enseignement sont basées sur des traditions séculaires et des techniques modernes.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Professeurs qualifiés</h3>
                  <p className="text-gray-600">Nos enseignants sont certifiés et expérimentés dans l'enseignement du Coran.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-islamic-green to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi personnalisé</h3>
                  <p className="text-gray-600">Chaque étudiant bénéficie d'un suivi personnalisé pour optimiser son apprentissage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 