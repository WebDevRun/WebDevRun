module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('appeals', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      appeal_type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      appeal_status: {
        type: Sequelize.DataTypes.STRING,
      },
      send_for_processing_date: {
        type: Sequelize.DataTypes.STRING,
      },
      change_date: {
        type: Sequelize.DataTypes.STRING,
      },
      prymary_score: {
        type: Sequelize.DataTypes.STRING,
      },
      estimation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      result_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'results',
          key: 'id',
        },
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('appeals')
  },
}
