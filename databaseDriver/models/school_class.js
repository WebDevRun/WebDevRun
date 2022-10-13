const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SchoolClass extends Model {}

  SchoolClass.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      school_id: {
        type: DataTypes.UUIDV4,
      },
      class_id: {
        type: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'schoolClass',
      tableName: 'school_class',
    }
  )

  return SchoolClass
}
