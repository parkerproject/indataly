'use strict'
require('dotenv').load()
const collections = ['clients']
const mongojs = require('mongojs')
const db = mongojs(process.env.INDATALY_MONGODB_URL, collections)
const sendEmail = require('./send_email')

module.exports = {
  index: {
    handler: (request, reply) => {
      let client = {
        subscriber: 'no',
        stripe_id: '',
        email: request.payload.email,
        website: request.payload.website,
        fullname: request.payload.fullname,
        date_joined: new Date().toISOString()
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
        return reply.redirect('/thankyou')
      })
    }
  }
}
