const mysql = require('mysql2/promise')
const fs = require('fs').promises
const path = require('path')

async function createContentBlocksTable() {
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

    // Lire le fichier SQL
    const sqlFile = path.join(__dirname, 'create_content_blocks_table.sql')
    const sqlContent = await fs.readFile(sqlFile, 'utf8')
    
    // Exécuter les commandes SQL
    const commands = sqlContent.split(';').filter(cmd => cmd.trim())
    
    for (const command of commands) {
      if (command.trim()) {
        await connection.execute(command)
        console.log('✅ Commande exécutée:', command.substring(0, 50) + '...')
      }
    }

    console.log('🎉 Table ContentBlocks créée avec succès !')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    if (connection) {
      await connection.end()
      console.log('🔌 Connexion fermée')
    }
  }
}

createContentBlocksTable()






