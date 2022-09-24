import CsvFile from '../csvFilesDriver/csvFile.js'
import fs from 'fs/promises'

jest.mock('fs/promises', () => ({
  open: jest.fn(),
}))

describe('CsvFile.readFile', () => {
  test('Should called', async () => {
    const path = 'dir'
    CsvFile.readFile(path)
    expect(fs.open).toHaveBeenCalled()
  })

  test('Should return error when path is not string', async () => {
    await expect(CsvFile.readFile()).rejects.toThrow('path must be string')
  })

  test('Should return error when path is not empty', async () => {
    await expect(CsvFile.readFile('')).rejects.toThrow('path must not be empty')
  })
})

describe('CsvFile.writeJson', () => {
  test('Should called', async () => {
    const data = ['a', 'b', 'c']
    const path = 'dir'
    CsvFile.writeJson(data, path)
    expect(fs.open).toHaveBeenCalled()
  })

  test('Should return error when data is not array', async () => {
    const data = 2
    const path = 'dir'
    await expect(CsvFile.writeJson(data, path)).rejects.toThrow(
      'data must be array'
    )
  })

  test('Should return error when data is empty array', async () => {
    const data = []
    const path = 'dir'
    await expect(CsvFile.writeJson(data, path)).rejects.toThrow(
      'data must not be empty'
    )
  })

  test('Should return error when path is not string', async () => {
    const data = ['a', 'b', 'c']
    const path = 2
    await expect(CsvFile.writeJson(data, path)).rejects.toThrow(
      'path must be string'
    )
  })

  test('Should return error when path is not empty', async () => {
    const data = ['a', 'b', 'c']
    const path = ''
    await expect(CsvFile.writeJson(data, path)).rejects.toThrow(
      'path must not be empty'
    )
  })
})
