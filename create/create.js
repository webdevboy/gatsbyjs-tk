const path = require(`path`);
const { getAllLayoutsData, getCategoryLayoutData, getAllAboutLayoutsData } = require("./utils")

const pageTemplate = require.resolve("../src/templates/page/")
const postTemplate = require.resolve("../src/templates/post/")
const categoryTemplate = require.resolve("../src/templates/category")

const { PageTemplateFragment } = require("../src/templates/page/data")
const { PostTemplateFragment } = require("../src/templates/post/data")
const { CategoryTemplateFragment } = require("../src/templates/category/data")

const GET_PAGES = () => `
  ${PageTemplateFragment(getAllLayoutsData("page"), getAllAboutLayoutsData())}
  
  query GET_PAGES($first:Int $after:String) {
    wordpress {
      pages(first: $first after: $after) {
        nodes {                
          ...PageTemplateFragment
        }
      }
      defaultLanguage {
        slug
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
      defaultLanguage {
        slug
      }
    }
  }
`

const GET_CATEGORIES = () => `
  ${CategoryTemplateFragment(getCategoryLayoutData())}

  query GET_PAGES($first:Int $after:String) {
    wordpress {
      categories(first: $first after: $after) {
        nodes {                
          ...CategoryTemplateFragment
        }
      }
      defaultLanguage {
        slug
      }
    }
  }
`
const getLangCode = (code, defaultCode) => {
  if(code === defaultCode) {
    return '';
  }
  return code;
}

const getPath = page => {
  if(page.isFrontPage) {
    return `/${page.language.slug === 'en' ? '' : page.language.slug}`;
  }
  return `${page.language.slug === 'en' ? '' : `/${page.language.slug}`}/${page.slug}`;
}

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }) => {
  const allPages = []
  const allPosts = []
  const allCategories = []

  const postsQuery = GET_POSTS()
  const pagesQuery = GET_PAGES()
  const categoriesQuery = GET_CATEGORIES()

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
    await graphql(postsQuery, { first: 1000 }).then(({ data }) => {
      if (!data || !data.wordpress) return allPosts;
      // Extract the data from the GraphQL query results
      const {
        wordpress: {
          posts,
          defaultLanguage,
        },
      } = data

      // Map over the post for later creation
      posts && posts.nodes && posts.nodes.map(post => allPosts.push({ post, defaultLanguage }))

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
    await graphql(pagesQuery, { first: 1000 }).then(({ data }) => {
      if (!data || !data.wordpress) return allPages;

      // Extract the data from the GraphQL query results
      const {
        wordpress: {
          pages: { nodes },
          defaultLanguage,
        },
      } = data
      // Map over the post for later creation
      nodes && nodes.map(page => allPages.push({ page, defaultLanguage }))

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

  const fetchCategories = async () =>
    await graphql(categoriesQuery, { first: 1000 }).then(({ data }) => {
      if (!data || !data.wordpress) return allCategories;
      const {
        wordpress: {
          categories: { nodes },
        },
      } = data

      nodes && nodes.map(page => allCategories.push(page))
      return allCategories
    })

  await fetchPosts().then(posts => {
    posts &&
      posts.map(context => {
        const { post, defaultLanguage } = context;
        // currently only handling translation in POSTS
        let path = post.language ? `${getLangCode(post.language.slug, defaultLanguage.slug)}/${post.slug}/` : `${post.slug}`

        createPage({ path, component: postTemplate, context: post })

        reporter.info(`created: ${post.slug}`)
      })

    reporter.info(`# -----> TOTAL: ${posts.length}`)
  })

  await fetchPages().then(pages => {
    pages &&
      pages.map(context => {
        const { page, defaultLanguage } = context;

        if(!page || !page.slug) return;

        createPage({ path: getPath(page), component: pageTemplate, context: page })

        if(page.translations && page.translations.length > 0 && page.isFrontPage && page.language.slug === 'en') {
          page.translations.map(pageTranslation => {
            const pageContext = { ...pageTranslation, isFrontPage: page.isFrontPage };
            if(pageContext.slug) {
              createPage({ path: getPath(pageContext), component: pageTemplate, context: pageContext });
            }
          })
        }

        
      })

    reporter.info(`# -----> TOTAL: ${pages.length}`)
  })

  await fetchCategories().then(categories => {
    categories &&
      categories.map(category => {
        createPage({
          path: decodeURIComponent(`${`${category.language.slug === 'en' ? '' : `/${category.language.slug}`}`}/category/${category.slug}`),
          component: categoryTemplate,
          context: category,
        });
        // if(category.translations && category.translations.length > 0) {
        //   category.translations.map(categoryTranslation => {
        //     createPage({
        //       path: `${categoryTranslation.language.slug}/category/${category.slug}`,
        //       component: categoryTemplate,
        //       context: categoryTranslation,
        //     });
        //   });
        // }
        reporter.info(`created: /category/${category.slug}`)
      })
  })
}
