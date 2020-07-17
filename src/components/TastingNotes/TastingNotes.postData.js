module.exports = () => `
... on WordPress_Post_Components_Contents_TastingNotes {
  headline
  fieldGroupName
  notes {
    note {
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
            ... on WordPress_Post_Components_Contents_CircleThumbnail {
              fieldGroupName
              isFeaturedImageRounded
            }
          }
        }
      }
    }
  }
}
`
