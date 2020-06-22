const PostTemplateFragment = layouts => `
  fragment PostTemplateFragment on WordPress_Post {
    id
    title
    slug
    language {
      code
    }
    themeSelect {
      fieldGroupName
      themeSelect
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
`

module.exports.PostTemplateFragment = PostTemplateFragment
