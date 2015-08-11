var express = require('express');
var router = express.Router();
var request = require('request');
var db = require("../models");


function Movie(title, year, id){
  this.title = title;
  this.year = year;
  this.id = id;

}

var movies = [];


router.get("/", function(req, res){
  res.render('movies/index.ejs');
})


router.get("/results", function(req, res){
  //res.render("results")
  var title = req.query.t
  var url = "http://www.omdbapi.com/?s=" + title


  request(url, function(error, response, data){
    var movieData = JSON.parse(data)
    var results = movieData.Search

    if(results){
      res.render('movies/results', {
        myMovies: results
      });
    }

  })
  // res.render('movies/results.ejs')
})

router.get("/show/:id", function(req, res){
  var id = req.params.id
  var url = "http://www.omdbapi.com/?i=" + id + "&tomatoes=true"

  request(url, function(error, response, data){
    var thisMovieData = JSON.parse(data)
    var thisResult = thisMovieData.Plot
    var rating = parseInt(thisMovieData.imdbRating)



    if(thisResult){
      res.render('movies/show', {
        description: thisMovieData,
        rating: rating
      });

    }

    //res.send(thisResults)
  })

})

module.exports = router;