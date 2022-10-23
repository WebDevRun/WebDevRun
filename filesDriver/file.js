const { open } = require('fs/promises')
const { createDirIfNotExists } = require('./directory')
class File {
  static async read(path) {
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

  static async writeJson(path, data) {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (path === '') throw new Error('path must not be empty')
    let fileHandle

    try {
      await createDirIfNotExists(path)
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

module.exports = File
