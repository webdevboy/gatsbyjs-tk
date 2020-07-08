
const postsGql = layouts => {
  return `
  posts {
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
