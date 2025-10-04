const mysql = require('mysql2/promise')
const fs = require('fs')

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
}

async function exportDatabase() {
  let connection
  
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connexion à la base de données établie')

    // Exporter les tables principales
    const tables = ['Activity', 'News', 'AboutContent', 'ContentBlocks']
    const exportData = {}

    for (const table of tables) {
      try {
        const [rows] = await connection.execute(`SELECT * FROM ${table}`)
        exportData[table] = rows
        console.log(`✅ Table ${table} exportée (${rows.length} enregistrements)`)
      } catch (error) {
        console.log(`⚠️ Table ${table} non trouvée ou vide`)
      }
    }

    // Sauvegarder dans un fichier JSON
    const exportFile = 'database-export.json'
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2))
    console.log(`✅ Données exportées dans ${exportFile}`)

    // Créer un script SQL d'insertion
    const sqlFile = 'database-import.sql'
    let sqlContent = '-- Script d\'importation pour la base de production\n\n'
    
    for (const [tableName, rows] of Object.entries(exportData)) {
      if (rows.length > 0) {
        sqlContent += `-- Table ${tableName}\n`
        sqlContent += `INSERT INTO ${tableName} VALUES\n`
        
        const values = rows.map(row => {
          const valuesArray = Object.values(row).map(value => {
            if (value === null) return 'NULL'
            if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`
            if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`
            return value
          })
          return `(${valuesArray.join(', ')})`
        })
        
        sqlContent += values.join(',\n') + ';\n\n'
      }
    }
    
    fs.writeFileSync(sqlFile, sqlContent)
    console.log(`✅ Script SQL créé : ${sqlFile}`)

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    if (connection) await connection.end()
    console.log('🔌 Connexion fermée')
  }
}

exportDatabase()
