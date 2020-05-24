const path = require("path")

module.exports.getAllLayoutsData = () => {
  const glob = require("glob")

  let allLayoutsString = ""

  const fileArray = glob.sync("./src/components/**/*.data.js")

  fileArray.forEach(function (file) {
    let queryStringFunction = require(path.resolve(file))
    allLayoutsString = allLayoutsString + " \n " + queryStringFunction()
  })

  return allLayoutsString
}
