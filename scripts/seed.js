const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  try {
    // Supprimer toutes les données existantes
    await prisma.contentBlock.deleteMany()
    await prisma.activity.deleteMany()

    // Créer des activités d'exemple
    const activity1 = await prisma.activity.create({
      data: {
        title: 'Cérémonie de remise des diplômes',
        description: 'Une cérémonie solennelle pour célébrer la réussite de nos étudiants',
        longDescription: 'Cette cérémonie marque la fin d\'un cycle d\'apprentissage et le début d\'une nouvelle étape dans la vie de nos étudiants.',
        date: '2024-06-15',
        time: '14:00',
        location: 'Salle des fêtes de la ville',
        participants: 'Étudiants, enseignants, parents',
        status: 'UPCOMING',
        coverImage: '/images/ceremonie.png',
        images: ['/images/ceremonie-1.jpg', '/images/ceremonie-2.jpg'],
        videos: [
          {
            src: '/videos/activities/video1.mp4',
            title: 'Vidéo de présentation',
            description: 'Présentation de l\'événement',
            poster: '/videos/activities/poster1.png'
          }
        ],
        contentBlocks: {
          create: [
            {
              type: 'TITLE',
              content: 'Programme de la cérémonie',
              style: 'text-3xl font-bold text-center text-blue-600 mb-6',
              images: [],
              order: 0
            },
            {
              type: 'PARAGRAPH',
              content: 'La cérémonie commencera par l\'accueil des invités et l\'hymne national. Suivra ensuite la remise des diplômes avec un discours du directeur.',
              style: 'text-lg text-gray-700 leading-relaxed mb-4',
              images: [],
              order: 1
            },
            {
              type: 'IMAGE_GALLERY',
              content: 'Galerie photos de l\'événement',
              style: 'grid grid-cols-2 gap-4 my-6',
              images: ['/images/ceremonie-1.jpg', '/images/ceremonie-2.jpg'],
              order: 2
            }
          ]
        }
      }
    })

    const activity2 = await prisma.activity.create({
      data: {
        title: 'Atelier de mémorisation',
        description: 'Apprenez des techniques efficaces pour améliorer votre mémoire',
        longDescription: 'Cet atelier vous permettra de découvrir des méthodes scientifiques pour améliorer votre capacité de mémorisation.',
        date: '2024-07-20',
        time: '10:00',
        location: 'Salle de formation',
        participants: 'Étudiants, adultes',
        status: 'UPCOMING',
        coverImage: '/images/memorization-icon.png',
        images: ['/images/activity-cover1.jpg'],
        videos: [],
        contentBlocks: {
          create: [
            {
              type: 'TITLE',
              content: 'Techniques de mémorisation',
              style: 'text-2xl font-semibold text-green-600 mb-4',
              images: [],
              order: 0
            },
            {
              type: 'PARAGRAPH',
              content: 'Nous explorerons ensemble les méthodes de la mémoire visuelle, de l\'association d\'idées et de la répétition espacée.',
              style: 'text-base text-gray-600 mb-3',
              images: [],
              order: 1
            }
          ]
        }
      }
    })

    const activity3 = await prisma.activity.create({
      data: {
        title: 'Programme jeunesse',
        description: 'Activités éducatives et récréatives pour les jeunes',
        longDescription: 'Un programme complet d\'activités conçu spécialement pour stimuler la créativité et l\'apprentissage des jeunes.',
        date: '2024-08-10',
        time: '09:00',
        location: 'Centre de jeunesse',
        participants: 'Jeunes de 12 à 18 ans',
        status: 'UPCOMING',
        coverImage: '/images/jeunesse.png',
        images: ['/images/activity-cover2.jpg', '/images/activity-cover3.jpg'],
        videos: [
          {
            src: '/videos/activities/video2.mp4',
            title: 'Vidéo du programme',
            description: 'Présentation des activités',
            poster: '/videos/activities/poster2.png'
          }
        ],
        contentBlocks: {
          create: [
            {
              type: 'TITLE',
              content: 'Activités proposées',
              style: 'text-2xl font-bold text-purple-600 mb-5',
              images: [],
              order: 0
            },
            {
              type: 'PARAGRAPH',
              content: 'Le programme inclut des ateliers d\'art, des jeux éducatifs, des sessions de sport et des moments de partage.',
              style: 'text-lg text-gray-700 mb-4',
              images: [],
              order: 1
            },
            {
              type: 'IMAGE_GALLERY',
              content: 'Photos des activités',
              style: 'grid grid-cols-3 gap-3 my-6',
              images: ['/images/activity-cover2.jpg', '/images/activity-cover3.jpg'],
              order: 2
            }
          ]
        }
      }
    })

    console.log('✅ Database seeded successfully!')
    console.log(`Created ${await prisma.activity.count()} activities`)
    console.log(`Created ${await prisma.contentBlock.count()} content blocks`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

