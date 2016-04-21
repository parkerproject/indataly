'use strict'
require('dotenv').load()
const collections = ['clients']
const mongojs = require('mongojs')
const db = mongojs(process.env.INDATALY_MONGODB_URL, collections)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const sendEmail = require('./send_email')
module.exports = {
  index: {
    handler: function (request, reply) {
      let customer = {
        email: request.payload.email,
        source: request.payload.id,
        plan: 'Basic'
      }
      stripe.customers.create(customer, function (err, customer) {
        if (err) console.log(err)
        if (customer) {
          let client = {
            subscriber: 'yes',
            stripe_id: customer.id,
            email: request.payload.email,
            website: request.payload.website,
            fullname: request.payload.fullname
          }
          db.clients.save(client, () => {
            let subject = 'A new client'
            let content = `
            <html>
            <body>
            <p>A new client has paid</p>
            <strong>Name</strong>: ${request.payload.fullname}<br />
            <strong>Email</strong>: ${request.payload.email}<br />
            <strong>Website</strong>: ${request.payload.website}
            </body>
            </html>
            `
            sendEmail(process.env.ADMIN_EMAIL, subject, content)
            reply('success')
          })
        }
      })
    }
  }
}
