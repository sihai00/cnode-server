const common = require('./common.js')
const mongoose = require('mongoose')
const ArticleModel = require('../models/article.js')
const AuthorModel = require('../models/author.js')
const CommentModel = require('../models/comment.js')

exports.article = async (ctx)=>{
  let data = await common.getData({
    url: '/topic/' + ctx.params.id,
    mdrender: ctx.query.mdrender || false
  })
  // 清除数据
  await CommentModel.remove()
  // 存储数据
  if (data && data.success) {
    let res = data.data
    
    await new CommentModel({
      article_id: res.id,
      replies: res.replies,
      reply_count: res.reply_count
    }).save()
  }else{
    console.log(data.message)
  }

  // 获取数据
  let comment = await CommentModel.findOne({
    article_id: ctx.params.id
  }).lean()
  let article = await ArticleModel.findOne({
    id: ctx.params.id
  }).lean()
  let author = await AuthorModel.findOne({
    author_id: article.author_id
  }).lean()
  article.author = {
    avatar_url: author.avatar_url,
    loginname: author.loginname
  }
  article.replies = comment.replies
  article.reply_count = comment.reply_count

  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    success: true,
    data: article
  }
}

exports.artlists = async (ctx) =>{
  // 获取请求数据
  let data = await common.getData({
    url: '/topics',
    limit: ctx.query.limit || 20,
    tab: ctx.query.tab || 'all',
    page: ctx.query.page || '1',
    mdrender: ctx.query.mdrender || 'false'
  })
  // 清除mongodb数据
  await ArticleModel.remove()
  await AuthorModel.remove()
  // 存储mongodb数据
  if (data && data.success) {
    let res = data.data;
    let author = [];
    // 存储到articles表
    await ArticleModel.create(res,  (err) => {
      if (err){
        console.log(err,'ArticleModel.create error')
        return
      }
    })
    // 重组数据
    for (let i = 0; i < res.length; i++) {
      res[i]
      if (res[i].author) {
        author.push({
          author_id: res[i].author_id,
          avatar_url: res[i].author.avatar_url,
          loginname: res[i].author.loginname
        })
      }
    }
    // 存储到author表
    await AuthorModel.create(author, (err) => {
      if (err){
        console.log(err,'AuthorModel.create error')
        return
      }
    })
  }else{
    console.log(data.message)
  }

  // 从mongodb获取数据
  let artlists = '';
  let author = '';
  // 查询出来的数据不能修改，所以需要lean
  artlists = await ArticleModel.find().lean()
  for (let i = 0; i < artlists.length; i++) {
    if (artlists[i].author_id) {
      author = await AuthorModel.findOne({
        author_id: artlists[i].author_id
      })
      artlists[i]['author'] = {
        avatar_url: author.avatar_url,
        loginname: author.loginname
      }
    }
  }
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    success: true,
    data: artlists
  }
}