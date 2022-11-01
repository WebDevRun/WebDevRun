const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Appeals extends Model {}

  Appeals.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      appeal_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      appeal_status: {
        type: DataTypes.STRING,
      },
      send_for_processing_date: {
        type: DataTypes.STRING,
      },
      change_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prymary_score: {
        type: DataTypes.STRING,
      },
      estimation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result_id: {
        type: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'appeals',
    }
  )

  return Appeals
}
