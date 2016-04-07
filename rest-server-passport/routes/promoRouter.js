var express = require('express'),
    bodyParser = require('body-parser');

var Promotions = require("../models/promotions");
var Verify = require("./verify");

var promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')

  .get(Verify.verifyOrdinaryUser, function(req, res, next){

      Promotions.find({}, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
      })
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){

    Promotions.create(req.body, function (err, promotion) {

      if (err) throw err;

      var id = promotion._id;
      res.writeHead(200, {
         'Content-Type': 'text/plain'
      });

      res.end('Added the promotion with id: ' + id);
    });
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){

    Promotions.remove({}, function (err, resp) {
      if (err) throw err;

      res.json(resp);
    })

  });

  promotionRouter.route('/:promotionId')

  .get(Verify.verifyOrdinaryUser, function(req, res, next){

    Promotions.findById(req.params.promotionId, function (err, promotion) {
      if (err) throw err;

      res.json(promotion);
    });

  })

  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){

    Promotions.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, {
      new: true
    }, function (err, promotion) {
      if (err) throw err;
      res.json(promotion);
    });


  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){

    Promotions.remove(req.params.promotionId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

module.exports = promotionRouter
