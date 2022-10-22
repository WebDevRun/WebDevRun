const readCsvFiles = require('../filesDriver')
const DBService = require('../databaseDriver/service')
const { db, open, close } = require('../databaseDriver')
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

module.exports = class giaData {
  static #configForSelect = {
    attributes: [],
    include: [
      {
        model: dates,
      },
      {
        model: exams,
      },
      {
        model: students,
        through: {
          attributes: { exclude: ['student_id', 'exam_date_id'] },
        },
        attributes: { exclude: ['school_class_id'] },
        include: {
          model: schoolClass,
          attributes: [],
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
  }

  static async selectExamsWithDates() {
    try {
      return await exams.findAll({
        attributes: ['code', 'name'],
        include: [
          {
            model: dates,
            through: {
              attributes: [],
            },
            attributes: ['date'],
          },
        ],
      })
    } catch (error) {
      return error
    }
  }

  static async insert(url) {
    try {
      const csvData = await readCsvFiles(url)
      return await db.sequelize.transaction(async (t) => {
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
    } catch (error) {
      return error
    }
  }

  static async selectByDate(date) {
    try {
      return await DBService.findAll(examDate, {
        where: {
          '$date.date$': date,
        },
        ...this.#configForSelect,
      })
    } catch (error) {
      return error
    }
  }

  static async selectByExam(exam) {
    try {
      return await DBService.findAll(examDate, {
        where: {
          '$exam.name$': exam,
        },
        ...this.#configForSelect,
      })
    } catch (error) {
      return error
    }
  }
}
