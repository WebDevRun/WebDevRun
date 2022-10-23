const File = require('./filesDriver/file')
const gia11 = require('./service/gia11')
const { open, close } = require('./databaseDriver')

async function start() {
  try {
    await open()
    const result = await gia11.selectByExam({
      code: '06',
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
