const common = require('./common.js')
const mongoose = require('mongoose')
const ArtlistsModel = require('../models/artlists.js')

exports.artlists = async (ctx) =>{
  let artlists = '';
  let res = [];
  // 获取请求数据
  let data = await common.getData({
    url: '/topics',
    limit: ctx.query.limit,
    tab: ctx.query.tab,
    page: ctx.query.page,
    mdrender: ctx.query.mdrender
  })

  // 清除mongodb数据
  await ArtlistsModel.remove();

  // 存储mongodb数据
  if (data && data.success) {
    res = data.data
    await ArtlistsModel.create(res, function (err) {
      if (err){
        console.log(err,'ArtlistsModel.create error')
        return
      }
    });
  }

  // 从mongodb获取数据
  artlists = await ArtlistsModel.find()
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.body = {
    success: true,
    data: artlists
  }
}