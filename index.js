const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const port = 3000

// routes
const home_route = require('./routes/home.route')
const blog_route = require('./routes/blog.route')
const author_route = require('./routes/author.route')

// routes connection
app.use('/', home_route)
app.use('/api/blogs', blog_route)
app.use('/api/authors', author_route)


// connecting to database
mongoose.connect('mongodb://localhost/blogproject')
    .then(() => console.log('connection successful.....!'))
    .catch((err => console.log('unable to connect......!')))    


// setting up server for app
app.listen(port,  ()=> {
    console.log(`server running on ${port}`)
})


