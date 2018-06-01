var express = require('express');
var request =require('request')
var router = express.Router();
const appKey = "72d77b4a";
const secret = "44e7464a4df7443a8798d8c42661c606";
const opUserUuid = "0be83d40695011e7981e0f190ed6d2e7";
const crypto = require('crypto');
var hash = crypto.createHash('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var params = {appkey: appKey,time: new Date().getTime(),opUserUuid:opUserUuid,pageNo:1,pageSize:400}
  // var url = '/openapi/service/base/user/getDefaultUuid'
  var url = '/openapi/service/vss/res/getCameras'
  var temp = url + JSON.stringify(params) + secret
  hash = crypto.createHash('md5');
  hash.update(temp)
  console.log(params)
  var token = hash.digest('hex')
  console.log(token)
  // getIP();
  request({url:'http://10.0.0.30/openapi/service/vss/res/getCameras?token='+token,
    method:"POST",
    json:true,
    body:params
  },function(error,response,body){
    console.log(response)
    console.log(body)
    var temp2 = ''
    body.data.list.forEach(function(item){
      temp2 = temp2 + item.encoderUuid+","
    })
    temp2 = temp2.substr(0,temp2.length-2)
    getIPByUUID(temp2,body.data.list)
    // res.render('index', { title: res });
  })
});
function getIPByUUID(uuids,listData){
  console.log("11")
  var params =  {"appkey": appKey,"time": new Date().getTime(),"opUserUuid":opUserUuid,"pageNo":1,"pageSize":400,"encoderUuids":uuids}
  var url = '/openapi/service/vss/res/getEncoderDevicesByUuidsEx'
  var temp = url + JSON.stringify(params) + secret
  var hash = crypto.createHash('md5');
  hash.update(temp)
  var token = hash.digest('hex')
  console.log(token)
  request({url:'http://10.0.0.30/openapi/service/vss/res/getEncoderDevicesByUuidsEx?token='+token,
    method:"POST",
    json:true,
    body:params
  },function(error,response,body){
    console.log(response)
    console.log(body)
    var temp = {}
    body.data.forEach(function(item){
      var temp1 = []
      listData.forEach(function(item1){
        if(item1.encoderUuid == item.encoderUuid){
          temp1.push(item1.cameraUuid)
        }
      })
      temp[item.encoderName] = temp1
    })
    console.log(temp)
    res.render('index', { title: temp });
  })
}
function getIP(){
  console.log("11")
  var params =  {"appkey": appKey,"time": new Date().getTime(),"opUserUuid":opUserUuid,"pageNo":1,"pageSize":400}
  var url = '/openapi/service/vss/res/getEncoderDevicesEx'
  var temp = url + JSON.stringify(params) + secret
  var hash = crypto.createHash('md5');
  hash.update(temp)
  var token = hash.digest('hex')
  console.log(token)
  request({url:'http://10.0.0.30/openapi/service/vss/res/getEncoderDevicesEx?token='+token,
    method:"POST",
    json:true,
    body:params
  },function(error,response,body){
    console.log(response)
    console.log(body)
    // res.render('index', { title: res });
  })
}
module.exports = router;

// 1:Object {encoderUuid: "4b0baf4abba447d681b1a8432cca1847", encoderName: "Network Video Recorder", encoderModel: 134742528, …}
// alarmIn:0
// alarmOut:0
// devType:2214
// encoderIp:"10.1.129.30"
// encoderModel:134742528
// encoderName:"Network Video Recorder"
// encoderPort:8000
// encoderUserName:"admin"
// encoderUuid:"4b0baf4abba447d681b1a8432cca1847"
// orderNum:null
// resAuths:"1,2"
// smartSupport:0
// smartType:""
// unitUuid:"1048576"
// updateTime:0
// visIntercomChanNum:null
// {
//     "errorCode":0,
//     "errorMessage":null,
//     "data":{
//         "total":6,
//         "pageNo":1,
//         "pageSize":300,
//         "list":[
//             {
//                 "cameraUuid":"5144534efa1442438c97b8815bc8f733",
//                 "cameraName":"IPdome",
//                 "cameraType":0,
//                 "cameraChannelNum":33,
//                 "smartType":"",
//                 "smartSupport":0,
//                 "onLineStatus":1,
//                 "keyBoardCode":"1",
//                 "orderNum":1,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"4b0baf4abba447d681b1a8432cca1847",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             },
//             {
//                 "cameraUuid":"d497f312541d4182bd03052cd74fd8d4",
//                 "cameraName":"IPdome",
//                 "cameraType":0,
//                 "cameraChannelNum":34,
//                 "smartType":"",
//                 "smartSupport":0,
//                 "onLineStatus":1,
//                 "keyBoardCode":"2",
//                 "orderNum":2,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"4b0baf4abba447d681b1a8432cca1847",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             },
//             {
//                 "cameraUuid":"74c6949e8f084988a03ee332f50c0809",
//                 "cameraName":"IPCamera 03",
//                 "cameraType":0,
//                 "cameraChannelNum":35,
//                 "smartType":"",
//                 "smartSupport":0,
//                 "onLineStatus":0,
//                 "keyBoardCode":"3",
//                 "orderNum":3,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"4b0baf4abba447d681b1a8432cca1847",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             },
//             {
//                 "cameraUuid":"f4727a283903487692653216dad3ea42",
//                 "cameraName":"IPCamera 04",
//                 "cameraType":0,
//                 "cameraChannelNum":36,
//                 "smartType":"",
//                 "smartSupport":0,
//                 "onLineStatus":0,
//                 "keyBoardCode":"4",
//                 "orderNum":4,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"4b0baf4abba447d681b1a8432cca1847",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             },
//             {
//                 "cameraUuid":"e325d10e12524e6f8a9594b23aa99960",
//                 "cameraName":"通道一",
//                 "cameraType":0,
//                 "cameraChannelNum":1,
//                 "smartType":null,
//                 "smartSupport":0,
//                 "onLineStatus":0,
//                 "keyBoardCode":null,
//                 "orderNum":49,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"34020000001320000100",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             },
//             {
//                 "cameraUuid":"9a3ca66a44af4416ae2ce41c6dc35ae3",
//                 "cameraName":"通道二",
//                 "cameraType":0,
//                 "cameraChannelNum":2,
//                 "smartType":null,
//                 "smartSupport":0,
//                 "onLineStatus":0,
//                 "keyBoardCode":null,
//                 "orderNum":50,
//                 "updateTime":0,
//                 "unitUuid":"1048576",
//                 "regionUuid":"9336a148122e401e8ac237be9d3d105f",
//                 "encoderUuid":"34020000001320000100",
//                 "resAuths":"1,
//                 2,
//                 4,
//                 8,
//                 16,
//                 32,
//                 64,
//                 128"
//             }
//         ]
//     }
// }
