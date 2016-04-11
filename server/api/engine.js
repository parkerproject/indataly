'use strict'
require('dotenv').load()
const axios = require('axios')
let parkerituk = {
  'name': 'parkerituk.com'
}
let competitors = {
  'name': 'test.com'
}
let google = {
  'name': 'google',
  'country': 'US',
  'location': 'San Francisco, CA',
  'language': 'en'
}
let keywords = {
  'name': 'seo optimization',
  'index': 3
}
let inputs = {
  'keywords': [keywords],
  'searchengines': [google],
  'websites': [parkerituk, competitors]
}
module.exports = {
  index: {
    handler: (request, reply) => {
      let project_name = encodeURIComponent(request.query.project_name)
      let base_url = `${process.env.ENGINE_LINK}&project_name=${project_name}`
      axios.post(base_url, {
        inputs: inputs
      }).then(function (response) {
        reply(response)
      })
    }
  }
}
