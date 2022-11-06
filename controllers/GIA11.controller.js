const GIA11Service = require('../services/gia11.service')
module.exports = class GIA11Controller {
  static async getByDate(req, res) {
    try {
      const { date } = req.query
      if (!date) return res.status(400).json({ message: 'Not found query' })
      const results = await GIA11Service.selectByDate({ date })
      res.json(results)
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async getByExam(req, res) {
    try {
      const { code, name } = req.query
      if (!(code || name))
        return res.status(400).json({ message: 'Not found query' })
      const results = await GIA11Service.selectByExam({ code, name })
      res.json(results)
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async getBySchool(req, res) {
    try {
      const { code, name } = req.query
      if (!(code || name))
        return res.status(400).json({ message: 'Not found query' })
      const results = await GIA11Service.selectBySchool({ code, name })
      res.json(results)
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async getByStudent(req, res) {
    try {
      const { lastname, firstname, patronymic } = req.query
      if (!(lastname || firstname || patronymic))
        return res.status(400).json({ message: 'Not found query' })
      const results = await GIA11Service.selectByStudent({
        lastname,
        firstname,
        patronymic,
      })
      res.json(results)
    } catch (error) {
      res.setStatus(500)
    }
  }
}
