const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
  // author: {
  //   avatar_url: String,
  //   loginname: String
  // },
  author_id: String,
  content: String,
  create_at: String,
  good: String,
  id: String,
  // last_reply_at: String,
  // reply_count: String,
  tab: String,
  title: String,
  top: String,
  visit_count: String,
  // is_collect: String,
  // replies: String,
})
 
module.exports = mongoose.model('Article', ArticleSchema)