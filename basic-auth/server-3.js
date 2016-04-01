var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',  //Secret Key
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

// Custom Middleware
function auth (req, res, next) {

  console.log(req.headers);

  // Verifies that the user is not in session
  if (!req.session.user) {

    // Get authentication data (basic-auth)
    var authHeader = req.headers.authorization;

    // Check if not have authentication data in request
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
      return;
    }

    // If have authentication data, get user and password
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    // Validate user and password
    if (user == 'admin' && pass == 'password') {
      // Put user in session
      req.session.user = 'admin';
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }

  // User in session
  } else {

    if (req.session.user === 'admin') {
      console.log('req.session: ', req.session);
      next();

    } else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}

// Use Custom Authentication Middleware
app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
