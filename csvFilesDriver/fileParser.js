export default class FileParser {
  #splitValue = ';'
  #emptyString = ''
  #english = 'английский'
  #requisitesComparison = {
    number: ['№'],
    organigationCode: ['код оо'],
    class: ['класс'],
    pointOfExamination: ['код ппэ'],
    auditorium: ['аудитория'],
    lastName: ['фамилия'],
    firstName: ['имя'],
    patronymic: ['отчество'],
    passport: ['серия', 'номер', 'документ'],
    shortAnswer: ['задания с кратким ответом', 'часть с кратким ответом'],
    detailedAnswer: [
      'задания с развёрнутым ответом',
      'часть с развёрнутым ответом',
    ],
    oralScore: ['устная часть'],
    prymaryScoreWrittenPart: [
      'первичный балл письменной части',
      'первичный балл письм. части',
    ],
    prymaryScoreOralPart: ['первичный балл устной части'],
    prymaryScore: ['первичный балл'],
    estimation: ['оценка', 'тестовый балл'],
  }

  #convertHelper = {
    '+': 1,
    '-': 0,
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

  #parseTitle(title) {
    const splitTitle = this.#normalize(title).split(' ')

    if (splitTitle.includes(this.#english)) {
      const date = splitTitle[2].startsWith('п')
        ? `п:${new Date(splitTitle[2]).toLocaleDateString()}; у:${new Date(
            splitTitle[3]
          ).toLocaleDateString()}`
        : `п:${new Date(splitTitle[3]).toLocaleDateString()}; у:${new Date(
            splitTitle[2]
          ).toLocaleDateString()}`

      return {
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
    return this.#normalize(tableHead)
      .split(this.#splitValue)
      .filter((item) => item !== this.#emptyString)
  }

  #convertShortAnswer(shortAnswer) {
    return shortAnswer
      ?.split('')
      .map((symbol) => this.#convertHelper[symbol] ?? symbol)
      .join('')
  }

  #getTableBoby(tableBody, length) {
    const tableBodyValues = []

    for (const row of tableBody) {
      const splitRow = row
        .trim()
        .split(this.#splitValue)
        .filter((item) => item !== this.#emptyString)

      if (splitRow.length === length) tableBodyValues.push(splitRow)
    }

    return tableBodyValues
  }

  #serialize(parsedTableHead, parsedTableBody) {
    const indexes = []
    let shortAnswerIndex

    const head = parsedTableHead.filter((value, index) => {
      const isPasswort = this.#requisitesComparison.passport.includes(value)
      const isNumber = this.#requisitesComparison.number.includes(value)
      if (isNumber || isPasswort) {
        indexes.push(index)
        return false
      }
      const isShortAnswer =
        this.#requisitesComparison.shortAnswer.includes(value)
      if (isShortAnswer) shortAnswerIndex = index
      return true
    })

    const body = parsedTableBody.map((array) => {
      array[shortAnswerIndex] = this.#convertShortAnswer(
        array[shortAnswerIndex]
      )
      return array.filter((value, index) => !indexes.includes(index))
    })

    return { head, body }
  }

  parseFile() {
    const splitedData = this.data.includes('\r\n')
      ? this.split('\r\n')
      : this.data.split('\n')
    const [title, tableHead, ...tableBody] = splitedData
    const parsedTitle = this.#parseTitle(title)
    const parsedTableHead = this.#getTableHead(tableHead)
    const parsedTableBody = this.#getTableBoby(
      tableBody,
      parsedTableHead.length
    )
    const { head, body } = this.#serialize(parsedTableHead, parsedTableBody)
    return { parsedTitle, head, body }
  }
}
