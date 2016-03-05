// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load()

module.exports = {
  landing: {
    handler: function (request, reply) {
      reply.view('landing', {
        title: 'welcome'
      })

    },
    app: {
      name: 'index'
    }
  },
  missing: {
    handler: function (request, reply) {
      reply.view('404', {
        title: 'You found a missing page, but won the 404 error!'
      }).code(404)
    },
    app: {
      name: '404'
    }
  }
}