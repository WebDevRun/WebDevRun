module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('schools', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      short_name: {
        type: Sequelize.DataTypes.STRING,
      },
      full_name: {
        type: Sequelize.DataTypes.STRING,
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('schools')
  },
}
