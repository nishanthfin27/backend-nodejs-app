const Task = require('../models/tasks')

const tasksController = { }

tasksController.list = (req,res) => {
    Task.find()
    .then((tasks) => {
        res.json(tasks)
    })
    .catch((err) => {
        res.json(err)
    })
}

tasksController.create = (req,res) => {
    const body = req.body
    const task = new Task(body)
    task.save()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
}

tasksController.show = (req,res) => {
    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

tasksController.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id,body, { new : true, runValidators: true})
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

tasksController.destroy = (req,res) => {
    const id = req.params.id 
    Task.findByIdAndDelete(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = tasksController