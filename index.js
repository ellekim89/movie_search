var express = require('express');
var app = express();
var db = require("./models");
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use("/movies", require("./controller/movies.js"));
app.use("/favorites", require("./controller/favorites.js"));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.render("index");
});




app.listen(3000);