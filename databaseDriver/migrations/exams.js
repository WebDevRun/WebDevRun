module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('exams', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('exams')
  },
}
