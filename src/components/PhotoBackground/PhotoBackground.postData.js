module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_LargePhoto {
      cutline
      fieldGroupName
      floatingBodyText
      floatingTextPosition
      floatingTextColor
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
  `;
};
