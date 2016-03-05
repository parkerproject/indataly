// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV
module.exports = {
  development: {
    // js: ['js/jquery.min.js', 'js/bootstrap.min.js', 'js/jquery.nicescroll.js', 'js/wow.js', 'js/script.js'],
    css: ['css/animate', 'css/preloader.css', 'css/bsqs.css', 'css/style.css']
  },
  production: {
    js: ['js/app.js'],
    css: ['css/app.css']
  }
}