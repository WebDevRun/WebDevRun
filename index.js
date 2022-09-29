const { resolve: pathResolve } = require('path')
const { Sequelize } = require('sequelize')
const Directory = require('./filesDriver/directory.js')
const File = require('./filesDriver/file.js')
const FileParser = require('./filesDriver/fileParser.js')

// const pathDb = pathResolve('database', 'gia11.db')
// const db = new Sequelize({
//   dialect: 'sqlite',
//   storage: pathDb,
// })

// try {
//   const result = await db.sync()
//   console.log(result)
// } catch (error) {
//   console.error(error)
// }
async function start() {
  try {
    const pathArray = await Directory.getPaths(pathResolve('static'))
    const pathJson = pathResolve('static', 'result.json')
    const parsedFilesData = []

    for await (const path of pathArray) {
      const fileData = await File.read(path)
      const fileParser = new FileParser(fileData)
      const parsedData = fileParser.parseCsv()
      parsedFilesData.push(parsedData)
      await File.writeJson(pathJson, parsedFilesData)
    }
  } catch (error) {
    console.error(error)
  }
}

start()
