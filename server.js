const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const path = require('path')
// var Hapi_auth = require('hapi-auth-cookie')
// var HapiSwagger = require('hapi-swagger')
// var swaggerOptions = {
//   apiVersion: '1.0.0'
// }
const server = new Hapi.Server()
server.connection({
  host: '0.0.0.0',
  port: 3000
})
// Require the routes and pass the server object.
const routes = require('./server/config/routes')(server)

global.appRoot = path.resolve(__dirname)

// Export the server to be required elsewhere.
module.exports = server

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
// require('./server/config/plugins')(server)

server.register([Inert, Vision], (err) => {
  if (err)console.log(err)
  server.views({
    path: './server/views',
    engines: {
      html: require('swig')
    }
  })

  // server.auth.strategy('session', 'cookie', {
  //   password: 'dancingtomorrow',
  //   cookie: 'sid-indataly',
  //   redirectTo: '/login',
  //   isSecure: false,
  //   ttl: 15 * 60 * 60 * 1000
  // })
  server.route(routes)
  server.start(() => {
    console.log('Server started at: ' + server.info.uri)
  })
})
