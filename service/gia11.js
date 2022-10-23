const readCsvFiles = require('../filesDriver')
const DBService = require('../databaseDriver/service')
const { db } = require('../databaseDriver')
const { findOne } = require('../databaseDriver/service')
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

module.exports = class gia11 {
  static #configForSelectExamDate = {
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
          attributes: { exclude: ['school_id', 'class_id'] },
          include: [classes, schools],
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

  static async selectByDate({ date }) {
    try {
      const where = {}
      if (date) where['$date.date$'] = date

      return await DBService.findAll(examDate, {
        where,
        ...this.#configForSelectExamDate,
      })
    } catch (error) {
      return error
    }
  }

  static async selectByExam({ name, code }) {
    try {
      const where = {}
      if (name) where['$exam.name$'] = name
      if (code) where['$exam.code$'] = code

      return await DBService.findAll(examDate, {
        where,
        ...this.#configForSelectExamDate,
      })
    } catch (error) {
      return error
    }
  }

  static async selectBySchool({ code, name }) {
    try {
      const where = {}
      if (code) where['$school.code$'] = code
      if (name) where['$school.short_name$'] = name

      return await DBService.findAll(schoolClass, {
        where,
        attributes: [],
        include: [
          {
            model: schools,
          },
          {
            model: classes,
          },
          {
            model: students,
            attributes: { exclude: ['school_class_id'] },
            include: [
              {
                model: examDate,
                through: {
                  attributes: { exclude: ['student_id', 'exam_date_id'] },
                },
                attributes: { exclude: ['date_id', 'exam_id'] },
                include: [dates, exams],
              },
            ],
          },
        ],
      })
    } catch (error) {
      return error
    }
  }

  static async selectByStudent({ lastName, firstName, patronymic }) {
    try {
      const where = {}
      if (lastName) where['last_name'] = lastName
      if (firstName) where['short_name'] = firstName
      if (patronymic) where['short_name'] = patronymic

      return await DBService.findOne(students, {
        where,
        attributes: { exclude: ['school_class_id'] },
        include: [
          {
            model: schoolClass,
            attributes: { exclude: ['school_id', 'class_id'] },
            include: [schools, classes],
          },
          {
            model: examDate,
            through: {
              attributes: { exclude: ['exam_date_id', 'student_id'] },
            },
            attributes: { exclude: ['exam_id', 'date_id'] },
            include: [dates, exams],
          },
        ],
      })
    } catch (error) {
      return error
    }
  }
}
