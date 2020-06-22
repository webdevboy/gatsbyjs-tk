module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_ImageLayouts {
      cutlineOne
      cutlineTwo
      fieldGroupName
      split
      imageTwo {
        altText
        sourceUrl
      }
      imageOne {
        altText
        sourceUrl
      }
    }
  `
}
