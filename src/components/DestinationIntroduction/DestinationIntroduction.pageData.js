
module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_DestinationIntroduction {
    fieldGroupName
    destinationIntroductionBody {
      areaCodeIconLabel
      backgroundColor
      bodyCopy
      copyColor
      countryIconLabel
      destinationIntroductionTitle
      languageIconLabel
      mainAirportIconLabel
    }
  }
  `;
};
