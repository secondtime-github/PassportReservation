

const notifyLINE = () => {
const msg = "Get Ready ? Go !"
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


notifyLINE();