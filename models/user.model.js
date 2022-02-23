const Joi = require('joi')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isAdmin: {
        type: Boolean
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, 'private') //config.get('jwtPrivateKey')
    return token
}

const User = new mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().min(6).max(255).required()
    }

    return Joi.validate(user, schema)
}

exports.User=User
exports.validate = validateUser
