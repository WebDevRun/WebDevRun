const { resolve: pathResolve } = require('path')
const Directory = require('./directory.js')
const File = require('./file.js')
const FileParser = require('./fileParser.js')

async function readCsvFiles(path) {
  try {
    const pathArray = await Directory.getPaths(pathResolve(path))
    const parsedFilesData = []

    for await (const path of pathArray) {
      const fileData = await File.read(path)
      const fileParser = new FileParser(fileData)
      const parsedData = fileParser.parseCsv()
      parsedFilesData.push(parsedData)
    }

    return parsedFilesData
  } catch (error) {
    return error
  }
}

module.exports = readCsvFiles
