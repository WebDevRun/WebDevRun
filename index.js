const File = require('./filesDriver/file')
const giaData = require('./service/giaData')
const { open, close } = require('./databaseDriver')

async function start() {
  try {
    await open()
    const result = await giaData.selectByDate('09.06.2022')
    if (result.length) {
      await File.writeJson('./log/result.json', result)
      return
    }

    const examsDates = await giaData.selectExamsWithDates()
    console.log('Такой даты нет. Может вы имели ввиду:')
    for (const examDates of examsDates) {
      const { dates, code, name } = examDates
      const datesString = dates.map((item) => item.date).join(', ')
      console.log(`${code} ${name}: [${datesString}]`)
    }
  } catch (error) {
    console.error(error)
  } finally {
    await close()
  }
}

start()
