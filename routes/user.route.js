const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, validate} = require('../models/user.model')
const auth = require('../middleware/auth.mw')
const express = require('express')
const req = require('express/lib/request')
const router = express.Router()


router.get('/me', auth, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password')
})


router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({email: req.body.email})

    if(user){
        return res.status(400).send('email already in use.....')
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    const token = user.generateAuthToken()
       
    res.header('x-auth-token', token).send( _.pick(user, ['name', 'email', 'id']))
})

module.exports = router

