const { resolve: pathResolve } = require('path')
const pathDb = pathResolve('database', 'gia11.db')

module.exports = {
  development: {
    database: 'gia11',
    dialect: 'sqlite',
    storage: pathDb,
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
