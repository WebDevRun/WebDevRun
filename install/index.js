import { writeFile } from 'fs/promises'
import util from 'util'
import { exec } from 'child_process'
import path from 'path'

const execPromise = util.promisify(exec)

try {
  await writeFile(path.resolve('database', 'gia11.db'), '')
  const execCommand = `sqlite3 ${path.resolve('database', 'gia11.db')} < ${path.resolve('install', 'createDatabase.sql')}`
  const { stdout, stderr } = await execPromise(execCommand)
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
} catch (error) {
  console.error(error)
}
