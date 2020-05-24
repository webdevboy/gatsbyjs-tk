module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_ArticleHero {
      fieldGroupName
      authors
      byline
      title
      heroImage {
        sourceUrl
        altText
      }
    }
  `
}
