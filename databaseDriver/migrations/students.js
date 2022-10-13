module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('students', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      patronymic: {
        type: Sequelize.DataTypes.STRING,
      },
      school_class_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'school_class',
          key: 'id',
        },
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('students')
  },
}
