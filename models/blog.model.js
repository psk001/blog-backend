//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const blog_schema = mongoose.Schema;

const blog = new blog_schema({
  title: String,
  body: String,
  created: {
        type: Date,
        default: Date.now
  },
  updated: {
        type: Date,
        default: Date.now
  }, 
});

module.exports = blog;

