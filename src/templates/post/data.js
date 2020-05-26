const PostTemplateFragment = layouts => `
  fragment PostTemplateFragment on WordPress_Post {
    id
    title
    slug
    language {
      code
    }
    components {
      contents {
        ${layouts}
      }
    }
  }
`

module.exports.PostTemplateFragment = PostTemplateFragment
