require('express-async-errors') // used to remove asyncMW 
const winston = require('winston')
require('winston-mongodb')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser");
const config = require('config')
const error = require('./middleware/error.mw')

const port = 3000

// if (! config.get('jwtPrivateKey')){
//     console.error('jwt private key not defined...')
//     process.exit(1)
// }

// for production
require('./startup/prod')

// logging errors 
// winston.add(winston.transports.File, {filename: 'logfile.log'})
// winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/blogproject'})

// routes
const home_route = require('./routes/home.route')
const blog_route = require('./routes/blog.route')
const author_route = require('./routes/author.route')
const user_route = require('./routes/user.route')
const auth_route = require('./routes/auth')

// 
app.use(bodyParser.json());

// routes connection
app.use('/', home_route)
app.use('/api/blogs', blog_route)
app.use('/api/authors', author_route)
app.use('/api/users', user_route)
app.use('/api/auth', auth_route)

// error handling middleware
app.use(error)

// connecting to database
mongoose.connect('mongodb://localhost/blogproject')
    .then(() => console.log('connection to MongoDB successful.....!'))
    .catch((err => console.log('unable to connect......!')))    


// setting up server for app
app.listen(port,  ()=> {
    console.log(`server running on ${port}`)
})


