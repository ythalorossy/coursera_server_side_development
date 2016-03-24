var express = require('express'),
    bodyParser = require('body-parser');

var leadershipRouter = express.Router();

leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
  .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
  })

  .get(function(req, res, next){
          res.end('Will send all the leaderships to you!');
  })

  .post(function(req, res, next){
      res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
  })

  .delete(function(req, res, next){
          res.end('Deleting all leaderships');
  });

  leadershipRouter.route('/:leadershipId')
  .all(function(req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
  })

  .get(function(req, res, next){
          res.end('Will send details of the leadership: ' + req.params.leadershipId +' to you!');
  })

  .put(function(req, res, next){
          res.write('Updating the leadership: ' + req.params.leadershipId + '\n');
      res.end('Will update the leadership: ' + req.body.name +
              ' with details: ' + req.body.description);
  })

  .delete(function(req, res, next){
          res.end('Deleting leadership: ' + req.params.leadershipId);
  });

module.exports = leadershipRouter
