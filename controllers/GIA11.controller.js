const { resolve } = require('path')
const { IncomingForm } = require('formidable')
const Directory = require('../filesDriver/directory')
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

  static async uploadFiles(req, res) {
    try {
      const uploadDir = resolve('static')
      const form = new IncomingForm({
        uploadDir,
        multiples: true,
        keepExtensions: true,
      })

      await Directory.createDirIfNotExists(uploadDir)
      form.parse(req, async (error, fields, files) => {
        if (error)
          return res.status(400).json({ message: "Files don't upload" })

        await GIA11Service.insert(uploadDir)
        await Directory.cleanDirectory(uploadDir)
        res.status(201).json({ message: 'Files is uploaded' })
      })
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async updateSchool(req, res) {
    try {
      const { code, short_name, full_name } = req.body
      const updateStatus = await GIA11Service.updateSchool({
        id: req.params.id,
        code,
        short_name,
        full_name,
      })
      res.json({ status: updateStatus[0] })
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async updateExam(req, res) {
    try {
      const { code, name } = req.body
      const updateStatus = await GIA11Service.updateExam({
        id: req.params.id,
        code,
        name,
      })
      res.json({ status: updateStatus[0] })
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async updateDate(req, res) {
    try {
      const { date } = req.body
      const updateStatus = await GIA11Service.updateDate({
        id: req.params.id,
        date,
      })
      res.json({ status: updateStatus[0] })
    } catch (error) {
      res.setStatus(500)
    }
  }

  static async updateStudent(req, res) {
    try {
      const { last_name, first_name, patronymic } = req.body
      const updateStatus = await GIA11Service.updateStudent({
        id: req.params.id,
        last_name,
        first_name,
        patronymic,
      })
      res.json({ status: updateStatus[0] })
    } catch (error) {
      res.setStatus(500)
    }
  }
}
