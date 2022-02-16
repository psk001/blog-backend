const express = require('express')
const route = express.Router()

route.get("/", (req, res) => {
    res.status(200).send('Hello World !')
})

module.exports = route