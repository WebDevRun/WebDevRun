const File = require('../filesDriver/file.js')
const fs = require('fs/promises')

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
    File.writeJson(path, data)
    expect(fs.open).toHaveBeenCalled()
  })

  test('Should return error when path is not string', async () => {
    const data = ['a', 'b', 'c']
    const path = 2
    await expect(File.writeJson(path, data)).rejects.toThrow(
      'path must be string'
    )
  })

  test('Should return error when path is not empty', async () => {
    const data = ['a', 'b', 'c']
    const path = ''
    await expect(File.writeJson(path, data)).rejects.toThrow(
      'path must not be empty'
    )
  })
})
