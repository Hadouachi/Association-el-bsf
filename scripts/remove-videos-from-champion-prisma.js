const { PrismaClient } = require('@prisma/client')

async function removeVideosFromChampionActivity() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔌 Connexion à la base de données via Prisma...')
    await prisma.$connect()
    console.log('✅ Connexion réussie !')
    
    // Trouver l'activité "Champion Akhachab Amghar"
    console.log('\n🔍 Recherche de l\'activité "Champion Akhachab Amghar"...')
    const targetActivity = await prisma.activity.findFirst({
      where: {
        title: {
          contains: 'Champion Akhachab Amghar'
        }
      },
      select: {
        id: true,
        title: true,
        contentBlocks: true
      }
    })
    
    if (!targetActivity) {
      console.log('❌ Aucune activité trouvée avec ce titre')
      return
    }
    
    console.log(`📊 Activité trouvée:`)
    console.log(`   - ID: ${targetActivity.id}`)
    console.log(`   - Titre: ${targetActivity.title}`)
    console.log(`   - Blocs de contenu: ${targetActivity.contentBlocks ? 'Présents' : 'Aucun'}`)
    
    // Vérifier le contenu des blocs
    if (targetActivity.contentBlocks) {
      try {
        const contentBlocks = JSON.parse(targetActivity.contentBlocks)
        console.log('\n🔍 Analyse des blocs de contenu:')
        
        let hasVideos = false
        contentBlocks.forEach((block, index) => {
          console.log(`   Bloc ${index + 1}:`)
          console.log(`     - Type: ${block.type}`)
          console.log(`     - Contenu: ${block.content}`)
          if (block.videos && block.videos.length > 0) {
            console.log(`     - Vidéos: ${block.videos.length} vidéo(s)`)
            hasVideos = true
          } else {
            console.log(`     - Vidéos: Aucune`)
          }
        })
        
        if (!hasVideos) {
          console.log('\n✅ Aucune vidéo trouvée dans les blocs de contenu')
          return
        }
        
        // Supprimer les vidéos de tous les blocs
        console.log('\n🔄 Suppression des vidéos des blocs de contenu...')
        const cleanedBlocks = contentBlocks.map(block => {
          const { videos, ...cleanBlock } = block
          return cleanBlock
        })
        
        // Mettre à jour l'activité
        const updatedActivity = await prisma.activity.update({
          where: { id: targetActivity.id },
          data: { contentBlocks: JSON.stringify(cleanedBlocks) }
        })
        
        console.log('✅ Activité mise à jour avec succès !')
        
        // Vérifier le résultat
        console.log('\n🔍 Vérification du résultat:')
        const updatedBlocks = JSON.parse(updatedActivity.contentBlocks)
        updatedBlocks.forEach((block, index) => {
          console.log(`   Bloc ${index + 1}:`)
          console.log(`     - Type: ${block.type}`)
          console.log(`     - Contenu: ${block.content}`)
          console.log(`     - Vidéos: Supprimées`)
        })
        
      } catch (parseError) {
        console.error('❌ Erreur lors du parsing des blocs de contenu:', parseError)
        console.log('💡 Tentative de nettoyage manuel...')
        
        // Nettoyage manuel si le parsing échoue
        await prisma.activity.update({
          where: { id: targetActivity.id },
          data: { contentBlocks: '[]' }
        })
        
        console.log('✅ Blocs de contenu réinitialisés (nettoyage manuel)')
      }
    } else {
      console.log('✅ Aucun bloc de contenu à nettoyer')
    }
    
    console.log('\n🎉 Nettoyage terminé avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage :', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('\n🔌 Connexion fermée.')
  }
}

// Exécuter le nettoyage si le script est appelé directement
if (require.main === module) {
  removeVideosFromChampionActivity()
}

module.exports = removeVideosFromChampionActivity






