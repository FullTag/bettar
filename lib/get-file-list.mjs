import { readFile } from 'fs/promises'
import { resolve } from 'path'
import fg from 'fast-glob'

export const getIgnoredFiles = async (path, excludeFrom) => {
  return (
    await readFile(resolve(path, excludeFrom), { encoding: 'utf8' })
      .catch(() => {
        console.error(`Failed to read the ignore file ${excludeFrom}, continuing without it.`)
        return ''
      })
  )
    .split(/[\r\n]+/)
    .map(line => line.trim())
    .filter(Boolean)
}

export const getFileList = async (path, ignore) => {
  const list = await fg.async('**/*', { cwd: path, ignore, dot: true, onlyFiles: false, followSymbolicLinks: false, stats: true })
  return list.filter(file => !file.stats.isDirectory() || file.stats.isSymbolicLink()).map(file => file.path)
}
