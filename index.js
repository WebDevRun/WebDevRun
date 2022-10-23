const File = require('./filesDriver/file')
const gia11 = require('./service/gia11')
const { open, close } = require('./databaseDriver')

async function start() {
  try {
    await open()
    const result = await gia11.selectByDate({
      date: '20.06.2022',
    })
    await File.writeJson(
      './log/result.json',
      Array.isArray(result) ? result : [result]
    )
  } catch (error) {
    console.error(error)
  } finally {
    await close()
  }
}

start()
