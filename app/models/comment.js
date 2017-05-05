const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  article_id: String,
  replies: Array,
  reply_count: String
})
 
module.exports = mongoose.model('Comment', CommentSchema)