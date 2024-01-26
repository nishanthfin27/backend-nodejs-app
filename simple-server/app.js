//import - es6 module loader
//require - common js module loader

const http = require('http')
const port = 3033

const server = http.createServer((req,res) =>{
    if(req.url === '/'){
        res.end('Welcome to the website')
    }else if(req.url === '/about'){
        res.end('About page')
    }else if(req.url === '/users'){
        const users = [
            {id:1,name:'nishanth'},
            {id:2,name:'nishi'},
            {id:3,name:'Nishanth'}
        ]

        res.end(JSON.stringify(users))
    }else if(req.url === '/sys_time'){
        const time = new Date()
        res.end(JSON.stringify({value:time}))
    }else{
        res.end('page you are looking for not found')
    }
})

server.listen(port,() => {
    console.log('server is running on port',port)
})





