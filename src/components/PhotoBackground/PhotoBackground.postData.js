module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_LargePhoto {
      cutline
      fieldGroupName
      floatingBodyText
      floatingHeadline
      floatingTextPosition
      fullScreen
      image {
        altText
        sourceUrl
      }
      popup {
        fieldGroupName
        headline
        popupCopy
      }
    }
  `
}
