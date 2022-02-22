const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.mw')
 
// require blog model
const Blog = require('../models/blog.model')


// get route 
router.get('/', async (req, res) => {
    const blogs = await Blog.find()
    res.send(blogs)
})


// post route
router.post('/', auth, async (req, res) => {
    let blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })

    blog = await blog.save()

    res.send(blog)
})

// exports
module.exports = router

