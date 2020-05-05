"use strict";

var path = require("path");

var os = require("os");

var wslpath;
var gitWin;

function win32(file) {
  return path.posix.isAbsolute(file) ? gitWin.toWin32(file) : posix(file);
}

function posix(file) {
  if (/^~(?=\/|$)/.test(file)) {
    file = path.join(process.env.HOME || os.homedir(), file.slice(1));
  }

  return file;
}

function wsl(file) {
  return wslpath(file) || posix(file);
}

switch (process.platform) {
  case "win32":
    {
      module.exports = win32;
      gitWin = require("git-win");

      require("./win32-resolve");

      break;
    }

  case "linux":
    {
      if (/\bMicrosoft\b/.test(os.release())) {
        module.exports = wsl;
        wslpath = require("./wslpath");

        require("./wsl-resolve");

        break;
      }
    }
  // eslint-disable-next-line no-fallthrough

  default:
    {
      module.exports = posix;
    }
}