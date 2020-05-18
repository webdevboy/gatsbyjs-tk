const path = require("path")

const { contentFields } = require("./src/queries/queries.js")

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      wordpress {
        articles {
          ${contentFields}
        }
        events {
          ${contentFields}
        }
      }
    }
  `)

  if (!data || !data.wordpress) return null

  if (data.wordpress.articles && data.wordpress.articles.nodes) {
    data.wordpress.articles.nodes.forEach(article => {
      actions.createPage({
        path: article.uri,
        component: path.resolve("./src/components/templates/article.js"),
        context: {
          ...article,
          id: article.id,
          slug: article.uri,
          title: article.title,
        },
      })
    })
  }

  if (data.wordpress.events && data.wordpress.events.nodes) {
    data.wordpress.events.nodes.forEach(event => {
      actions.createPage({
        path: event.uri,
        component: path.resolve("./src/components/templates/event.js"),
        context: {
          ...event,
          id: event.id,
          slug: event.uri,
          title: event.title,
        },
      })
    })
  }
}

// ./gatsby-node.js
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*"
    // Update the page.
    createPage(page)
  }
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
    })
  }
}
