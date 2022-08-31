import csvDirectoryTests from './readCsvFilesDriverTests/csvDirectoryTest.js'

let failed = 0

for await (const test of Object.values(csvDirectoryTests)) {
  try {
    await test()
  } catch (error) {
    failed++
    console.log(error)
  }
}

console.log(`Total tests: ${Object.keys(csvDirectoryTests).length}. ${failed ? '\x1b[31m' : '\x1b[32m'}failed tests: ${failed}`)
process.exit(failed ? 1 : 0)
