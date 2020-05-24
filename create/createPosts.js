const { getAllLayoutsData } = require("./utils")

const postTemplate = require.resolve("../src/templates/post/")
// const pageTemplate = require.resolve("src/templates/page/")

const { PostTemplateFragment } = require("../src/templates/post/data")

const GET_POSTS = layouts => `
  ${PostTemplateFragment(layouts)}
  
  query GET_POSTS($first:Int $after:String) {
    wordpress {
        posts(first: $first after: $after) {
          nodes {                
            ...PostTemplateFragment
          }
        }
    }
  }
`

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {
  const layouts = getAllLayoutsData()
  const allPosts = []

  // TODO: Implement logic to distinguish Posts/Pages
  // const template = isPost ? postTemplate : pageTemplate;
  const component = postTemplate

  /**
   * This is the method from Gatsby that we're going
   * to use to create pages in our static site.
   */
  const { createPage } = actions
  /**
   * Fetch pages method. This accepts variables to alter
   * the query. The variable `first` controls how many items to
   * request per fetch and the `after` controls where to start in
   * the dataset.
   *
   * @param variables
   * @returns {Promise<*>}
   */
  const fetchPosts = async () =>
    /**
     * Fetch pages using the GET_PAGES query and the variables passed in.
     */
    await graphql(GET_POSTS(layouts)).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        wordpress: {
          posts: { nodes },
        },
      } = data

      /**
       * Map over the post for later creation
       */
      nodes && nodes.map(post => allPosts.push(post))

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPosts
    })

  /**
   * Kick off our `fetchPosts` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPosts().then(wpPosts => {
    wpPosts &&
      wpPosts.map(context => {
        let path = `/${context.slug}/`

        /**
         * If the page is the front page, the page path should not be the uri,
         * but the root path '/'.
         */
        // if (page.isFrontPage) {
        //   path = "/"
        // }

        createPage({ path, component, context })

        reporter.info(`created: ${context.slug}`)
      })

    reporter.info(`# -----> TOTAL: ${wpPosts.length}`)
  })
}
