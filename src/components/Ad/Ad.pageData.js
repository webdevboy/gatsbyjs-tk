module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_Ad {
    fieldGroupName
    adUrl
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
