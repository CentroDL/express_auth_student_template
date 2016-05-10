var ex = require("express");
var weatherRouter = ex.Router();
var passport      = require('../../lib/passportStrategy.js');
var Weather = require('../../models/weather.js');
var util = require("util");
var path = require("path");
// User = require('../../models/user.js');

weatherRouter.use( passport.authenticate("jwt", {session: false} ) );


weatherRouter.get("/", function(req, res){
  // res.sendFile( path.resolve('client/public/views/weather.html') );
  res.json( req.user.searches );
} );

weatherRouter.post("/", function(req, res){
    console.log('input: ' + util.inspect(req.body.weather))

    Weather.create(req.body.weather, function( err, weather ) {
      console.log("output: " + weather);
      if (err) { res.status(500).json(err) }
        req.user.searches.push(weather);
        req.user.save(function(err){
          console.log(err);
        });
        res.json( weather );
    });

});


module.exports = weatherRouter;
