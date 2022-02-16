const mongoose = require('mongoose');
const blog = require('./blog.model');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const author_schema = mongoose.Schema;

const author = new author_schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        trim: True,
        lowercase: True,
        unique: True,
        required: True, //'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
         
    }
})

module.exports = blog

