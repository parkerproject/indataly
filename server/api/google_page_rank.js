'use strict'
require('dotenv').load()
const getPageRank = require('pagerank')
module.exports = {
  index: {
    handler: (request, reply) => {
      getPageRank(request.query.url, (error, pageRank) => {
        if (error) {
          console.log(error)
        }
        reply(pageRank)
      })
    }
  }
}
