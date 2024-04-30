import { stat } from 'fs/promises'

export const checkDirectory = async (path) => {
  const stats = await stat(path).catch(() => {
    throw new Error(`The directory ${path} does not exist or is not accessible.`)
  })
  if (!stats.isDirectory()) {
    throw new Error(`The path ${path} is not a directory.`)
  }
}
