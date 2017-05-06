const Router = require('koa-router')
const common = require('../app/controllers/common.js')
const article = require('../app/controllers/article.js')
const author = require('../app/controllers/author.js')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.bodu = 'hello koa2'
})

router.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
})

// 获取列表数据
router.get('/topics', article.artlists)
router.get('/topic/:id', article.article)
router.get('/user/:loginname', author.author)
router.options('/accesstoken', author.verifyUser)
router.post('/accesstoken', author.verifyUser)

router.options('/reply/:reply_id/ups', author.setUps)
router.post('/reply/:reply_id/ups', author.setUps)

router.options('/topic/:topic_id/replies', author.setComment)
router.post('/topic/:topic_id/replies', author.setComment)

router.get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

module.exports = router;