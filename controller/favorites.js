var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");

router.get('/', function(req, res){
  db.favorite.findAll({
    include:[db.comment, db.tag]
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
    include: [db.comment, db.tag]
  }).then(function(favorite){
    res.render('comments/index',{
      favorite:favorite
    })
  // res.send(favorite)
  })
});


router.post('/:id/comments', function(req,res){
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({comment:req.body.comment}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    });
  });
})

router.get('/:id/tags', function(req, res) {
  db.tag.find({
    where: {id: parseInt(req.params.id)},
    include: [db.favorite]
  }).then(function(tag) {
    if (tag) {
      res.render('tags/show', {tag: tag});
    } else {
      res.send("There are no movies related to this tag");
    }
  }).catch(function(error) {
    res.send("There are no movies related to this tag");
  });
});


router.get('/:id/tags/new', function(req, res){
  res.render('tags/index', {favoriteId: req.params.id});

});

router.post('/:id/tags', function(req, res){
  var tagName = req.body.tags;
  var favoriteId = req.params.id;

  db.favorite.findById(favoriteId).then(function(fave){
    db.tag.findOrCreate({where: {name: tagName}}).spread(function(tag, created){
      fave.addTag(tag).then(function(){
        res.redirect('/favorites/' + favoriteId + '/comments')
      })
    })
  })
})


module.exports = router;