const Router = require('express')
const GIA11Controller = require('../controllers/GIA11.controller')
const GIARouter = new Router()

GIARouter.get('/date', GIA11Controller.getByDate)
GIARouter.get('/exam', GIA11Controller.getByExam)
GIARouter.get('/school', GIA11Controller.getBySchool)
GIARouter.get('/student', GIA11Controller.getByStudent)

module.exports = GIARouter
