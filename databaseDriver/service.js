const File = require('../filesDriver/file')
module.exports = class DBService {
  static async #insertDate(model, date, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          date,
        },
        defaults: {
          date,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertExam(model, { code, name }, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          code,
        },
        defaults: {
          code,
          name,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertExamDate(model, { exam_id, date_id }, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          date_id,
          exam_id,
        },
        defaults: {
          date_id,
          exam_id,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async insertTitle(models, title, options) {
    try {
      const { exams, dates, examDate } = models
      const { date, code, examName } = title
      const [insertedDate] = await this.#insertDate(dates, date, options)
      const [insertedExam] = await this.#insertExam(
        exams,
        { code, name: examName },
        options
      )
      return await this.#insertExamDate(
        examDate,
        { exam_id: insertedExam.id, date_id: insertedDate.id },
        options
      )
    } catch (error) {
      return error
    }
  }

  static async insertSchool(model, { code, short_name, full_name }, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          code,
        },
        defaults: {
          code,
          short_name,
          full_name,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertClass(model, { name }, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          name,
        },
        defaults: {
          name,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertSchoolClass(model, { school_id, class_id }, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          school_id,
          class_id,
        },
        defaults: {
          school_id,
          class_id,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertStudent(
    model,
    { last_name, first_name, patronymic, school_class_id },
    options
  ) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          last_name,
          first_name,
          patronymic,
        },
        defaults: {
          last_name,
          first_name,
          patronymic,
          school_class_id,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async #insertResult(model, result, options) {
    try {
      const {
        code_exam_point,
        auditorium_number,
        short_answer,
        detailed_answer,
        oral_answer,
        written_score,
        oral_score,
        prymary_score,
        estimation,
        student_id,
        exam_date_id,
      } = result
      const { transaction } = options

      return await model.findOrCreate({
        where: {
          student_id,
          exam_date_id,
        },
        defaults: {
          code_exam_point,
          auditorium_number,
          short_answer,
          detailed_answer,
          oral_answer,
          written_score,
          oral_score,
          prymary_score,
          estimation,
          student_id,
          exam_date_id,
        },
        transaction,
      })
    } catch (error) {
      return error
    }
  }

  static async insertResults(models, resultsChunk, options) {
    const insertedResults = []

    try {
      const {
        exams,
        dates,
        examDate,
        schools,
        classes,
        schoolClass,
        students,
        results,
      } = models
      const { title, body } = resultsChunk
      const [insertedTitle] = await this.insertTitle(
        { exams, dates, examDate },
        title,
        options
      )

      for await (const row of body) {
        const [insertedSchool] = await this.insertSchool(
          schools,
          { code: row.organization_code },
          options
        )
        const [insertedClass] = await this.#insertClass(
          classes,
          { name: row.class },
          options
        )
        const [insertedSchoolClass] = await this.#insertSchoolClass(
          schoolClass,
          { school_id: insertedSchool.id, class_id: insertedClass.id },
          options
        )
        const [insertedStudent] = await this.#insertStudent(
          students,
          {
            last_name: row.last_name,
            first_name: row.first_name,
            patronymic: row.patronymic,
            school_class_id: insertedSchoolClass.id,
          },
          options
        )
        const insertedResult = await this.#insertResult(
          results,
          {
            code_exam_point: row.code_exam_point,
            auditorium_number: row.auditorium_number,
            short_answer: row.short_answer,
            detailed_answer: row.detailed_answer,
            oral_answer: row.oral_answer,
            written_score: row.written_score,
            oral_score: row.oral_score,
            prymary_score: row.prymary_score,
            estimation: row.estimation,
            student_id: insertedStudent.id,
            exam_date_id: insertedTitle.id,
          },
          options
        )
        insertedResults.push(insertedResult)
      }

      return insertedResults
    } catch (error) {
      return error
    }
  }

  static async #insertAppeal(model, result, options) {
    try {
      const {
        appeal_type,
        appeal_status,
        send_for_processing_date,
        change_date,
        appeal_prymary_score,
        appeal_estimation,
        id,
      } = result

      return await model.update(
        {
          appeal_type,
          appeal_status,
          send_for_processing_date,
          change_date,
          appeal_prymary_score,
          appeal_estimation,
        },
        {
          where: {
            id,
          },
        },
        options
      )
    } catch (error) {
      return error
    }
  }

  static async insertAppeals(models, appealsChunk, options) {
    const insertedAppeals = []

    try {
      const { exams, dates, examDate, students, results } = models
      const { title, body } = appealsChunk

      for (const row of body) {
        const findResult = await results.findOne({
          where: {
            '$examDate.date.date$': title.date,
            '$examDate.exam.code$': title.code,
            '$student.last_name$': row.last_name,
            '$student.first_name$': row.first_name,
            '$student.patronymic$': row.patronymic,
          },
          include: [
            students,
            {
              model: examDate,
              include: [dates, exams],
            },
          ],
        })

        if (findResult === null)
          throw new Error(
            `not find result appropriate this appeal. date: ${title.date}; exam_code: ${title.code}; full_name: ${row.last_name} ${row.first_name} ${row.patronymic}`
          )

        const insertedAppeal = await this.#insertAppeal(
          results,
          {
            appeal_type: row.appeal_type,
            appeal_status: row.appeal_status,
            send_for_processing_date: row.send_for_processing_date,
            change_date: row.change_date,
            appeal_prymary_score: row.prymary_score,
            appeal_estimation: row.estimation,
            id: findResult.id,
          },
          options
        )
        insertedAppeals.push(insertedAppeal)
      }

      return insertedAppeals
    } catch (error) {
      return error
    }
  }

  static async findAll(model, options) {
    try {
      return await model.findAll(options)
    } catch (error) {
      return error
    }
  }

  static async findOne(model, options) {
    try {
      return await model.findOne(options)
    } catch (error) {
      return error
    }
  }
}
