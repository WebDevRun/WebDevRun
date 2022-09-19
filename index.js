import { resolve as pathResolve } from 'path'
import CsvDirectory from './csvFilesDriver/csvDirectory.js'
import CsvFile from './csvFilesDriver/csvFile.js'
import FileParser from './csvFilesDriver/fileParser.js'

try {
  const pathArray = await CsvDirectory.getCsvPaths(pathResolve('static'))
  const parsedFilesData = []

  for await (const path of pathArray) {
    const fileData = await CsvFile.readFile(path)
    const fileParser = new FileParser(fileData)
    const parsedData = fileParser.parseFile()
    parsedFilesData.push(parsedData)
    CsvFile.writeJson(parsedFilesData, pathResolve('static', 'result.json'))
  }
} catch (error) {
  console.error(error)
}
