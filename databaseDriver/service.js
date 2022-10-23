const { randomUUID } = require('crypto')

module.exports = class DBService {
  static async #insertDate(model, date, options) {
    try {
      const { transaction } = options
      return await model.findOrCreate({
        where: {
          date,
        },
        defaults: {
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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
          id: randomUUID(),
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

  static async insert(models, data, options) {
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
      const { title, body } = data

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
