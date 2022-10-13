module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('exam_date', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      date_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'dates',
          key: 'id',
        },
      },
      exam_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'exams',
          key: 'id',
        },
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('exam_date')
  },
}
