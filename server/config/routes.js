/**
 * Dependencies.
 */
'use strict'
const requireDirectory = require('require-directory')
module.exports = function (server) {
  // Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
  const controller = requireDirectory(module, '../controllers')
  const api = requireDirectory(module, '../api')
  // Array of routes for Hapi
  const routeTable = [{
    method: 'GET',
    path: '/{path*}',
    config: controller.base.missing
  }, {
    method: 'GET',
    path: '/partials/{path*}',
    config: controller.assets.partials
  }, {
    method: 'GET',
    path: '/images/{path*}',
    config: controller.assets.images
  }, {
    method: 'GET',
    path: '/css/{path*}',
    config: controller.assets.css
  }, {
    method: 'GET',
    path: '/pages/{path*}',
    config: controller.assets.pages
  }, {
    method: 'GET',
    path: '/assets/{path*}',
    config: controller.assets.assets
  }, {
    method: 'GET',
    path: '/fonts/{path*}',
    config: controller.assets.fonts
  }, {
    method: 'GET',
    path: '/js/{path*}',
    config: controller.assets.js
  }, {
    method: 'GET',
    path: '/bower_components/{path*}',
    config: controller.assets.bower
  }, {
    method: 'GET',
    path: '/',
    config: controller.base.landing
  }, {
    method: 'GET',
    path: '/setpassword/{token}',
    config: controller.index.set_password
  }, {
    method: 'POST',
    path: '/setpassword',
    config: controller.index.set_password
  }, {
    method: 'POST',
    path: '/email',
    config: controller.email.index
  }, {
    method: 'GET',
    path: '/api/domain',
    config: api.domain.index
  }, {
    method: 'GET',
    path: '/api/rank',
    config: api.google_page_rank.index
  }, {
    method: 'GET',
    path: '/api/urlmetrics',
    config: api.url_metrics.index
  }, {
    method: 'GET',
    path: '/api/engine',
    config: api.engine.index
  }, {
    method: 'GET',
    path: '/register',
    config: controller.register.index
  }, {
    method: 'GET',
    path: '/login',
    config: controller.login.index
  }, {
    method: 'POST',
    path: '/payment',
    config: controller.payment.index
  }, {
    method: 'GET',
    path: '/thankyou',
    config: controller.base.thankyou
  }]
  return routeTable
}
