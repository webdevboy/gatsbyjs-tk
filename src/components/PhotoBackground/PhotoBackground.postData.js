module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_LargePhoto {
      cutline
      fieldGroupName
      floatingBodyText
      floatingHeadline
      floatingPreHeadline
      floatingTextPosition
      fullScreen
      image {
        altText
        sourceUrl
      }
      linkText
      linkUrl
      popup {
        fieldGroupName
        headline
        popupCopy
      }
    }
  `
}
