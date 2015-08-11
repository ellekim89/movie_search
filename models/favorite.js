'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    imdbid: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.hasMany(models.comment)
      }
    }
  });
  return favorite;
};