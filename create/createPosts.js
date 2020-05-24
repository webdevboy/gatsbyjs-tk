const _uniqBy = require("lodash.uniqby")
const _isEmpty = require("lodash.isempty")

const {
  getAllLayoutsData,
  createTemplate,
  createPostWithTemplate,
} = require("./utils")

const filePathToComponents = "../src/components/"
const templateCacheFolder = ".template-cache"
const layoutMapping = require("./layouts")
// const postTemplate = require.resolve("../src/templates/page/template.js")

const postTemplate = require.resolve("../src/templates/post/index.js")

// const { FluidImageFragment } = require("../src/templates/fragments")
const { PostTemplateFragment } = require("../src/templates/post/data")

// # This will make sure to only get the parent nodes and no children
//             where: {
//                 parent: null
//             }

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

const allPosts = []

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {
  const layouts = getAllLayoutsData()

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
     * Fetch pages using the GET_POSTS query and the variables passed in.
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

      // console.log({ wordpress })

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
   * Kick off our `fetchPages` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPages().then(wpPosts => {
    wpPosts &&
      wpPosts.map(post => {
        let postPath = `${post.slug}`

        /**
         * If the page is the front page, the page path should not be the uri,
         * but the root path '/'.
         */
        // if (post.isFrontPage) {
        //   postPath = "/"
        // }

        /**
         * Filter out empty objects. This can happen, if for some reason you
         * don't query for a specific layout (UnionType), that is potentially
         * there.
         */
        const layouts = post.components.contents.filter(el => {
          return !_isEmpty(el)
        })

        let mappedLayouts = []

        if (layouts && layouts.length > 0) {
          /**
           * Removes all duplicates, as we only need to import each layout once
           */
          const UniqueLayouts = _uniqBy(layouts, "fieldGroupName")

          console.log({ UniqueLayouts })

          /**
           * Maps data and prepares object for our template generation.
           */
          mappedLayouts = UniqueLayouts.map(layout => {
            return {
              layoutType: layout.fieldGroupName,
              componentName: layoutMapping[layout.fieldGroupName],
              filePath:
                filePathToComponents + layoutMapping[layout.fieldGroupName],
            }
          })
        }

        createPostWithTemplate({
          createTemplate: createTemplate,
          templateCacheFolder: templateCacheFolder,
          postTemplate: postTemplate,
          post: post,
          postPath: postPath,
          mappedLayouts: mappedLayouts,
          createPage: createPage,
          reporter: reporter,
        })
      })

    reporter.info(`# -----> PAGES TOTAL: ${wpPosts.length}`)
  })
}
