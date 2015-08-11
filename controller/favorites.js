var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.get('/', function(req, res){
  db.favorite.findAll().then(function(favorites){
      res.render('favorites/index', {myFavorites: favorites
                                    });
    });

});


router.post('/', function(req, res){
  db.favorite.findOrCreate({where:{
    title: req.body.title,
    year: req.body.year,
    imdbid: req.body.imdbid,
    poster: req.body.poster
  }}).spread(function(favorite, created){
    res.redirect('favorites');
  })

  // db.favorite.findById(req.body.title).then(function(fave){
  //   fave.createComment({
  //     comment: req.body.comment
  //   }).then(function(post){
  //     res.redirect('/favorites');
  //   })

});


router.get('/comment/:id', function(req, res){
  res.render('favorites/comment');
})

router.post('/comment/:id', function(req, res){
  db.favorite.findById(req.body.title).then(function(fave){
    fave.createComment({
      comment: req.body.comment
    }).then(function(post){
      res.redirect('/favorites');
    })
    // res.send(author)
  });
})

module.exports = router;