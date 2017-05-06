const request = require('request-promise')
const url = ' http://cnodejs.org/api/v1'

exports.getData = (query) => {
  if (!query.url) {
    console.log('get请求url必须')
    return
  }
  let str = [];
  for(let i in query){
    if (i !== 'url') {
      str.push(`${i}=${query[i]}`)
    }
  }

  return request.get(`${url}${query.url}?${str.join('&')}`).then((res)=>{
    if (res) {
      return JSON.parse(res);
    }
  }).catch((e) => {
    return e
  })
}

exports.postData = (query, body) => {
  console.log(url + query,'url')
  if (!query || !body) {
    consol.log('缺少必要参数')
    return
  }

  return request.post(url + query, {form: body}).then((res)=>{
    if (res) {
      return JSON.parse(res);
    }
  }).catch((e) => {
    return e
  })
}
