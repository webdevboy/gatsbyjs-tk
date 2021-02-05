
const postsGql = layouts => {
  return `
  posts(first: 500) {
    nodes {
        id
        slug
        title
        uri
        featuredImage {
          sourceUrl
        }
        author {
            id
            name
        }
        categories {
            nodes {
              name
            }
        }
        components {
            contents {
                ${layouts}
            }
        }
    }
  }
`
};


const CategoryTemplateFragment = layouts => `
  fragment CategoryTemplateFragment on WordPress_Category {
    id
    slug
    uri
    name
    description
    categoryComponents {
      components {
        ... on WordPress_Category_Categorycomponents_Components_Ad {
          adUrl
          fieldGroupName
          desktopAd {
            sourceUrl
          }
          mobileAd {
            sourceUrl
          }
          tabletAd {
            sourceUrl
          }
        }
      }
    }
    language {
      code
      name
      slug
    }
    translations {
      name
      language {
        slug
      }
      ${postsGql(layouts)}
    }
    ${postsGql(layouts)}
  }
`

module.exports.CategoryTemplateFragment = CategoryTemplateFragment
