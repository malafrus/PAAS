const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const port = 3000
const subscriptions = [];

let sub = {"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABlLEqcdV_uzgMTVT_jiuspXj_traqYTzkn66oq3qm8uRAbst4D0ERWHXF1UlZ4OG3fW5XSK94ZfInPVW6NsPcLbvCqi54Mz8BDAF9QxqSEo5P_RSlNk5H8q8-ZjtliNOIkLSiE3TqpiHhwRjeLPQNEKlkT4Om9roVdtmX8M16cb4h8HlA","expirationTime":null,"keys":{"auth":"k5dm0VDhtZnXQxj3zeSb-g","p256dh":"BIKof3oAsVl5D-KA1W49VHLaiQWYSsHHnrNBl0IMeCcgEFOCzvmgB_1hbLn4FUi5a5fQrFFoynpGrYHJO3oRriw"}}
let WEBPSUH_VAPIDKEY = {
  publickey: 'BIwMDxNTmnMU-7tDxZHOSq3f53OANhNtBruKDDJ73PuSchmDaNYGlsHaUD3SqxW0TgzC5afmfYHzJLmCqFsyz1c',
  privatekey: 'k--NfGIWfePbc3DhkebMu687mf-W_QzrTdyctDxnWd8'
}

webpush.setVapidDetails("mailto:loictrochon2001@gmail.com", WEBPSUH_VAPIDKEY.publickey, WEBPSUH_VAPIDKEY.privatekey);

app.use(bodyParser.json());
app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Push server start on port  ${port}`)
  })


app.get("/", (req, res) => {
  res.send("Push App!")
})

app.post("/subscribe", (req, res) => {
  const subscription = req.body.subscibe;
  let unique = true;
  subscriptions.forEach((sub) => {
    if(sub.endpoint==subscription.endpoint){
      unique=false;
    }
  })
  if(unique)
  {
    subscriptions.push(subscription)
    console.log(subscription.endpoint)
  }
  unique=true;
  res.status(201).json({});

})

app.get("/sendnotif", (req, res) => {
  subscriptions.forEach((sub) => {
    webpush.sendNotification(sub, "Test");
  })
})