'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerFavorite.belongsTo(models.Customer, {foreignKey: "CustomerId"})
      CustomerFavorite.belongsTo(models.Movie, {foreignKey: "MovieId"})
    }
  }
  CustomerFavorite.init({
    CustomerId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {msg : "Customer is required!"},
        notNull : {msg : "Customer is required!"}
      }
    },
    MovieId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {msg : "Movie is required!"},
        notNull : {msg : "Movie is required!"}
      }
    }
  }, {
    sequelize,
    modelName: 'CustomerFavorite',
  });
  return CustomerFavorite;
};