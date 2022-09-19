import { readdir } from 'fs/promises'
import { resolve, extname, join } from 'path'

export default class CsvDirectory {
  static #csvExtname = '.csv'

  static async getCsvPaths(directoryPath) {
    if (typeof directoryPath !== 'string')
      throw new Error('directory path must be string')
    if (directoryPath === '')
      throw new Error('directory path must not be empty')

    try {
      const directoryAbsolutePath = resolve(directoryPath)
      const files = await readdir(directoryAbsolutePath)

      return files.reduce((acc, item) => {
        item = item.toLowerCase()
        const fileExtname = extname(item)

        if (fileExtname === this.#csvExtname) {
          const filePath = join(directoryAbsolutePath, item)
          acc.push(filePath)
        }

        return acc
      }, [])
    } catch (error) {
      return error
    }
  }
}
