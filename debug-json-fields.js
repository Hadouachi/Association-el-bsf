const mysql = require('mysql2/promise')

async function debugJsonFields() {
  let connection
  try {
    const dbConfig = {
      host: 'localhost',
      user: 'root',
      password: 'Hadouachi20@',
      database: 'association_el_bsf',
      port: 3306
    }

    connection = await mysql.createConnection(dbConfig)
    console.log('🔌 Connexion établie')

    const [rows] = await connection.execute(`
      SELECT id, title, images, videos FROM aboutcontent 
      ORDER BY \`order\` ASC, createdAt DESC
    `)

    console.log('\n🔍 Analyse des champs JSON:')
    rows.forEach((row, index) => {
      console.log(`\n--- Élément ${index + 1} ---`)
      console.log(`ID: ${row.id}`)
      console.log(`Titre: ${row.title}`)
      console.log(`Images type: ${typeof row.images}`)
      console.log(`Images value:`, row.images)
      console.log(`Videos type: ${typeof row.videos}`)
      console.log(`Videos value:`, row.videos)
      
      if (row.images) {
        console.log(`Images isArray: ${Array.isArray(row.images)}`)
        console.log(`Images keys:`, Object.keys(row.images))
      }
    })

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Connexion fermée')
    }
  }
}

debugJsonFields()




