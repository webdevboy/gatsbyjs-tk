"use strict";

var wslpath = require("./wslpath");

var path = require("path");

var rawResolve = path.resolve;

function resolve() {
  var args = arguments;

  for (var i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] !== "string" || path.posix.isAbsolute(args[i])) {
      break;
    } else if (path.win32.isAbsolute(args[i])) {
      var absPath = wslpath(Array.prototype.slice.call(args, i).join("\\"));

      if (absPath) {
        return absPath;
      }

      break;
    }
  }

  return rawResolve.apply(path, args);
}

;
path.resolve = resolve;