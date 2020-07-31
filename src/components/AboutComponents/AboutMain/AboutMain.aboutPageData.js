module.exports = () => {
  return `
    ... on WordPress_Page_Components_AboutContents_AboutMain {
      aboutMainDescription {
        paragraph
      }
      aboutMainImageAuthor
      fieldGroupName
      aboutMainImage {
        sourceUrl
      }
    }
  `;
};
