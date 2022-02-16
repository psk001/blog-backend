const express = require('express')
const app = express()
const port = 3000
const home_route = require('./routes/home.route')

app.use('/', home_route)

app.listen(port,  ()=> {
    console.log(`server running on ${port}`)
})


