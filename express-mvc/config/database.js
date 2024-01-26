const mongoose = require('mongoose')


const configureDB = () => {
    //establish connection to database
    // to get rid of warnings - third arguments for mongoose.connect,useNewUrlParser: true,useUnifiedTopology : true
    
    mongoose.connect('mongodb://localhost:27017/express-mvc',{useNewUrlParser: true},{useUnifiedTopology : true})
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('error connecting to db',err)
    })
}

module.exports = configureDB