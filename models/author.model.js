// require mongoose 
const mongoose = require('mongoose');

// email validation function
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}


const Author = mongoose.model('Author', new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true, //'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
         
    }
}))

module.exports = Author

