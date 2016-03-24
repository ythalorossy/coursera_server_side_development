var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var host = 'localhost',
    port = 3000;

var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

var app = express();

app.use(morgan('dev'));

// Router
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

// Static resources
app.use(express.static(__dirname + '/public'));

app.listen(port, host, function () {
  console.log(`Server running at http://${host}:${port}`);
});
