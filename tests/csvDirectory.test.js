import CsvDirectory from '../csvFilesDriver/csvDirectory.js'
import path from 'path'
import fs from 'fs/promises'

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
}))

describe('CsvDirectory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return only csv formats', async () => {
    const directory = 'dir'
    const files = [
      'test1.csv',
      'test2.csv',
      'test3.CSV',
      'test4.pdf',
      'test5.xls',
      'test6.txt',
      'test7.someformat',
      'test8',
    ]
    const results = [
      path.resolve(directory, 'test1.csv'),
      path.resolve(directory, 'test2.csv'),
      path.resolve(directory, 'test3.csv'),
    ]
    fs.readdir.mockReturnValue(files)
    const paths = await CsvDirectory.getCsvPaths(directory)
    expect(paths).toEqual(results)
  })

  test('Should return error when path is not string', async () => {
    const directory = 2
    await expect(CsvDirectory.getCsvPaths(directory)).rejects.toThrow(
      'directory path must be string'
    )
  })

  test('Should return error when path is empty string', async () => {
    const directory = ''
    await expect(CsvDirectory.getCsvPaths(directory)).rejects.toThrow(
      'directory path must not be empty'
    )
  })

  test('Should return empty array when path has not csv files', async () => {
    const directory = 'static'
    const files = ['test1.js', 'test2.html', 'test3', 'test4.ADS']
    fs.readdir.mockReturnValue(files)
    const paths = await CsvDirectory.getCsvPaths(directory)
    expect(paths).toEqual([])
  })
})
