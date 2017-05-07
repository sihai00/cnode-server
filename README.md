# cnode-server
把koa2作为中间层，对cnode社区公开的api数据进行组合操作后存入mongodb中，再返回处理后的数据。\
目的主要还是为了上手koa2和mongodb（如果你看了我的代码后会发现，实际开发中是没必要像我这样把请求到的数据存入数据库后再原样拿出来的傻逼操作哈哈。\

![image](https://github.com/sihai00/cnode-server/blob/master/cnode-server.png)\
把node作为中间层是为了更好的前后端解耦。一般都会对请求回来的数据做一定的组装，前端可以按需求组装，后端大大不用考虑前端的业务部分而专注于数据的处理和服务器的性能，如下盗图\

## Build Setup
``` bash
<!-- 安装mongodb数据库（我用的是brew） -->
brew install mongodb

<!-- 在使用前先启动mongodb数据库 -->
mongod --dbpath 你的目录

<!-- 安装项目所需依赖 -->
npm i

<!-- 启用服务器 -->
node index.js
```

关于mongodb的一些操作
```mongo
<!-- 查询mongodb数据库 -->
mongo

<!-- 查询当前数据库中有多少个数据库 -->
show dbs

<!-- 使用的数据库 -->
use cnode-server

<!-- 显示当前数据库有多少集合 -->
show tables

<!-- 查询当前集合的数据(可进行类似jQuery的链式操作limit、skip、sort、update等) -->
db.(tableName).find()
```
## 小坑(CORS)
> 非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）-- 阮一峰
所以对于非简单请求，需要把OPTION的情况也处理
```js
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
```
参考：
[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
[koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)
