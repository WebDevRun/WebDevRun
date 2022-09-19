import { open } from 'fs/promises'

export default class CsvFile {
  static async readFile(path) {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (path === '') throw new Error('path must not be empty')
    let fileHandle
    let data = ''

    try {
      fileHandle = await open(path)
      const stream = fileHandle.createReadStream({ encoding: 'utf-8' })
      for await (const chunk of stream) data += chunk
      return data
    } catch (error) {
      return error
    } finally {
      await fileHandle?.close()
    }
  }

  static async writeJson(data, path) {
    if (!Array.isArray(data)) throw new Error('data must be array')
    if (!data.length) throw new Error('data must not be empty')
    if (typeof path !== 'string') throw new Error('path must be string')
    if (path === '') throw new Error('path must not be empty')
    let fileHandle

    try {
      fileHandle = await open(path, 'w')
      const stream = fileHandle.createWriteStream()
      stream.write(JSON.stringify(data))
    } catch (error) {
      return error
    } finally {
      await fileHandle?.close()
    }
  }
}
