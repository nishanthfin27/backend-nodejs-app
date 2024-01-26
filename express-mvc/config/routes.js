const express = require('express')
const router = express.Router()
const tasksController = require('../app/controllers/tasksController')
const categoriesController = require('../app/controllers/categoryCltr')

router.get('/api/tasks', tasksController.list)
router.post('/api/tasks', tasksController.create)
router.get('/api/tasks/:id', tasksController.show)
router.put('/api/tasks/:id',tasksController.update)
router.delete('/api/tasks/:id', tasksController.destroy)

router.get('/api/categories', categoriesController.list)
router.post('/api/categories' , categoriesController.create)
router.get('/api/categories/:id', categoriesController.show)
router.put('/api/categories/:id', categoriesController.update)
router.delete('/api/categories/:id', categoriesController.destroy)


module.exports = router