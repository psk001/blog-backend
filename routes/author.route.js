const express = require('express')
const router = express.Router()
const Author = require('../models/author.model')

router.get('/', async (req, res) => {
    const authors = await Author.find()
    res.send(authors)
})
 

router.post('/', async (req, res) => {
    let author = new Author({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })

    author = await author.save()

    res.send(author)
})


module.exports = router
