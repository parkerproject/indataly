'use strict'
require('dotenv').load()
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)
module.exports = function (email, subject, content) {
  sendgrid.send({
    to: email,
    from: 'hello@indataly.com',
    fromname: 'INDATALY',
    subject: subject,
    html: content
  }, function (err, json) {
    if (err) console.log(err)
    console.log(json)
  })
}
