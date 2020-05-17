const path = require("path")

const {
  themeSelectFields,
  heroFields,
  columnCopyFields,
  fullscreenImageFields,
  halfAndHalfFields,
  halfAndHalfReversedFields,
  quoteFields,
  iconGroupFields,
  centerPhotoFields,
  photoLayoutFields,
  photoLayout1X2Fields,
  photoLayout1X3Fields,
} = require("./src/queries/queries.js")

const query = `
  query {
    wordpress {
      posts(where: { status: PUBLISH }) {
        nodes {
          uri
          ${themeSelectFields}
          ${heroFields}
          ${columnCopyFields}
          ${fullscreenImageFields}
          ${halfAndHalfFields}
          ${halfAndHalfReversedFields}
          ${quoteFields}
          ${iconGroupFields}
          ${centerPhotoFields}
          ${photoLayoutFields}
          ${photoLayout1X2Fields}
          ${photoLayout1X3Fields}
        }
      }
    }
  }
`

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    ${query}
  `)

  if (!data || !data.wordpress) return null

  data.wordpress.posts.nodes.forEach(post => {
    console.log({ post })

    actions.createPage({
      path: `posts${post.uri}`,
      component: path.resolve("./src/components/templates/post.js"),
      context: {
        ...post,
        id: post.id,
        slug: post.uri,
        title: post.title,
      },
    })
  })
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

  if (page.path.match(/^\/posts/)) {
    page.matchPath = "/posts/*"
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
