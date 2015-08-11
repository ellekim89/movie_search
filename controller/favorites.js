var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.get('/', function(req, res){
  db.favorite.findAll({
    include:[db.comment]
  }).then(function(favorites){
      res.render('favorites/index', {myFavorites: favorites
                                    });
    });

});


router.post('/', function(req, res){
  db.favorite.findOrCreate({where:{
    //left side against model -> title:
    //right side against form -> req.body.title
    title: req.body.title,
    year: req.body.year,
    imdbid: req.body.imdbid,
    poster: req.body.poster
  }}).spread(function(favorite, created){
    res.redirect('/movies/show/' + req.body.imdbid);
  })
});


router.get('/:id/comments', function(req, res){
  // res.render('comments/index', {favoriteId: req.params.id});
  db.favorite.find({
    where:{id:req.params.id},
    include: [db.comment]
  }).then(function(favorite){
    res.render('comments/index',{
      favorite:favorite
    })
  })
});

router.post('/:id/comments', function(req,res){
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({comment:req.body.comment}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    });
  });
})


module.exports = router;