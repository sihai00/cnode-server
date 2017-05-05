const Router = require('koa-router')
const common = require('../app/controllers/common.js')
// const artlists = require('../app/controllers/artlists.js')
const article = require('../app/controllers/article.js')
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

router.get('/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page!'
})

module.exports = router;