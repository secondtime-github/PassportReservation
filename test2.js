const notifyLINE = (msg) => {
    var unirest = require('unirest');
    unirest('POST', 'https://notify-api.line.me/api/notify?message=' + msg)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ephkosbnvCTRQ7m9FFDo4i0a5DymUBypczzPUX9Xir6'
        })
        .end(function (res) {
            if (res.error) throw new Error(res.error);
            console.log(res.raw_body);
        });
}

const ifttt = (msg) => {
    var unirest = require('unirest');
unirest('GET', 'https://maker.ifttt.com/trigger/pass/with/key/cbkRww46F2vS38EvGluMZ3')
  .headers({
    'Content-Type': 'application/json'
  })
  .send(JSON.stringify({
    "value1": "ok",
    "value2": msg,
    "value3": ""
  }))
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body);
  });

}


function show(res) {
    console.log(res.raw_body);
    const data = JSON.parse(res.body);
    const status = data.status;
    console.log(status);
    if(status != -1) {
        console.log("send msg to LINE");
        //notifyLINE("Get Ready ? Go !");
        ifttt("Get Ready ? Go !");
    } else {
        console.log("NOT send msg to LINE");
        //notifyLINE("Sorry ! Not Ready Yet");
        ifttt("Sorry ! Not Ready Yet");
    }
}


const getInfo = (callback) => {

    var unirest = require('unirest');
    unirest('GET', 'https://ppt.mfa.gov.cn/appo/service/reservation/data/getIsreservation.json?timeStamp=' + new Date().getTime() + '&orgID=JPNA')
  .headers({
    'Cookie': 'JSESSIONID=1g87udo89a3axoatxqd3joh5e; pcxSessionId=904d78f7-689e-4e12-a48c-e32140aaa2c1; tgw_l7_route=0fb11371c098ba3c3c183a3ceced03fc'
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    callback(res);
  });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  }
  
async function sendRequest() {

    while(true) {
        var interval = getRandomIntInclusive(2000, 4000) * 700;
        console.log('Taking a break...' + interval);
        await sleep(interval);
        getInfo(show);
        await sleep(interval);
    }
  }
  
  
sendRequest();
  
