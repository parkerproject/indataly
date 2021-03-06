// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
  partials: {
    handler: {
      directory: {
        path: './server/views/partials'
      }
    },
    app: {
      name: 'partials'
    }
  },
  images: {
    handler: {
      directory: {
        path: './public/images'
      }
    },
    app: {
      name: 'images'
    }
  },
  css: {
    handler: {
      directory: {
        path: './public/css'
      }
    },
    app: {
      name: 'css'
    }
  },
  assets: {
    handler: {
      directory: {
        path: './public/assets'
      }
    },
    app: {
      name: 'assets'
    }
  },
  pages: {
    handler: {
      directory: {
        path: './public/pages'
      }
    },
    app: {
      name: 'pages'
    }
  },
  fonts: {
    handler: {
      directory: {
        path: './public/fonts'
      }
    },
    app: {
      name: 'fonts'
    }
  },
  js: {
    handler: {
      directory: {
        path: './public/js'
      }
    },
    app: {
      name: 'js'
    }
  },
  bower: {
    handler: {
      directory: {
        path: './public/bower_components'
      }
    },
    app: {
      name: 'bower'
    }
  },
  merchant: {
    handler: {
      directory: {
        path: './public'
      }
    },
    app: {
      name: 'main'
    }
  }
}
