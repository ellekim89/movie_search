var express = require('express');
var app = express();
var db = require("./models");
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var moviesController = require("./controller/movies.js");
var favoritesController = require("./controller/favorites.js");

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use("/movies", moviesController);
app.use("/favorites", favoritesController);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.render("index");
});




app.listen(3000);