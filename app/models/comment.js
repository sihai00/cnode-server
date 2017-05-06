const mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  author:{
    avatar_url: String,
    loginname: String
  },
  content: String,
  create_at: String,
  id: String,// 评论的id
  is_uped: Boolean,
  reply_id: String,// 回复此条评论的id
  ups: Array,
  article_id: String // 文章的id
})
 
module.exports = mongoose.model('Comment', CommentSchema)