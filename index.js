const http = require('http')
require('dotenv').config()
const File = require('./filesDriver/file')
const GIA11Controller = require('./controllers/GIA11.controller')
const { open, close } = require('./databaseDriver')

async function start() {
  try {
    const port = process.env.PORT || 3000
    await open()
    const server = http.createServer(async (req, res) => {
      const results = await GIA11Controller.router(req, res, port)
      if (results instanceof Error) throw results
    })

    server.listen(port, () => console.log(`server started on port ${port} `))
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
