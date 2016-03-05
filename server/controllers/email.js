'use strict'
require('dotenv').load()
const collections = ['clients']
const randtoken = require('rand-token')
const sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY)
const swig = require('swig')
const bcrypt = require('bcrypt-nodejs')
const db = require('mongojs')(process.env.INDATALY_MONGODB_URL, collections)

module.exports = {
  index: {
    handler: (request, reply) => {

      let email = request.payload.email

      db.clients.find({
        email: email
      }).limit(1, function (err, result) {
        if (err) console.log(err)
        if (result.length === 1) {
          // if user already exists, just re-send email
          swig.renderFile(appRoot + '/server/views/set_password.html', {
            hash: result[0].client_id
          }, function (err, content) {
            if (err) console.log(err)

            sendgrid.send({
              to: email,
              from: 'noreply@indataly',
              fromname: 'indataly',
              subject: 'Set your password',
              html: content
            }, function (err, json) {
              if (err) {
                console.error(err)
              }
              return reply.redirect('/thankyou')
            })

          })

        } else {
          // if user doesn't exist, save user and send email
          let hash = randtoken.generate(15)
          db.clients.save({
            email: email,
            subscriber: 'no',
            client_id: hash,
            client_name: '',
            account_expires: '',
            websites: 0,
            password: ''
          }, function () {
            swig.renderFile(appRoot + '/server/views/set_password.html', {
              hash: hash
            }, function (err, content) {
              if (err) console.log(err)

              sendgrid.send({
                to: email,
                from: 'noreply@indataly',
                fromname: 'indataly',
                subject: 'Set your password',
                html: content
              }, function (err, json) {
                if (err) {
                  console.error(err)
                }
                return reply.redirect('/thankyou')
              })

            })
          })
        }
      })

    }
  }
}