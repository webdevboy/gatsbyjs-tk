module.exports = () => {
  return `
    ... on WordPress_Page_Components_Contents_HomepageHero {
      fieldGroupName
      logo {
        sourceUrl
        altText
      }
      image {
        sourceUrl
        altText
      }
    }
  `
}
