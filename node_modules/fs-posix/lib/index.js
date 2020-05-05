"use strict";

var pathPosix = require("./path-posix");

var path = require("path");

var fs = require("fs");

function fixArgs(args) {
  if (args[0] && typeof args[0] === "string") {
    args[0] = pathPosix(args[0]);
  }

  return args;
}

function fix(obj, fnName) {
  var fn = obj[fnName];

  if (fn && typeof fn === "function") {
    obj[fnName] = Object.assign(Object.defineProperty(function () {
      return fn.apply(this, fixArgs(arguments));
    }, "name", {
      value: fn.name
    }), fn);
  }
} // eslint-disable-next-line node/no-deprecated-api


var makeLong = path.toNamespacedPath && path.toNamespacedPath === path._makeLong;
fix(fs.realpathSync, "native");
fix(fs.realpath, "native");
fix(fs, "realpathSync");
fix(fs, "realpath");
fix(path, "toNamespacedPath");

if (makeLong) {
  // eslint-disable-next-line node/no-deprecated-api
  path._makeLong = path.toNamespacedPath;
} else {
  fix(path, "_makeLong");
}

fix(process, "chdir");
module.exports = fs;