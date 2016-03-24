var mongoose = require('mongoose'),
    assert = require('assert');

var Location = require('./models/Location');

// console.log(Location);

// Connection URL
var url = 'mongodb://localhost:27017/geo';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  Location.create({
    name: "Ponto",
    location: {
      coordinates : [-46.5173793, -23.4571049]
    }
  }, function (err, loc) {
    if (err) throw err;

    console.log("Point created: ", loc.location.coordinates);

    setTimeout(function () {
      Location.find({
        location: {
            $nearSphere: {
               $geometry: {
                  type : "Point",
                  coordinates : [-45.5173793, -23.4571049]
               },
               $minDistance: 0,
               $maxDistance: 101938.99
            }
         }
      }, function (err, locs) {

        if (err) throw err;

        locs.forEach(function (l) {
          console.log("Location: ", l.location);
        });

        db.collection('locations').drop(function () {
            db.close();
        });
      });
    }, 2000);


  });

});
