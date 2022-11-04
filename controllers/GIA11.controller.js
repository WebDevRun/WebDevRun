const GIA11Service = require('../services/gia11.service')
module.exports = class GIA11Controller {
  static async getByDate(req, res) {
    try {
      const { date } = req.query
      if (!date) return res.status(422).send('Not found query')
      const results = await GIA11Service.selectByDate({ date })
      if (!results.length)
        return res
          .status(404)
          .send(`Not found by query ${JSON.stringify(req.query)}`)
      res.json(results)
    } catch (error) {
      res.status(500).send(`Server error: ${error}`)
    }
  }

  static async getByExam(req, res) {
    try {
      const { code, name } = req.query
      if (!(code || name)) return res.status(422).send('Not found query')
      const results = await GIA11Service.selectByExam({ code, name })
      if (!results.length)
        return res
          .status(404)
          .send(`Not found by query ${JSON.stringify(req.query)}`)
      res.json(results)
    } catch (error) {
      res.status(500).send(`Server error: ${error}`)
    }
  }

  static async getBySchool(req, res) {
    try {
      const { code, name } = req.query
      if (!(code || name)) return res.status(422).send('Not found query')
      const results = await GIA11Service.selectBySchool({ code, name })
      if (!results.length)
        return res
          .status(404)
          .send(`Not found by query ${JSON.stringify(req.query)}`)
      res.json(results)
    } catch (error) {
      res.status(500).send(`Server error: ${error}`)
    }
  }

  static async getByStudent(req, res) {
    try {
      const { lastname, firstname, patronymic } = req.query
      if (!(lastname || firstname || patronymic))
        return res.status(422).send('Not found query')
      const results = await GIA11Service.selectByStudent({
        lastname,
        firstname,
        patronymic,
      })
      if (!results)
        return res
          .status(404)
          .send(`Not found by query ${JSON.stringify(req.query)}`)
      res.json(results)
    } catch (error) {
      res.status(500).send(`Server error: ${error}`)
    }
  }
}
