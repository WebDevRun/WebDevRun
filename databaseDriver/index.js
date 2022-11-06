const fs = require('fs')
const path = require('path')
const process = require('process')
const Sequelize = require('sequelize')
const DBService = require('./service')

const modelsPath = path.resolve('databaseDriver', 'models')
const configPath = path.resolve('databaseDriver', 'config', 'config.js')
const env = process.env.NODE_ENV || 'development'
const config = require(configPath)[env]
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const db = {}

async function open() {
  await db.sequelize.authenticate()
}

async function close() {
  await db.sequelize.close()
}

fs.readdirSync(modelsPath)
  .filter((file) => path.extname(file).toLowerCase() === '.js')
  .forEach((file) => {
    const modelFile = require(path.join(modelsPath, file))
    const model = modelFile(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = { db, open, close, DBService }
