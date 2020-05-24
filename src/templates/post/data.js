// pageId
// content
// uri
// slug
// isFrontPage
// featuredImage {
//   sourceUrl
//   altText
// }
const PostTemplateFragment = layouts => `
  fragment PostTemplateFragment on WordPress_Post {
    id
    title
    slug
    components {
      contents {
        ${layouts}
      }
    }
  }
`

module.exports.PostTemplateFragment = PostTemplateFragment
