const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.mw')
const admin = require('../middleware/admin.mw')
const asyncMW = require('../middleware/async.mw')
 
// require blog model
const Blog = require('../models/blog.model')


// get route 
router.get('/', async (req, res) => {
    //throw new Error ('could not get blogs')
    const blogs = await Blog.find()
    res.send(blogs) 
})

//  admin,
// post route

router.post('/', auth, asyncMW(async (req, res) => {
   
    let blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })

    blog = await blog.save()

    res.status(200).send('successfuly saved your blog')
}))

// exports
module.exports = router

