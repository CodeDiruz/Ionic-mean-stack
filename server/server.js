// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
var bodyParser = require('body-parser');
var Bear       = require('./app/models/bear');
var Profile       = require('./app/models/profile');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Iganiq8o'); // connect to our database
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

router.route('/bears/:bear_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            Bear.findById(req.params.bear_id, function(err, bear) {
                if (err)
                    res.send(err);
                res.json(bear);
            });
        })
     // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

  router.route('/profiles')
        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function(req, res) {

            var profile = new Profile();      // create a new instance of the Bear model
            profile.rut = req.body.rut;  // set the bears name (comes from the request)
            profile.name = req.body.name;
            profile.last_name = req.body.last_name;
            profile.full_name = req.body.full_name;
            profile.type_profile = req.body.type_profile;
            profile.token = req.body.token;

            // save the bear and check for errors
            profile.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Profile created!' });
            });

        })
        .get(function(req, res) {
            Profile.find(function(err, profiles) {
                if (err)
                    res.send(err);

                res.json(profiles);
            });
        });

    router.route('/profiles/:profile_id')

            // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
            .get(function(req, res) {
                Profile.findById(req.params.profile_id, function(err, profile) {
                    if (err)
                        res.send(err);
                    res.json(profile);
                });
            })
         // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req, res) {

            // use our bear model to find the bear we want
            Profile.findById(req.params.bear_id, function(err, profile) {

                if (err)
                    res.send(err);

                profile.rut = req.body.rut;  // update the bears info
                profile.name = req.body.name;
                profile.last_name = req.body.last_name;
                profile.full_name = req.body.full_name;
                profile.type_profile = req.body.type_profile;
                profile.token = req.body.token;

                // save the bear
                profile.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Profile updated!' });
                });

            });
        })
        // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function(req, res) {
            Profile.remove({
                _id: req.params.profile_id
            }, function(err, profile) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
