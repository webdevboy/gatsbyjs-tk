module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_FiftyFifty {
      copyBlock
      fieldGroupName
      headline
      image {
        altText
        sourceUrl
      }
      preHeadline
      reverse
      linkText
      linkUrl
      copyBackgroundColor
      imageBackgroundColor
    }
  `
}
