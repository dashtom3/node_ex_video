var express = require('express');
var request =require('request')
var router = express.Router();
const appKey = "72d77b4a";
const secret = "44e7464a4df7443a8798d8c42661c606";
const crypto = require('crypto');
var hash = crypto.createHash('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var params = {appkey: appKey,time: new Date().getTime()}
  var url = '/openapi/service/base/user/getDefaultUuid'
  var temp = url + JSON.stringify(params) + secret
  hash = crypto.createHash('md5');
  hash.update(temp)
  // params.token = hash.digest('hex')
  // var option = {hostname: '10.0.0.30',port:80,path:url,method:'POST',data:params}
  // console.log(option)
  console.log(params)
  request({url:'http://10.0.0.30/openapi/service/base/user/getDefaultUuid?token='+hash.digest('hex'),
    method:"POST",
    json:true,
    body:JSON.stringify(params)
  },function(error,response,body){
    console.log(response)
    console.log(body)
    // res.render('index', { title: res });
  })
  // request.post({url:'http://10.0.0.30/openapi/service/base/user/getDefaultUuid?token='+hash.digest('hex'),
  //   form:params
  // },function(error,response,body){
  //   console.log(response)
  //   console.log(body)
  //   // res.render('index', { title: res });
  // })
});

module.exports = router;
