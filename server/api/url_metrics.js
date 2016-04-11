const Mozscape = require('mozscape').Mozscape
const moz = new Mozscape(process.env.MOZ_ACCESS_ID, process.env.MOZ_SECRET_KEY)
module.exports = {
  index: {
    handler: (request, reply) => {
      moz.urlMetrics(request.query.url, ['title', 'url', 'links', 'Authority'], function (err, res) {
        if (err) {
          console.log(err)
          return
        }
        reply(res)
      })
    }
  }
}
