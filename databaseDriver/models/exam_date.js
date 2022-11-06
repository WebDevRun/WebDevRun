const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ExamDate extends Model {}

  ExamDate.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      date_id: {
        type: DataTypes.UUIDV4,
      },
      exam_id: {
        type: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'examDate',
      tableName: 'exam_date',
    }
  )

  ExamDate.associate = (models) => {
    ExamDate.belongsTo(models.exams, {
      foreignKey: 'exam_id',
    })

    ExamDate.belongsTo(models.dates, {
      foreignKey: 'date_id',
    })

    ExamDate.belongsToMany(models.students, {
      through: models.results,
      foreignKey: 'exam_date_id',
    })
  }

  return ExamDate
}
