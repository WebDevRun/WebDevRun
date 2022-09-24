import { resolve as pathResolve } from 'path'
import Directory from './filesDriver/directory.js'
import File from './filesDriver/file.js'
import FileParser from './filesDriver/fileParser.js'

try {
  const pathArray = await Directory.getPaths(pathResolve('static'))
  const parsedFilesData = []

  for await (const path of pathArray) {
    const fileData = await File.read(path)
    const fileParser = new FileParser(fileData)
    const parsedData = fileParser.parseCsv()
    parsedFilesData.push(parsedData)
    File.writeJson(parsedFilesData, pathResolve('static', 'result.json'))
  }
} catch (error) {
  console.error(error)
}
