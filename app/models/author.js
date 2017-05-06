const mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
  author_id: String,
  avatar_url: String,
  loginname: String,
  create_at: String,
  githubUsername: String,
  recent_replies: Array,
  recent_topics: Array,
  score: String
})
 
module.exports = mongoose.model('Author', AuthorSchema)