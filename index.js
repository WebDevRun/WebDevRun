const File = require('./filesDriver/file')
const gia11 = require('./service/gia11')
const { db, open, close } = require('./databaseDriver')

async function start() {
  try {
    await open()
    const results = await gia11.insert('static')
    if (results instanceof Error) throw results
    await File.write(
      './log/result.json',
      Array.isArray(results)
        ? JSON.stringify(results)
        : JSON.stringify([results])
    )
  } catch (error) {
    console.error(error)
    const date = new Date()

    await File.write(
      './log/errors.log',
      `Date: ${date}\n${error.stack}\n\n`,
      'a'
    )
  } finally {
    await close()
  }
}

start()
