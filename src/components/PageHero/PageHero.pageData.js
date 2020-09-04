module.exports = () => {
  return `
    ... on WordPress_Page_Components_Contents_HomepageHero {
      fieldGroupName
      overlay
      logo {
        sourceUrl
        altText
      }
      image {
        sourceUrl
        altText
      }
      mobileImage {
        sourceUrl
        altText
      }
    }
  `
}
