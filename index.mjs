#!/usr/bin/env node

import { resolve } from 'path';
import { program } from 'commander';
import { create } from 'tar'
import { checkDirectory, getFileList, getIgnoredFiles, verboseLog } from './lib/index.mjs';

async function main() {
  program
    .name('bettar')
    .showHelpAfterError(true)
    .description('A tar-like utilitiy with support for more advanced ignore files (.bettarignore by default)')
    .argument('<directory>', 'The directory to archive')
    .option('-X, --exclude-from <filename>', 'Read a list of exclusion patterns from the specified file', '.bettarignore')
    .option('-f, --file <filename>', 'The name of the archive file', 'archive.tar.gz')
    .option('-z, --gzip', 'Compress the archive using gzip')
    .option('-v, --verbose', 'Print verbose output')
    .parse(process.argv)

  const options = program.opts()
  const log = verboseLog(options.verbose)
  log(`Checking the directory ${program.args[0]}`)
  const cwd = resolve(program.args[0])
  await checkDirectory(cwd)
  log(`Resolved and verified the directory ${cwd}`)

  log(`Getting the list of files to ignore, using ${options.excludeFrom}`)
  const ignore = await getIgnoredFiles(cwd, options.excludeFrom)
  ignore.push(options.file)
  log('Ignoring the following files:')
  log(ignore.map(file => `  - ${file}`).join('\n'))
  log('Getting the list of files to archive')
  const files = await getFileList(cwd, ignore)
  log('Archiving the following files:')
  log(files.map(file => `  - ${file}`).join('\n'))

  log(`Creating the archive ${options.file}, with gzip: ${!!options.gzip}`)
  await create({
    file: options.file,
    gzip: options.gzip,
    cwd,
  }, files).catch((err) => {
    throw new Error(`Failed to create the archive: ${err.message}`)
  })
  log('Done')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
