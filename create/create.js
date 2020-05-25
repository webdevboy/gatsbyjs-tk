const { getAllLayoutsData } = require("./utils")

const pageTemplate = require.resolve("../src/templates/page/")
const postTemplate = require.resolve("../src/templates/post/")

const { PageTemplateFragment } = require("../src/templates/page/data")
const { PostTemplateFragment } = require("../src/templates/post/data")

const GET_PAGES = () => `
  ${PageTemplateFragment(getAllLayoutsData("page"))}
  
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

const GET_POSTS = () => `
  ${PostTemplateFragment(getAllLayoutsData("post"))}
  
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
module.exports = async ({ actions, graphql, reporter }) => {
  const allPages = []
  const allPosts = []

  const postsQuery = GET_POSTS()
  const pagesQuery = GET_PAGES()

  /**
   * This is the method from Gatsby that we're going
   * to use to create pages in our static site.
   */
  const { createPage } = actions

  /**
   * Fetch posts.
   *
   * @returns {Promise<*>}
   */
  const fetchPosts = async () =>
    await graphql(postsQuery).then(({ data }) => {
      // Extract the data from the GraphQL query results
      const {
        wordpress: {
          posts: { nodes },
        },
      } = data

      // Map over the post for later creation
      nodes && nodes.map(post => allPosts.push(post))

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPosts
    })

  /**
   * Fetch pages.
   *
   * @returns {Promise<*>}
   */
  const fetchPages = async () =>
    await graphql(pagesQuery).then(({ data }) => {
      // Extract the data from the GraphQL query results
      const {
        wordpress: {
          pages: { nodes },
        },
      } = data

      // Map over the post for later creation
      nodes && nodes.map(page => allPages.push(page))

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPages
    })

  /**
   * Kick off our `fetchPages`/`fetchPosts` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPosts().then(posts => {
    posts &&
      posts.map(context => {
        let path = `/${context.slug}/`

        /**
         * If the page is the front page, the page path should not be the uri,
         * but the root path '/'.
         */
        // if (context.isFrontPage) {
        //   path = "/"
        // }

        createPage({ path, component: postTemplate, context })

        reporter.info(`created: ${context.slug}`)
      })

    reporter.info(`# -----> TOTAL: ${posts.length}`)
  })

  await fetchPages().then(pages => {
    pages &&
      pages.map(context => {
        let path = `/${context.slug}/`

        /**
         * If the page is the front page, the page path should not be the uri,
         * but the root path '/'.
         */
        if (context.isFrontPage) {
          path = "/"
        }

        createPage({ path, component: pageTemplate, context })

        reporter.info(`created: ${context.slug}`)
      })

    reporter.info(`# -----> TOTAL: ${pages.length}`)
  })
}
