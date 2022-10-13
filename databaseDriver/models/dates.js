const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dates extends Model {}

  Dates.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'dates',
    }
  )

  return Dates
}
