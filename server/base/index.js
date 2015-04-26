var randtoken = require('rand-token');
var token = randtoken.generate(5);

// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function (server, options, next) {

    server.route([{
            method: 'GET',
            path: '/about',
            config: {
                handler: function (request, reply) {
                    reply.view('about', {
                        title: 'Super Informative About Page'
                    });
                },
                id: 'about'
            }
    }, {
            method: 'GET',
            path: '/',
            config: {
                handler: function (request, reply) {
                    // Render the view with the custom greeting
                    reply.view('landing', {
                        title: 'Awesome Boilerplate Homepage'
                    });
                },
                id: 'index'
            }
    }, {
            method: 'GET',
            path: '/{path*}',
            config: {
                handler: function (request, reply) {
                    reply.view('404', {
                        title: 'Total Bummer 404 Page'
                    }).code(404);
                },
                id: '404'
            }
    },
        {
            method: 'POST',
            path: '/process_email',
            config: {
                handler: function (request, reply) {
                    var data = {
                        user_email: request.payload.user_email,
                        user_name: request.payload.user_name,
                        user_referral: request.payload.user_referral
                    };
                    console.log(data);
                    reply({
                        type: 'success',
                        url: 'http://indataly.com/app/' + token
                    });
                },
                id: 'process_email'
            }
    }]);

    next();
}

exports.register.attributes = {
    name: 'base'
};