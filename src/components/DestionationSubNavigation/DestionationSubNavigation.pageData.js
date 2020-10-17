const postHeroData = require('../PostHero/PostHero.postData.js');
const quoteData = require('../Quote/Quote.postData.js');
const copyColumnsData = require('../CopyColumns/CopyColumns.postData.js');
const photoBackgroundData = require('../PhotoBackground/PhotoBackground.postData.js');
const photoLayoutData = require('../PhotoLayout/PhotoLayout.postData.js');
const fiftyFiftyData = require('../FiftyFifty/FiftyFifty.postData.js');
const photoLayout1X3Data = require('../PhotoLayout1X3/PhotoLayout1X3.postData.js');
const tastingNotesData = require('../TastingNotes/TastingNotes.postData.js');
const spacerData = require('../Spacers/Spacer.postData.js');

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
        ${postHeroData()}
        ${quoteData()}
        ${copyColumnsData()}
        ${photoBackgroundData()}
        ${photoLayoutData()}
        ${fiftyFiftyData()}
        ${photoLayout1X3Data()}
        ${tastingNotesData()}
        ${spacerData()}
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
