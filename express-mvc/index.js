const express = require('express')
const app = express()
const configureDB = require('./config/database')
const port = 3075
const router = require('./config/routes')

//setup db
configureDB()
app.use(express.json())
app.use(router)

app.get('/',(req,res) => {
    res.send('express backend...')
})

app.listen(port,() => {
    console.log('server running on port',port)
})