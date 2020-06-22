const articleGql = `
  ... on WordPress_Post {
    id
    title
    slug
    uri
    categories {
      nodes {
        name
      }
    }
    components {
      contents {
        ... on WordPress_Post_Components_Contents_ArticleHero {
          authors
          byline
          title
          heroImage {
            sourceUrl
          }
        }
      }
    }
  }
`

module.exports = () => `
... on WordPress_Page_Components_Contents_Chefs {
  fieldGroupName
  column1 {
    ${articleGql}
  }
  column2 {
    ${articleGql}
  }
  column3 {
    ${articleGql}
  }
}
`
