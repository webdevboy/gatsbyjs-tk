fs-posix
=====

[![NPM version](https://img.shields.io/npm/v/fs-posix.svg?style=flat-square)](https://www.npmjs.com/package/fs-posix)
[![Travis](https://img.shields.io/travis/gucong3000/fs-posix.svg?&label=Linux)](https://travis-ci.org/gucong3000/fs-posix)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/fs-posix.svg?&label=Windows)](https://ci.appveyor.com/project/gucong3000/fs-posix)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/fs-posix.svg)](https://codecov.io/gh/gucong3000/fs-posix)
[![David](https://img.shields.io/david/gucong3000/fs-posix.svg)](https://david-dm.org/gucong3000/fs-posix)

Add cross-platform path support for Node file system.

## Why

- Add [POSIX](https://en.wikipedia.org/wiki/POSIX) style path support for Windows.
  - POSIX style root path will be convert to Git install directory.
  - Support for [the Cygwin mount table](https://cygwin.com/cygwin-ug-net/using.html#mount-table).
  - Support for [The cygdrive path prefix](https://cygwin.com/cygwin-ug-net/using.html#cygdrive).
- Add Windows style path support for [WSL](https://docs.microsoft.com/windows/wsl).
- Add tilde path prefix support.

## Install

```bash
npm install --save fs-posix
```

## Usage

```js
require("fs-posix");              // Must load before `fs-extra`
const fs = require("fs");
fs.readFileSync("~/.npmrc");      // Returns the contents of `.npmrc` in home folder
fs.readFileSync("/etc/hosts");    // Returns the contents of `hosts` in etc folder
fs.readFileSync("/tmp/test.log")  // Returns the contents of `test.log` in temp folder
```
