const express = require('express')
require('dotenv').config()
const File = require('./filesDriver/file')
const GIA11Router = require('./routes/GIA11.route')
const { open, close } = require('./databaseDriver')

const port = process.env.PORT || 3000
const app = express()

async function start() {
  try {
    await open()
    app.use(express.json())
    app.use('/api', GIA11Router)
    app.listen(port, () => console.log(`server started on port ${port} `))
  } catch (error) {
    console.error(error)
    const date = new Date()
    await File.write(
      `./log/errors_${date.toLocaleDateString()}.log`,
      `Date: ${date}\n${error.stack}\n\n`,
      'a'
    )
    await close()
  }
}

start()

module.exports = app
