const _ = require('lodash')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user.model')
const express = require('express')
const router = express.Router()

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
   
    res.send( _.pick(user, ['name', 'email', 'id']))
})

module.exports = router


