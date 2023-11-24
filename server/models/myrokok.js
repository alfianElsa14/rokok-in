'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myRokok extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      myRokok.belongsTo(models.User, { foreignKey: 'userId'})
      myRokok.belongsTo(models.Rokok, { foreignKey: 'rokokId'})
    }
  }
  myRokok.init({
    userId: DataTypes.INTEGER,
    rokokId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'myRokok',
  });
  return myRokok;
};