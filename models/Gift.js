const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gift extends Model { }

Gift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    people_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'people',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }


  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'gift',
  }

);

module.exports = Gift;
