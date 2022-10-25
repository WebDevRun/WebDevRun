const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {}

  Classes.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'classes',
    }
  )

  return Classes
}
