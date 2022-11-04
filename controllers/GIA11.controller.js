const url = require('url')
const GIA11Service = require('../services/gia11.service')

module.exports = class GIA11Controller {
  static #paths = {
    home: {
      GET: (res) => this.#getHome(res),
    },
    '': {
      GET: (res) => this.#getHome(res),
    },
    api: {
      GET: (res) => this.#getAPI(res),
    },
    'favicon.ico': { GET: (res) => this.#getFavicon(res) },
    404: { GET: (res) => this.#getNotFoundPage(res) },
  }
  static #APIPaths = {
    date: {
      GET: async (query) => await this.#getByDate(query),
    },
    exam: {
      GET: async (query) => await this.#getByExams(query),
    },
    school: {
      GET: async (query) => await this.#getBySchool(query),
    },
  }

  static #setHeaders(res) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    )
  }

  static #selectURLEndpoints(urlPath) {
    const parsedUrl = url.parse(urlPath, true)
    const { pathname, query } = parsedUrl
    const pathEndpoints = pathname.split('/')
    return { pathEndpoints, query }
  }

  static async router(req, res, port) {
    try {
      res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`)

      const { method } = req
      if (method === 'OPTIONS') return this.#setHeaders(res)

      const { pathEndpoints } = this.#selectURLEndpoints(req.url)
      if (!pathEndpoints[2]) return this.#paths[pathEndpoints[1]]?.[method](res)
      return await this.#APIRouter(req, res)
    } catch (error) {
      res.setHeader('Content-Type', 'text/html')
      this.#paths[404].GET(res)
      return error
    }
  }

  static async #APIRouter(req, res) {
    try {
      const { pathEndpoints, query } = this.#selectURLEndpoints(req.url)
      const { method } = req
      const results = await this.#APIPaths[pathEndpoints[2]]?.[method](query)

      res.setHeader('Content-Type', 'text/html')
      res.end(
        `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Dates</title>
            </head>
            <body>
            <h1>Results by query ${JSON.stringify(query)}</h1>
            <pre><code>${JSON.stringify(results, null, 2)}</code></pre>
            </body>
            </html>`
      )
      return
    } catch (error) {
      res.setHeader('Content-Type', 'text/html')
      this.#paths[404].GET(res)
      return error
    }
  }

  static #getHome(res) {
    res.setHeader('Content-Type', 'text/html')
    return res.end(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dates</title>
      </head>
      <body>
      <h1>Results by date</h1>
      <p>Hello friend. Welcome in my application.</p>
      </body>
      </html>`
    )
  }

  static #getAPI(res) {
    res.setHeader('Content-Type', 'text/html')
    return res.end(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dates</title>
      </head>
      <body>
      <h1>Results by date</h1>
      <p>Hello friend. This is my api.</p>
      </body>
      </html>`
    )
  }

  static #getFavicon(res) {
    res.statusCode = 404
    return res.end()
  }

  static #getNotFoundPage(res) {
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 404
    return res.end(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dates</title>
      </head>
      <body>
      <h1>This page not found.</h1>
      </body>
      </html>`
    )
  }

  static async #getByDate(query) {
    if (!query.date) return await this.#getExamsWithDates()
    return await GIA11Service.selectByDate({ date: query.date })
  }

  static async #getExamsWithDates() {
    return await GIA11Service.selectExamsWithDates()
  }

  static async #getByExams(query) {
    if (!(query.name || query.code)) return await this.#getExamsWithDates()
    return await GIA11Service.selectByExam({
      code: query.code,
      name: query.name,
    })
  }

  static async #getBySchool(query) {
    if (!(query.name || query.code)) return await GIA11Service.selectSchools()
    return await GIA11Service.selectBySchool({
      code: query.code,
      short_name: query.name,
    })
  }
}
