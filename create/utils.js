const path = require("path")

module.exports.getAllLayoutsData = type => {
    const glob = require("glob")

    let allLayoutsString = ""

    fileArray = type === "post"
        ? glob.sync("./src/components/**/*.postData.js")
        : glob.sync("./src/components/**/*.pageData.js");
    console.log(fileArray);
    fileArray.forEach(function (file) {
        let queryStringFunction = require(path.resolve(file))
        allLayoutsString = allLayoutsString + " \n " + queryStringFunction()
    });

    return allLayoutsString
};

module.exports.getCategoryLayoutData = () => {
    const glob = require("glob");

    let categoryLayoutString = "";

    fileArray = glob.sync("./src/components/**/*.categoryData.js");

    console.log(fileArray);
    fileArray.forEach(function (file) {
        let queryStringFunction = require(path.resolve(file))
        categoryLayoutString = categoryLayoutString + " \n " + queryStringFunction();
    });

    return categoryLayoutString;
};

