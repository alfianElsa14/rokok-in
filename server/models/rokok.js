'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rokok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rokok.hasMany(models.myRokok, { foreignKey: 'rokokId' })
    }
  }
  Rokok.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isi: DataTypes.INTEGER,
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rokok',
  });
  return Rokok;
};