const express = require('express')
const app = express()
const port = 3000

// routes
const home_route = require('./routes/home.route')
const blog_route = require('./routes/blog.route')

app.use('/', home_route)
app.use('/api/blog', blog_route)

app.listen(port,  ()=> {
    console.log(`server running on ${port}`)
})


