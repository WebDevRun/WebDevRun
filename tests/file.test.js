import File from '../filesDriver/file.js'
import fs from 'fs/promises'

jest.mock('fs/promises', () => ({
  open: jest.fn(),
}))

describe('File.read', () => {
  test('Should called', async () => {
    const path = 'dir'
    File.read(path)
    expect(fs.open).toHaveBeenCalled()
  })

  test('Should return error when path is not string', async () => {
    await expect(File.read()).rejects.toThrow('path must be string')
  })

  test('Should return error when path is not empty', async () => {
    await expect(File.read('')).rejects.toThrow('path must not be empty')
  })
})

describe('File.writeJson', () => {
  test('Should called', async () => {
    const data = ['a', 'b', 'c']
    const path = 'dir'
    File.writeJson(data, path)
    expect(fs.open).toHaveBeenCalled()
  })

  test('Should return error when data is not array', async () => {
    const data = 2
    const path = 'dir'
    await expect(File.writeJson(data, path)).rejects.toThrow(
      'data must be array'
    )
  })

  test('Should return error when data is empty array', async () => {
    const data = []
    const path = 'dir'
    await expect(File.writeJson(data, path)).rejects.toThrow(
      'data must not be empty'
    )
  })

  test('Should return error when path is not string', async () => {
    const data = ['a', 'b', 'c']
    const path = 2
    await expect(File.writeJson(data, path)).rejects.toThrow(
      'path must be string'
    )
  })

  test('Should return error when path is not empty', async () => {
    const data = ['a', 'b', 'c']
    const path = ''
    await expect(File.writeJson(data, path)).rejects.toThrow(
      'path must not be empty'
    )
  })
})
