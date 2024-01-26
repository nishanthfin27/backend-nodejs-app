const express = require('express')
const app = express()
const port = 3010

//middleware - nothing but functions,called at different execution times
//enable express app to read incoming json data
//app middleware we need to

//configuration

app.use(express.json())

// const users = [
//     {id:1, name:'nishanth'},
//     {id:2, name:'nishi'}
// ]

// //REQUEST LISTENER (EXPRESS)
// //app.httpMethod(url, callback)

// //GET localhost:3010/ -> welcome to website
// app.get('/', (req,res) => {
//     res.send('welcome to the website')
// })

// //GET localhost:3010/about -> about page
// app.get('/about', (req,res) => {
//     res.send('about page')
// })

// //GET localhost:3010/allusers -> return an array of objects
// app.get('/allusers', (req,res) => {
//     res.json(users)
// })

// app.get('/allusers/:id', (req,res) => {
//     const id = req.params.id 
//     const user = users.find((user) => {
//         return user.id === Number(id)
//     })
//     if(user){
//         res.json(user)
//     }else{
//         res.json({})
//     }
// })

// app.get('/allusers/name/:name', (req,res) =>{
//     const name = req.params.name
//     const user = users.find((user) => {
//         return user.name === name
//     })
//     if(user){
//         res.json(user)
//     }else{
//         res.json({})
//     }
// })

// //post
// app.post('/api/students', (req,res) => {
//     const data = req.body 
//     console.log(data, 'form data')
//     res.json({
//         message: `method - ${req.method} , url - ${req.url}`
//     })
// })

// //put
// app.put('/api/students/:id', (req,res) => {
//     const { id } = req.params
//     const body = req.body
//     console.log('id',id,'body',body)
//     res.json({
//         message: `method - ${req.method} , url - ${req.url}`
//     })
// })

// //delete
// app.delete('/api/students/:id', (req,res) => {
//     const { id } = req.params 
//     console.log(id)
//     res.json({
//         message: `method - ${req.method} , url - ${req.url}`
//     })
// })


//url - /info
app.get('/info',(req,res) => {
    const httpMethod = req.method
    res.send(`${httpMethod} was received`)
})

app.post('/info',(req,res) => {
    const data = req.body 
    console.log('data value',data)
    const httpMethod = req.method
    res.send(`${httpMethod} was received`)
})

app.post('/profile',(req,res)=>{
    const data = req.body 
    console.log('data value',data)
    const value = `${data.prefix} ${data.position}`
    res.send({"profile":value})
    const httpMethod = req.method
    res.send(`${httpMethod} was received`)
})



app.put('/info',(req,res) => {
    const data = req.body 
    console.log('data value',data)
    const httpMethod = req.method
    res.send(`${httpMethod} was received`)
})

app.delete('/info',(req,res) => {
    const httpMethod = req.method
    res.send(`${httpMethod} was received`)
})

app.listen(port,() => {
    console.log('listening to port',port)
})