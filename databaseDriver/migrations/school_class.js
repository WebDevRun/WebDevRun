module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('school_class', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      school_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'schools',
          key: 'id',
        },
      },
      class_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'classes',
          key: 'id',
        },
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('school_class')
  },
}
