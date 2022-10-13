module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('dates', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('dates')
  },
}
