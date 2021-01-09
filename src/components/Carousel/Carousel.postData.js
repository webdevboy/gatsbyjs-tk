module.exports = () => {
    return `
      ... on WordPress_Post_Components_Contents_Carousel {
        fieldGroupName
        carousel {
          fieldGroupName
          smallHeadline
          largeHeadline
          carouselImage {
            sourceUrl
            altText
          }
          copy
          buttonCopy
          article {
            ... on WordPress_Post {
                id
                uri
            }
          }
        }
      }
    `
}
