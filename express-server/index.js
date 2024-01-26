const express = require('express')
const mongoose = require('mongoose')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express()
const port = 3010

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url} - ${req.ip} - ${new Date()}`)
    next()
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API project for mongodb',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3010/'
            }
        ]
    },
    apis: ['./index.js']
}

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//establish connection to database
mongoose.connect('mongodb://localhost:27017/crud_swagger', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })

//create a task schema
const Schema = mongoose.Schema
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is mandatory']
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//create a model
const Task = mongoose.model('Task', taskSchema)

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check if get method is working or not
 *      description: This api is used to check if get method is working or not
 *      responses:
 *          200:
 *              description: To get base url response
 */
app.get('/', (req, res) => {

    res.send('welcome to the website')
})

app.get('/api/errors', () => {
    throw new Error('not authorized')
})

/**
 * @swagger
 *  components:
 *      schemas:
 *          task:
 *              type: object
 *              properties:
 *                  title:
 *                          type: string
 *                  completed:
 *                          type: boolen
 *                  description:
 *                          type: string
 *                  dueDate:
 *                          type: date
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *      summary: To get all tasks from mongodb
 *      description: This api is used to fetch data from mongodb
 *      responses:
 *          200:
 *              description: Fetched all the tasks from mongodb
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/task'
 */
app.get('/api/tasks', (req, res) => {
    Task.find()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
})

/**
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *      summary: To get specific task details from mongodb using id
 *      description: This api is used to fetch specific task details from mongodb using id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: alphanumeric ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Fetched the specific task details using id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/task'
 */
app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

/**
 * @swagger
 * /api/tasks:
 *  post:
 *      summary: To add specific task details to mongodb using request body
 *      description: This api is used to add specific task details to mongodb using request body
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/task'
 *      responses:
 *          200:
 *              description: Added task details successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/task'
 */
app.post('/api/tasks', (req, res) => {
    const body = req.body
    const task = new Task(body)
    task.save()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
    // task.title = body.title
    // task.description = body.description
    // task.completed = body.completed
    // task.dueDate = body.dueDate
    // task.createdAt = body.createdAt
})

/**
 * @swagger
 * /api/tasks/{id}:
 *  put:
 *      summary: To update specific task details to mongodb
 *      description: This api is used to add specific task details to mongodb using request body
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: alphanumeric ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/task'
 *      responses:
 *          200:
 *              description: updated task details successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/task'
 */
app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

//new property is used in options object so that express sends the updated record and runvalidators is used because mongoose runs validations only on save operation on the database not on the update operation so we have to set the property so that even while updating the record validations are handled by the mongoose

/**
 * @swagger
 * /api/tasks/{id}:
 *  delete:
 *      summary: To delete specific task details from mongodb using id
 *      description: This api is used to fetch specific task details from mongodb using id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: alphanumeric ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Deleted task details successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/task'
 */
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
        .then((task) => {
            res.json(task)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.use((err, req, res, next) => {
    console.log('error handling middleware function')
    res.send(err.message)
})

app.listen(port, () => {
    console.log('listening to port', port)
})

/*
1.create
 static - called on a class / constructor function / Model
    Student.insertMany() -  static method to insert bunch of records at once.
 instance - called on an object / instance

 const stud = new Student()
 stud.save() - instance method

 2. Read
  static methods
   Student.find() -  all
   Student.findById()

3.update
static
Student.findByIdAndUpdate()

4.Destroy
static
Student.findByIdAndDelete()

on an object (ie individual) - instance method
on an collection - static method
*/