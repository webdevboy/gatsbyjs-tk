const CategoryTemplateFragment = layouts => `
  fragment CategoryTemplateFragment on WordPress_Category {
    id
    slug
    uri
    name
    description
    posts {
        nodes {
            id
            slug
            title
            uri
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
  }
`

module.exports.CategoryTemplateFragment = CategoryTemplateFragment
