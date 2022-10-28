const requisitesComparisons = require('../helpers/requisitesComparisons')
class FileParser {
  #space = ' '
  #semicolon = ';'
  #emptyString = ''
  #doubleQuotes = '"'
  #invalidDate = 'Invalid Date'
  #returnSymbol = '\r'
  #newlineSymbol = '\n'
  #english = {
    name: 'английский',
    code: 'п:09; у:29',
    written: 'п',
    oral: 'у',
  }

  constructor(data) {
    this.data = data
  }

  #getExcludeComparisons() {
    return requisitesComparisons.filter((comparison) => {
      return comparison?.exclude === true
    })
  }

  #getRequiredComparisons() {
    return requisitesComparisons.filter((comparison) => {
      const isAllowNull = comparison?.allowNull === false
      const isUnique = comparison?.unique === true
      return isAllowNull || isUnique || (isAllowNull && isUnique)
    })
  }

  #trimLeft(string) {
    while (string.startsWith(this.#semicolon) && string.length) {
      string = string.slice(1)
    }

    return string
  }

  #normalizeTitle(string) {
    let normalizeString = string.trim().toLowerCase()
    if (normalizeString.startsWith(this.#doubleQuotes))
      normalizeString = normalizeString.slice(1)
    if (normalizeString.endsWith(this.#doubleQuotes))
      normalizeString = normalizeString.slice(-1)

    normalizeString = this.#trimLeft(normalizeString)

    return normalizeString
  }

  #toLocaleDateString(string) {
    return new Date(string).toLocaleDateString()
  }

  #selectDates(array) {
    let firstDate, secondDate

    for (const item of array) {
      const date = this.#toLocaleDateString(item)
      if (date === this.#invalidDate) continue
      if (firstDate) {
        secondDate = date
        continue
      }
      firstDate = date
    }

    return array[2].startsWith(this.#english.written)
      ? `${this.#english.written}:${firstDate}; ${
          this.#english.oral
        }:${secondDate}`
      : `${this.#english.written}:${secondDate}; ${
          this.#english.oral
        }:${firstDate}`
  }

  #parseTitle(title) {
    const splitTitle = this.#normalizeTitle(title).split(this.#space)

    if (splitTitle.includes(this.#english.name)) {
      const date = this.#selectDates(splitTitle)

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
    const excludeComparisons = this.#getExcludeComparisons()
    const deleteIndexes = []
    let comparisonsCount = 0

    const head = this.#normalizeTitle(tableHead)
      .split(this.#semicolon)
      .map((item) => {
        for (const requisitesComparison of requisitesComparisons) {
          if (requisitesComparison.values.includes(item)) {
            comparisonsCount += 1
            return requisitesComparison?.composite || requisitesComparison.name
          }
        }
        return this.#emptyString
      })
      .flat()
      .filter((item, index) => {
        if (item === this.#emptyString) {
          deleteIndexes.push(index)
          return false
        }

        for (const excludeComparison of excludeComparisons) {
          if (excludeComparison.name === item) {
            deleteIndexes.push(index)
            return false
          }
        }

        return true
      })

    if (!comparisonsCount) throw new Error("don't have head in table")
    return { head, deleteIndexes }
  }

  #getTableBoby(tableBody, tableHead) {
    const { head, deleteIndexes } = tableHead
    const tableBodyValues = []

    for (const row of tableBody) {
      const splitRow = row
        .trim()
        .split(this.#semicolon)
        .filter((item, index) => !deleteIndexes.includes(index))
        .reduce((acc, item, index) => {
          if (item === this.#emptyString) return acc
          const key = head[index]
          acc[key] = item
          return acc
        }, {})

      const splitRowKeys = Object.keys(splitRow)
      const requiredComparisons = this.#getRequiredComparisons()
      const difference = requiredComparisons.filter(
        (comparison) => !splitRowKeys.includes(comparison.name)
      )

      if (!difference.length) tableBodyValues.push(splitRow)
    }

    return tableBodyValues
  }

  parseCsv() {
    const splitedData = this.data.includes(
      `${this.#returnSymbol}${this.#newlineSymbol}`
    )
      ? this.data.split(`${this.#returnSymbol}${this.#newlineSymbol}`)
      : this.data.split(this.#newlineSymbol)
    const [title, tableHead, ...tableBody] = splitedData
    const parsedTitle = this.#parseTitle(title)

    let isRecheking = false
    let parsedHead

    for (const requisitesComparison of requisitesComparisons) {
      isRecheking = tableHead
        .toLowerCase()
        .includes(requisitesComparison.values)
    }

    if (isRecheking) {
      const concatTableHead = tableHead.concat(tableBody.shift())
      parsedHead = this.#getTableHead(concatTableHead)
    } else {
      parsedHead = this.#getTableHead(tableHead)
    }

    const parsedTableBody = this.#getTableBoby(tableBody, parsedHead)
    return { isRecheking, title: parsedTitle, body: parsedTableBody }
  }
}

module.exports = FileParser
