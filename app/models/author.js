const mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
  author_id: String,
  avatar_url: String,
  loginname: String
})
 
module.exports = mongoose.model('Author', AuthorSchema)