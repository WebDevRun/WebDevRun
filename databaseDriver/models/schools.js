const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Schools extends Model {}

  Schools.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_name: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'schools',
    }
  )

  return Schools
}
