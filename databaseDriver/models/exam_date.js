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

  return ExamDate
}
