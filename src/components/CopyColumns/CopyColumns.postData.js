module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_Columns {
      fieldGroupName
      columns {
        columnCopy
        mobileCopy
        fieldGroupName
        headline
        subheader
        icon {
          sourceUrl
          altText
        }
      }
    }
  `
}
