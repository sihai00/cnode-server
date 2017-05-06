const common = require('./common.js')
const mongoose = require('mongoose')
const ArticleModel = require('../models/article.js')
const AuthorModel = require('../models/author.js')
const CommentModel = require('../models/comment.js')

let loginname = ''
let avatar_url = ''
// 获取用户信息
exports.author = async (ctx) => {
  loginname = ctx.params.loginname

  let data = await common.getData({
    url: '/user/' + loginname,
  })
  // 清除数据
  await AuthorModel.remove()
  // 存储数据
  if (data && data.success) {
    let res = data.data
    avatar_url = res.avatar_url

    let author = await AuthorModel.findOne({
      loginname: loginname
    })
    if (author) {
      author.update({
        avatar_url: res.avatar_url,
        create_at: res.create_at,
        githubUsername: res.githubUsername,
        recent_replies: res.recent_replies,
        recent_topics: res.recent_topics,
        score: res.score
      })
    }else{
      let author = await new AuthorModel({
        loginname: loginname,
        avatar_url: res.avatar_url,
        create_at: res.create_at,
        githubUsername: res.githubUsername,
        recent_replies: res.recent_replies,
        recent_topics: res.recent_topics,
        score: res.score
      }).save()
    }
    // ctx.session.loginname = loginname
    // ctx.session.avatar_url = res.avatar_url
    // ctx.session.create_at = res.create_at
    // ctx.session.githubUsername = res.githubUsername
    // ctx.session.score = res.score
  }else{
    console.log(data.message)
  }

  // 获取数据
  let author = await AuthorModel.findOne({
    loginname: ctx.params.loginname
  }).lean()
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.body = {
    success: true,
    data: author
  }
}
// 验证accesstoken
exports.verifyUser = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  // 处理预请求
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.response.status = 204
    return
  }
  // 验证accesstoken
  let data = await common.postData('/accesstoken', ctx.request.body)
  loginname = data.loginname
  avatar_url = data.avatar_url

  if (data.statusCode) {
    // 验证失败
    ctx.response.status = 401
    ctx.body = {
      success: false,
      message: data.body
    }
  }
  // 验证成功
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = data
}
// 点赞
exports.setUps = async (ctx) => {
  console.log(ctx.method, 'method')
  ctx.set('Access-Control-Allow-Origin', '*')
  // 处理预请求
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.response.status = 204
    return
  }
  // 验证
  let data = await common.postData(`/reply/${ctx.params.reply_id}/ups`, ctx.request.body)
  if (data.statusCode) {
    // 失败
    ctx.response.status = data.statusCode
    ctx.body = {
      success: false,
      message: data.body
    }
  }
  // 成功
  ctx.body = data
}
// 评论
exports.setComment = async (ctx) => {
  console.log(ctx.method, 'method')
  ctx.set('Access-Control-Allow-Origin', '*')
  // 处理预请求
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.response.status = 204
    return
  }
  // 验证
  let data = await common.postData(`/topic/${ctx.params.topic_id}/replies`, ctx.request.body)
  if (data.statusCode) {
    // 失败
    ctx.response.status = data.statusCode
    ctx.body = {
      success: false,
      message: data.body
    }
  }
  // 利用session 记录登陆状态的用户（author_id,avatar_url,loginname）
  // 组合评论消息json，储存进mongo数据库
  // 查找数据库
  // 返回给浏览器

  // 存储评论数据
  console.log(data.reply_id, 'data')
  let a = await new CommentModel({
    author: {
      avatar_url: avatar_url,
      loginname: loginname
    },
    content: ctx.request.body.content,
    create_at: new Date(),
    id: data.reply_id,
    is_uped: false,
    reply_id: ctx.request.body.reply_id,
    ups: [],
    article_id: ctx.params.topic_id
  }).save()
  
  let comment = await CommentModel.findOne({
    id: data.reply_id
  })

  // 成功
  if (comment) {
    ctx.body = {
      success: true,
      data: comment
    }
  }
}