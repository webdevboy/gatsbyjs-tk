const ArticleGql = `
  ... on WordPress_Post {
    id
    slug
    uri
    title
    categories {
      nodes {
        name
      }
    }
    featuredImage {
      sourceUrl
    }
    components {
      contents {
        ... on WordPress_Post_Components_Contents_ArticleHero {
          byline
          title
          heroImage {
            sourceUrl
          }
          mobileHeroImage {
            sourceUrl
          }
        }
      }
    }
  }
`;

module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_DestionationSubNavigation {
    fieldGroupName
    navigationItems {
      navigationItem {
        article {
          ${ArticleGql}
        }
        fieldGroupName
        title
        titleColor
        titleIdleOpacity
        titleHoverOpacity
        image {
          sourceUrl
        }
        imageRollover {
          sourceUrl
        }
      }
    }
  }
  `;
};
