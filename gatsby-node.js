const create = require("./create/create")
const fs = require("fs-extra")
const path = require("path")

exports.createPagesStatefully = async ({ graphql, actions, reporter }) => {
  await create({ actions, graphql, reporter })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
      // module: {
      //   rules: stage === 'build-html'
      //     ? [
      //         {
      //           test: /react-scroll-parallax/,
      //           use: loaders.null(),
      //         }
      //       ]
      //       : []
      //   },
    })
  }
}

exports.onPostBuild = () => {
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales")
  )
}
