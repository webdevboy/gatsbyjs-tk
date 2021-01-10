module.exports = () => {
    return `
      ... on WordPress_Post_Components_Contents_ImageSubnav {
        fieldGroupName
        imageSubnav {
          fieldGroupName
          article {
            ... on WordPress_Post {
                id
                uri
                subNavigationImage {
                  fieldGroupName
                  subNavigationImage {
                    altText
                    sourceUrl
                  }
                }
            }
          }
        }
      }
    `
}
