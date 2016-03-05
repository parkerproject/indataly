'use strict'
require('dotenv').load()
const collections = ['users', 'clients']
const randtoken = require('rand-token')
const mandrill = require('node-mandrill')(process.env.MANDRILL)
const swig = require('swig')
const bcrypt = require('bcrypt-nodejs')
const db = require('mongojs')(process.env.INDATALY_MONGODB_URL, collections)

function emailFn(email, content) {
  mandrill('/messages/send', {
    message: {
      to: [{
        email: email
      }],
      from_email: 'noreply@indataly.com',
      subject: 'Set your password',
      html: content
    }
  }, function (error, response) {
    if (error) {
      console.log(JSON.stringify(error))
    } else {
      return reply.redirect('/thankyou')
    }
  })
}

module.exports = {
  set_password: {
    handler: (request, reply) => {

      console.log(request.method)

      if (request.method === 'get') {
        reply.view('complete_registration', {})

      }

      if (request.method === 'post') {
        console.log(request.payload)
          // let client_id = request.params.token
          // db.clients.find({
          //   client_id: client_id,
          //   password: ''
          // }).limit(1, (err, result) => {
          //   if (err) console.log(err)
          //   if (result.length === 1) {
          //     db.clients.update({}, {}, (err, result) => {
          //       reply(result)
          //     })
          //
          //   }
          // })

      }

    }
  },

  thankyou: {
    handler: (request, reply) => {
      reply.view('thank_you', {})
    }
  }
}