const request = require('request-promise')
const url = ' http://cnodejs.org/api/v1'

module.exports.getData = function (query){
  let str = [];
  for(let i in query){
    if (i !== 'url') {
      str.push(`${i}=${query[i]}`)
    }
  }

  return request(`${url}${query.url}?${str.join('&')}`).then((res)=>{
    if (res) {
      return JSON.parse(res);
    }
  }).catch((e) => {
    return e
  })
}