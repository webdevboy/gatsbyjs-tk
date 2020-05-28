module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_FiftyFifty {
      backgroundColor
      copyBlock
      fieldGroupName
      headline
      link
      preHeadline
      reverse
      image {
        sourceUrl
        altText
      }
    }
  `
}
