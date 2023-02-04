'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
  message: {type: DataTypes.STRING,allowNull: false},
  mediaUrl: DataTypes.STRING,
  userId: { type: DataTypes.INTEGER, allowNull: false},
  readBy: DataTypes.ARRAY(DataTypes.INTEGER)

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};