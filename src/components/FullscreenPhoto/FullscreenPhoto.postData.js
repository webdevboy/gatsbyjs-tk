module.exports = () => {
  return `
    ... on WordPress_Post_Components_Contents_FullscreenPhoto {
      fieldGroupName
      headlineOne
      headlineOneColor
      headlineTwo
      headlineTwoColor
      desktopImage {
        altText
        sourceUrl
      }
      tabletImage {
        altText
        sourceUrl
      }
      mobileImage {
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
