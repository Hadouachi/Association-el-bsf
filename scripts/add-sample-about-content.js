const mysql = require('mysql2/promise')

async function addSampleAboutContent() {
  let connection
  try {
    const dbConfig = {
      host: 'localhost',
      user: 'root',
      password: 'Hadouachi20@',
      database: 'association_el_bsf'
    }

    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connexion à la base de données établie')

    // Contenu d'exemple
    const sampleContent = [
      {
        id: 'about-1',
        type: 'ANNOUNCEMENT',
        title: 'Nouvelle session de mémorisation du Coran',
        content: 'Nous sommes ravis d\'annoncer l\'ouverture d\'une nouvelle session de mémorisation du Coran pour les enfants de 8 à 12 ans. Cette session débutera le 15 janvier 2025 et se déroulera tous les samedis de 9h à 11h.',
        images: JSON.stringify([
          {
            src: '/images/about/quran-memorization.jpg',
            alt: 'Enfants en train de mémoriser le Coran',
            caption: 'Session de mémorisation en cours'
          }
        ]),
        videos: null,
        order: 1,
        isPublished: true
      },
      {
        id: 'about-2',
        type: 'WORK_PROJECT',
        title: 'Rénovation de la salle de prière',
        content: 'Nous avons terminé avec succès la rénovation complète de notre salle de prière principale. Ce projet a duré 3 mois et a été financé par les dons de notre communauté. La nouvelle salle peut accueillir jusqu\'à 200 fidèles.',
        images: JSON.stringify([
          {
            src: '/images/about/prayer-room-before.jpg',
            alt: 'Salle de prière avant rénovation',
            caption: 'État initial de la salle'
          },
          {
            src: '/images/about/prayer-room-after.jpg',
            alt: 'Salle de prière après rénovation',
            caption: 'Nouvelle salle rénovée'
          }
        ]),
        videos: null,
        order: 2,
        isPublished: true
      },
      {
        id: 'about-3',
        type: 'INFORMATION',
        title: 'Horaires des cours d\'arabe',
        content: 'Nos cours d\'arabe pour adultes et enfants sont maintenant disponibles. Les cours se déroulent en petits groupes de 5 à 8 personnes pour assurer un suivi personnalisé.',
        images: null,
        videos: null,
        order: 3,
        isPublished: true
      },
      {
        id: 'about-4',
        type: 'MILESTONE',
        title: '100ème étudiant diplômé',
        content: 'Nous célébrons aujourd\'hui un moment historique : notre 100ème étudiant a terminé avec succès le programme complet de mémorisation du Coran. Cette réussite témoigne de l\'engagement de notre équipe pédagogique et de la détermination de nos étudiants.',
        images: JSON.stringify([
          {
            src: '/images/about/graduation-ceremony.jpg',
            alt: 'Cérémonie de remise des diplômes',
            caption: 'Cérémonie de remise des diplômes 2024'
          }
        ]),
        videos: null,
        order: 4,
        isPublished: true
      },
      {
        id: 'about-5',
        type: 'PARTNERSHIP',
        title: 'Partenariat avec l\'école islamique Al-Nour',
        content: 'Nous sommes fiers d\'annoncer un nouveau partenariat avec l\'école islamique Al-Nour. Cette collaboration nous permettra d\'élargir nos programmes éducatifs et d\'offrir plus d\'opportunités à nos étudiants.',
        images: null,
        videos: null,
        order: 5,
        isPublished: true
      }
    ]

    // Insérer le contenu d'exemple
    for (const item of sampleContent) {
      try {
        const [result] = await connection.execute(
          'INSERT INTO AboutContent (id, type, title, content, images, videos, `order`, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [item.id, item.type, item.title, item.content, item.images, item.videos, item.order, item.isPublished]
        )
        console.log(`✅ Contenu ajouté: ${item.title}`)
      } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️ Le contenu existe déjà: ${item.title}`)
        } else {
          console.error(`❌ Erreur lors de l'ajout de "${item.title}":`, error.message)
        }
      }
    }

    console.log('\n🎉 Ajout du contenu d\'exemple terminé !')
    
    // Vérifier le contenu ajouté
    const [content] = await connection.execute('SELECT * FROM AboutContent ORDER BY `order`')
    console.log(`\n📊 Total du contenu dans la base: ${content.length} éléments`)
    
    content.forEach(item => {
      console.log(`- ${item.title} (${item.type}) - Ordre: ${item.order}`)
    })

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Connexion à la base de données fermée')
    }
  }
}

if (require.main === module) {
  addSampleAboutContent()
}

module.exports = addSampleAboutContent




