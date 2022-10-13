module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('results', {
      id: {
        type: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code_exam_point: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      auditorium_number: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      short_answer: {
        type: Sequelize.DataTypes.STRING,
      },
      detailed_answer: {
        type: Sequelize.DataTypes.STRING,
      },
      oral_answer: {
        type: Sequelize.DataTypes.STRING,
      },
      written_score: {
        type: Sequelize.DataTypes.STRING,
      },
      oral_score: {
        type: Sequelize.DataTypes.STRING,
      },
      prymary_score: {
        type: Sequelize.DataTypes.STRING,
      },
      estimation: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      exam_date_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'exam_date',
          key: 'id',
        },
      },
      student_id: {
        type: Sequelize.DataTypes.UUIDV4,
        references: {
          model: 'students',
          key: 'id',
        },
      },
    })
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('results')
  },
}
