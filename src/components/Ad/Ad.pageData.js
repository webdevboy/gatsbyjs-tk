module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_Ad {
    fieldGroupName
    mobileAd {
      sourceUrl
    }
    tabletAd {
      sourceUrl
    }
    desktopAd {
      sourceUrl
    }
  }
  `;
};
