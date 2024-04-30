# Bettar

A tar-like utilitiy with support for more advanced ignore files (.bettarignore by default)

Currently only creating tars is supported.

Example usage:
```shell
bettar -zf outputfile.tar.gz inputdir
```
The above example creates a gzipped tarbal from the files in inputdir, it automatically excludes files described in the `inputdir/.bettarignore` file.

```
Usage: bettar [options] <directory>

Arguments:
  directory                      The directory to archive

Options:
  -X, --exclude-from <filename>  Read a list of exclusion patterns from the specified file (default: ".bettarignore")
  -f, --file <filename>          The name of the archive file (default: "archive.tar.gz")
  -z, --gzip                     Compress the archive using gzip
  -h, --help                     display help for command
```
