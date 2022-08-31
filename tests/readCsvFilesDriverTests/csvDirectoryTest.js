import assert from 'assert/strict'
import { resolve as pathResolve } from 'path'
import CsvDirectory from '../../csvFilesDriver/csvDirectory.js'

export default {
  'response emtry array': async function () {
    const pathArray = await CsvDirectory.getCsvPaths(pathResolve('tests', 'readCsvFilesDriverTests', 'staticTestWithoutCsv'))
    // console.log(pathArray)
    assert.deepStrictEqual(
      pathArray,
      []
    )
  },

  'response array of paths': async function () {
    const pathArray = await CsvDirectory.getCsvPaths(pathResolve('tests', 'readCsvFilesDriverTests', 'staticTestWithCsv'))
    assert.deepStrictEqual(
      pathArray,
      [
        '/home/user/Документы/code/javascript/projects/gia11/tests/readCsvFilesDriverTests/staticTestWithCsv/06_111.csv',
        '/home/user/Документы/code/javascript/projects/gia11/tests/readCsvFilesDriverTests/staticTestWithCsv/08_111.csv',
        '/home/user/Документы/code/javascript/projects/gia11/tests/readCsvFilesDriverTests/staticTestWithCsv/09_111.csv'
      ]
    )
  },

  'throw error when epmty path': async function () {
    assert.rejects(
      async () => {
        await CsvDirectory.getCsvPaths('')
      },
      new Error('directory path must not be empty')
    )
  },

  'throw error when path is not string': async function () {
    assert.rejects(
      async () => {
        await CsvDirectory(12).getCsvPaths()
      },
      new Error('directory path must be string')
    )
    assert.rejects(
      async () => {
        await CsvDirectory([1, 2]).getCsvPaths()
      },
      new Error('directory path must be string')
    )
  }
}
