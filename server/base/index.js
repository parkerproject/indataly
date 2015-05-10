require('dotenv').load();
var Analytics = require('analytics-node');
var analytics = new Analytics(process.env.SEGMENT_API, {
    flushAt: 1
});
var collections = ['users'];
var db = require("mongojs").connect(process.env.INDATALY_MONGODB_URL, collections);

var randtoken = require('rand-token');



function identify(data) {
    analytics.identify({
        userId: data.user_id,
        traits: {
            name: data.user_name,
            email: data.user_email
        }
    });
}

function track_events(data) {
    analytics.track({
        userId: data.user_id,
        event: 'Early access signup',
        properties: {
            referral: data.referral
        }
    });
}


function saveEmail(data, reply) {
    db.users.save({
        email: data.user_email,
        referral: data.user_referral,
        userId: data.user_id,
        name: data.user_name
    }, function(err, success) {

        if (err) reply('<span class="error">oops! looks like the server failed. Try again</span>');

        if (success) {
            identify(data);
            track_events(data);
            reply({
                status: 2,
                user: data.user_id,
                message: 'Signup successful'
            });
        }

    });

}


// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next) {

    server.route([{
        method: 'GET',
        path: '/confirm',
        config: {
            handler: function(request, reply) {
                reply.view('share', {
                    title: 'Refer a friend and your first month($5) free',
                    user_id: request.query.user
                });
            },
            id: 'about'
        }
    }, {
        method: 'GET',
        path: '/',
        config: {
            handler: function(request, reply) {
                // Render the view with the custom greeting
                reply.view('landing_2', {
                    title: 'SEO made for Everyone - INDATALY'
                });
            },
            id: 'index'
        }
    }, {
        method: 'GET',
        path: '/{path*}',
        config: {
            handler: function(request, reply) {
                // Render the view with the custom greeting
                reply.view('landing_2', {
                    title: 'SEO made for Everyone - INDATALY'
                });
            },
            id: 'misc'
        }
    }, {
        method: 'POST',
        path: '/process_email',
        config: {
            handler: function(request, reply) {
                var data = {
                    user_email: request.payload.user_email,
                    user_name: request.payload.user_name,
                    user_referral: request.payload.user_referral,
                };


                db.users.findOne({
                    email: request.payload.user_email
                }, function(err, result) {
                    if (err) {
                        reply({
                            status: 0,
                            message: 'Signup failed'
                        });
                    }

                    if (result) {
                        console.log(result);

                        reply({
                            status: 1,
                            message: 'You have already submitted your email.',
                            user: result.userId
                        });
                    } else {

                        data.user_id = randtoken.generate(5);
                        saveEmail(data, reply);
                    }
                });
            },
            id: 'process_email'
        }
    }]);

    next();
};

exports.register.attributes = {
    name: 'base'
};