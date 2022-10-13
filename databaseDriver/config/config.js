const { resolve: pathResolve } = require('path')
const File = require('../../filesDriver/file')
const pathDb = pathResolve('database', 'gia11.db')
// const logMessages = []

module.exports = {
  development: {
    database: 'gia11',
    dialect: 'sqlite',
    storage: pathDb,
    // logging: async (message) => {
    //   logMessages.push(message)
    //   await File.writeJson('log.json', logMessages)
    //   console.log(message)
    // },
    define: {
      timestamps: false,
    },
  },
  test: {
    database: 'gia11',
    dialect: 'sqlite',
    storage: pathDb,
    define: {
      timestamps: false,
    },
  },
  production: {
    database: 'gia11',
    dialect: 'sqlite',
    storage: pathDb,
    define: {
      timestamps: false,
    },
  },
}
