const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const router = require('./config/routes')
const mongoose = require('mongoose')

// 链接mongodb数据库
mongoose.connect('mongodb://localhost/cnode-server')
// 指定mongo的promise为原生promise
mongoose.Promise = global.Promise;
// 链接后状态
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('mongodb success')
})

app.use(logger())
app.use(bodyparser())
app.use(session(app))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('[demo] cookie is starting at port 3000')