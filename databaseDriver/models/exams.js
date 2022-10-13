const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Exams extends Model {}

  Exams.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'exams',
    }
  )

  return Exams
}
