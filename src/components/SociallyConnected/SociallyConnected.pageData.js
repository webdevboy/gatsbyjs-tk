const articleGql = `
... on WordPress_Post {
  id
  title
  slug
  uri
  featuredImage {
    sourceUrl
  }
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
        fieldGroupName
      }
    }
  }
}
`

module.exports = () => `
  ... on WordPress_Page_Components_Contents_SociallyConnected {
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
