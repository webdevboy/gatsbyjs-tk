module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_Columns {
      fieldGroupName
      columns {
        columnCopy
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
