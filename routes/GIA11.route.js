const Router = require('express')
const GIA11Controller = require('../controllers/GIA11.controller')
const GIARouter = new Router()

GIARouter.get('/schools', GIA11Controller.getBySchool)
GIARouter.put('/schools/:id', GIA11Controller.updateSchool)

GIARouter.get('/exams', GIA11Controller.getByExam)
GIARouter.put('/exams/:id', GIA11Controller.updateExam)

GIARouter.get('/dates', GIA11Controller.getByDate)
GIARouter.put('/dates/:id', GIA11Controller.updateDate)

GIARouter.get('/students', GIA11Controller.getByStudent)
GIARouter.put('/students/:id', GIA11Controller.updateStudent)

GIARouter.post('/uploadfiles', GIA11Controller.uploadFiles)

module.exports = GIARouter
