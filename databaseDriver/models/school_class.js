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
        defaultValue: DataTypes.UUIDV4,
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

  SchoolClass.associate = (models) => {
    SchoolClass.belongsTo(models.classes, {
      foreignKey: 'class_id',
    })

    SchoolClass.belongsTo(models.schools, {
      foreignKey: 'school_id',
    })

    SchoolClass.hasMany(models.students, {
      foreignKey: 'school_class_id',
    })
  }

  return SchoolClass
}
