module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('classes', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('classes')
  },
}
