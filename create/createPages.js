const { getAllLayoutsData } = require("./utils")

const pageTemplate = require.resolve("../src/templates/page/")

const { PageTemplateFragment } = require("../src/templates/page/data")

const GET_PAGES = layouts => `
  ${PageTemplateFragment(layouts)}
  
  query GET_PAGES($first:Int $after:String) {
    wordpress {
      pages(first: $first after: $after) {
        nodes {                
          ...PageTemplateFragment
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
module.exports = async ({ actions, graphql, reporter }) => {
  const layouts = getAllLayoutsData("page")
  const allPages = []

  // TODO: Implement logic to distinguish Posts/Pages
  // const template = isPost ? postTemplate : pageTemplate;
  const component = pageTemplate

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
  const fetchPages = async () =>
    /**
     * Fetch pages using the GET_PAGES query and the variables passed in.
     */
    await graphql(GET_PAGES(layouts)).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        wordpress: {
          pages: { nodes },
        },
      } = data

      /**
       * Map over the post for later creation
       */
      nodes && nodes.map(page => allPages.push(page))

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPages
    })

  /**
   * Kick off our `fetchPages` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPages().then(wpPages => {
    wpPages &&
      wpPages.map(context => {
        let path = `/${context.slug}/`

        /**
         * If the page is the front page, the page path should not be the uri,
         * but the root path '/'.
         */
        if (context.isFrontPage) {
          path = "/"
        }

        createPage({ path, component, context })

        reporter.info(`created: ${context.slug}`)
      })

    reporter.info(`# -----> TOTAL: ${wpPages.length}`)
  })
}
