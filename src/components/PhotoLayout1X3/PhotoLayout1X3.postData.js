module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_1x3Layout {
      fieldGroupName
      content {
        cutline
        image {
          altText
          sourceUrl
        }
      }
    }
  `
}
