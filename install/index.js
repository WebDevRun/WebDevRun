import path from 'path'
import sqlite3 from 'sqlite3'
import File from '../filesDriver/file.js'

sqlite3.verbose()

const dbPath = path.resolve('database', 'gia11.db')
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) return console.error(error)
})
const sqlPath = path.resolve('install', 'createDatabase.sql')
const sql = await File.read(sqlPath)

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;')

  db.get('PRAGMA foreign_keys', (error, row) => {
    if (error) return console.error(error)
    console.log(`PRAGMA foreign_keys status ${row.foreign_keys}`)
  })

  db.exec(sql, (error) => {
    if (error) return console.error(error)
  })

  db.close((error) => {
    if (error) return console.error(error)
  })

  console.log(`Install database is ready. Database path: ${dbPath}`)
})
