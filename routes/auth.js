const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require("jsonwebtoken")
const {User} = require('../models/user.model')
const config = require('config')

 
router.post('/', async (req, res) => {
    // const {error} = validate(req.body)
    // if(error){
    //     return res.status(400).send(error.details[0].message)
    // }

    let user = await User.findOne({email: req.body.email})

    if(!user){
        return res.status(400).send('incorrect email or password..........')
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(400).send('incorrect email or password..........')
    }
    
    const token = jwt.sign({_id: user._id}, 'private') //config.get('jwtPrivateKey')
    res.send(token)

})

// function validate(req){
//     const schema = {
//         email: Joi.string().max(255).required().email(),
//         password: Joi.string().min(6).max(255).required()
//     }

//     return schema.validate(req) // Joi.validate(req, schema)
// } 

module.exports = router


