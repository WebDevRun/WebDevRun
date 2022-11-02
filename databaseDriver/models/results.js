const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Results extends Model {}

  Results.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      code_exam_point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      auditorium_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_answer: {
        type: DataTypes.STRING,
      },
      detailed_answer: {
        type: DataTypes.STRING,
      },
      oral_answer: {
        type: DataTypes.STRING,
      },
      written_score: {
        type: DataTypes.STRING,
      },
      oral_score: {
        type: DataTypes.STRING,
      },
      prymary_score: {
        type: DataTypes.STRING,
      },
      estimation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appeal_type: {
        type: DataTypes.STRING,
      },
      appeal_status: {
        type: DataTypes.STRING,
      },
      send_for_processing_date: {
        type: DataTypes.STRING,
      },
      change_date: {
        type: DataTypes.STRING,
      },
      appeal_prymary_score: {
        type: DataTypes.STRING,
      },
      appeal_estimation: {
        type: DataTypes.STRING,
      },
      student_id: {
        type: DataTypes.UUIDV4,
      },
      exam_date_id: {
        type: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'results',
    }
  )

  return Results
}
