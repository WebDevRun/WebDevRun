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

  static async write(path, data, flags = 'w') {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (path === '') throw new Error('path must not be empty')
    let fileHandle

    try {
      await createDirIfNotExists(path)
      fileHandle = await open(path, flags)
      const stream = fileHandle.createWriteStream()
      stream.write(data)
    } catch (error) {
      return error
    } finally {
      await fileHandle?.close()
    }
  }
}

module.exports = File
