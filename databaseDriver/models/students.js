const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Students extends Model {}

  Students.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      patronymic: {
        type: DataTypes.STRING,
      },
      school_class_id: {
        type: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'students',
    }
  )

  Students.associate = (models) => {
    Students.belongsToMany(models.examDate, {
      through: models.results,
      foreignKey: 'student_id',
    })

    Students.belongsTo(models.schoolClass, {
      foreignKey: 'school_class_id',
    })
  }

  return Students
}
