'use strict'
require('dotenv').load()
const awis = require('awis')
const client = awis({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
})
module.exports = {
  index: {
    handler: (request, reply) => {
      client({
        'Action': 'UrlInfo',
        'Url': request.query.url,
        'ResponseGroup': 'Related,TrafficData,ContentData'
      }, (err, data) => {
        if (err) console.log(err)
        reply(data)
      })
    }
  }
}
