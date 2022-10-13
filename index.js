const readCsvFiles = require('./filesDriver/index')
const File = require('./filesDriver/file')
const { db, open, close } = require('./databaseDriver')
const DBService = require('./databaseDriver/service')

const {
  exams,
  dates,
  examDate,
  schools,
  classes,
  schoolClass,
  students,
  results,
} = db

async function start() {
  try {
    const csvData = await readCsvFiles('static')
    // await File.writeJson('./static/result.json', csvData)
    await open()
    await db.sequelize.transaction(async (t) => {
      for (const data of csvData) {
        await DBService.insert(
          {
            exams,
            dates,
            examDate,
            schools,
            classes,
            schoolClass,
            students,
            results,
          },
          data,
          {
            transaction: t,
          }
        )
      }
    })

    const findResults = await DBService.findAll(exams, {
      where: {
        code: '01',
        '$examDates.students.schoolClass.school.code$': '111005',
      },
      include: {
        model: examDate,
        include: [
          {
            model: dates,
          },
          {
            model: students,
            include: {
              model: schoolClass,
              include: [
                {
                  model: classes,
                },
                {
                  model: schools,
                },
              ],
            },
          },
        ],
      },
      raw: true,
    })

    await File.writeJson('./log/result.json', findResults)
  } catch (error) {
    console.error(error)
  } finally {
    close()
  }
}

start()
