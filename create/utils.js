const path = require("path")

module.exports.getAllLayoutsData = type => {
  const glob = require("glob")

  let allLayoutsString = ""

  const fileArray =
    type === "post"
      ? glob.sync("./src/components/**/*.postData.js")
      : glob.sync("./src/components/**/*.pageData.js")

  fileArray.forEach(function (file) {
    let queryStringFunction = require(path.resolve(file))
    allLayoutsString = allLayoutsString + " \n " + queryStringFunction()
  })

  return allLayoutsString
}
