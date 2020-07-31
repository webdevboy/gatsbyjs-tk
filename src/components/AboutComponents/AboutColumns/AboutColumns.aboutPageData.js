module.exports = () => {
  return `
    ... on  WordPress_Page_Components_AboutContents_AboutColumns {
      fieldGroupName
      columns {
        columnTitle
        columnBlocks {
          columnBlockDescription
          columnBlockTitle
        }
      }
    }
  `;
};
