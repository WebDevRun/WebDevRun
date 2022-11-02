const File = require('./filesDriver/file')
const gia11 = require('./services/gia11')
const { open, close } = require('./databaseDriver')

async function start() {
  try {
    await open()
    const results = await gia11.insert('static')
    // const results = await gia11.selectByDate({ date: '06.06.2022' })
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
      `./log/errors_${date.toLocaleDateString()}.log`,
      `Date: ${date}\n${error.stack}\n\n`,
      'a'
    )
  } finally {
    await close()
  }
}

start()
