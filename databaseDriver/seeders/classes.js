const { randomUUID } = require('crypto')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', [
      {
        id: randomUUID(),
        name: '11',
      },
      {
        id: randomUUID(),
        name: '11А',
      },
      {
        id: randomUUID(),
        name: '11Б',
      },
      {
        id: randomUUID(),
        name: '11В',
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {})
  },
}
