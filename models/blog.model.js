//Require Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('../models/author.model')

const Blog = mongoose.model('Blog', new mongoose.Schema({
  title: String,
  content: String,
  author: [
      {type: Schema.Types.ObjectId, ref: 'Author'}
    ],

  created: {
        type: Date,
        default: Date.now
  },
  updated: {
        type: Date,
        default: Date.now
  }, 
}))

module.exports = Blog

