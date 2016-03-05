var Hapi = require('hapi')
var Inert = require('inert')
var Vision = require('vision')
var path = require('path')
var Hapi_auth = require('hapi-auth-cookie')
var HapiSwagger = require('hapi-swagger')
var swaggerOptions = {
  apiVersion: '1.0.0'
}
var server = new Hapi.Server()
server.connection({
    host: '0.0.0.0',
    port: 3000
  })
  // Require the routes and pass the server object.
var routes = require('./server/config/routes')(server)

global.appRoot = path.resolve(__dirname)

// Export the server to be required elsewhere.
module.exports = server

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
// require('./server/config/plugins')(server)

server.register([Inert, Vision, Hapi_auth, {
  register: HapiSwagger,
  options: swaggerOptions
}], function (err) {
  server.views({
    path: './server/views',
    engines: {
      html: require('swig')
    }
  })

  server.auth.strategy('session', 'cookie', {
    password: 'dancingtomorrow',
    cookie: 'sid-indataly',
    redirectTo: '/login',
    isSecure: false,
    ttl: 15 * 60 * 60 * 1000
  })
  server.route(routes)
  server.start(function () {
    console.log('Server started at: ' + server.info.uri)
  })
})