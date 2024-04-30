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
  return fg.async('**/*', { cwd: path, ignore, dot: true })
}
