const requisitesComparisons = require('../helpers/requisitesComparisons')
class FileParser {
  #splitValue = ';'
  #emptyString = ''
  #english = {
    name: 'английский',
    code: 'п:09; у:29',
  }

  constructor(data) {
    this.data = data
  }

  #normalize(string) {
    let normalizeString = string.trim().toLowerCase()
    if (normalizeString.startsWith('"'))
      normalizeString = normalizeString.slice(1)
    if (normalizeString.endsWith('"'))
      normalizeString = normalizeString.slice(-1)
    return normalizeString
  }

  #toLocaleDateString(title, index) {
    return new Date(title[index]).toLocaleDateString()
  }

  #parseTitle(title) {
    const splitTitle = this.#normalize(title).split(' ')

    if (splitTitle.includes(this.#english.name)) {
      const firstDate = this.#toLocaleDateString(splitTitle, 2)
      const secondDate = this.#toLocaleDateString(splitTitle, 3)
      const date = splitTitle[2].startsWith('п')
        ? `п:${firstDate}; у:${secondDate}`
        : `п:${secondDate}; у:${firstDate}`

      return {
        code: this.#english.code,
        examName: `${splitTitle[0]} ${splitTitle[1]}`,
        date,
      }
    }

    return {
      code: splitTitle[0],
      examName: splitTitle.slice(2, -1).join(' '),
      date: new Date(splitTitle[splitTitle.length - 1]).toLocaleDateString(),
    }
  }

  #getTableHead(tableHead) {
    const deleteIndexes = []
    const head = this.#normalize(tableHead)
      .split(this.#splitValue)
      .filter((item, index) => {
        const emptyStirng = item === this.#emptyString
        const isPasswort = requisitesComparisons.passport.includes(item)
        const isNumber = requisitesComparisons.number.includes(item)
        if (emptyStirng || isNumber || isPasswort) {
          deleteIndexes.push(index)
          return false
        }
        return true
      })
      .map((item) => {
        for (const key in requisitesComparisons) {
          if (requisitesComparisons[key].includes(item)) return key
        }
        return item
      })
    return { head, deleteIndexes }
  }

  #getTableBoby(tableBody, tableHead) {
    const { head, deleteIndexes } = tableHead
    const headLength = head.length
    const tableBodyValues = []

    for (const row of tableBody) {
      const splitRow = row
        .trim()
        .split(this.#splitValue)
        .filter((item, index) => {
          if (item !== this.#emptyString && !deleteIndexes.includes(index))
            return true
          return false
        })
        .reduce((acc, item, index) => {
          const key = head[index]
          acc[key] = item
          return acc
        }, {})

      if (Object.keys(splitRow).length === headLength)
        tableBodyValues.push(splitRow)
    }

    return tableBodyValues
  }

  parseCsv() {
    const splitedData = this.data.includes('\r\n')
      ? this.data.split('\r\n')
      : this.data.split('\n')
    const [title, tableHead, ...tableBody] = splitedData
    const parsedTitle = this.#parseTitle(title)
    const parsedHead = this.#getTableHead(tableHead)
    const parsedTableBody = this.#getTableBoby(tableBody, parsedHead)
    return { title: parsedTitle, body: parsedTableBody }
  }
}

module.exports = FileParser
