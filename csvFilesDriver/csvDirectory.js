import { readdir } from 'fs/promises'
import { join as joinPath, extname } from 'path'

export default class CsvDirectory {
  static #csvExtname = '.csv'

  static async getCsvPaths (directoryPath) {
    if (typeof directoryPath !== 'string') throw new Error('directory path must be string')
    if (directoryPath === '') throw new Error('directory path must not be empty')

    try {
      const files = await readdir(directoryPath)

      return files.reduce((acc, item) => {
        const fileExtname = extname(item)

        if (fileExtname === this.#csvExtname) {
          const filePath = joinPath(directoryPath, item)
          acc.push(filePath)
        }

        return acc
      }, [])
    } catch (error) {
      return error
    }
  }
}
