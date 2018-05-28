var express = require('express');
var http =require('http')
var router = express.Router();
const appKey = "72d77b4a";
const secret = "44e7464a4df7443a8798d8c42661c606";
const crypto = require('crypto');
const hash = crypto.createHash('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var params = {appkey: appKey,time: new Date().getTime()}
  var url = '/openapi/service/base/user/getDefaultUuid'
  var temp = url + JSON.stringify(params) + secret
  params.token = hash.update(temp)
  var option = {hostname: '10.0.0.30',port:80,path:url,method:'POST',data:params}
  http.request(option,function(res){
    console.log(res)
  })
});

module.exports = router;
