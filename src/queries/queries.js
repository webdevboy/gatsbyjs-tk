const mediaFields = `
  sourceUrl
  altText
`

const themeSelectFields = `
  themeSelect {
    fieldGroupName
    themeSelect
  }
`

const heroFields = `
  heroFieldGroup {
    heroImage {
      ${mediaFields}
    }
    title
    byline
    authors
  }
`

const columnCopyFields = `
  columnCopyFieldGroups {
    firstColumnContent
    secondColumnContent
  }
`

const fullscreenImageFields = `
  fullscreenImageFieldGroup {
    image {
      ${mediaFields}
    }
    text {
      popup {
        title
        content
      }
      floatingText {
        text
        position
      }
    }
    cutline
  }
`

const halfAndHalfFields = `
  halfAndHalfFieldGroup {
    imageGroup {
      backgroundColor
      image {
        ${mediaFields}
      }
    }
    textGroup {
      backgroundColor
      headline
      copy
    }
  }
`

const halfAndHalfReversedFields = `
  halfAndHalfReversedFieldGroup {
    textGroupReversed {
      backgroundColorReversed
      headlineReversed
      copyReversed
    }
    imageGroupReversed {
      backgroundColorReversed
      imageReversed {
        ${mediaFields}
      }
    }
  }
`

const quoteFields = `
  quoteFieldGroup {
    quote
  }
`

const iconGroupFields = `
  iconFieldGroups {
    iconGroups {
      icon {
        ${mediaFields}
      }
      iconHeadline
      iconSubHead
      iconText
    }
    iconGroups2 {
      icon {
        ${mediaFields}
      }
      iconHeadline
      iconSubHead
      iconText
    }
    iconGroups3 {
      icon {
        ${mediaFields}
      }
      iconHeadline
      iconSubHead
      iconText
    }
  }
`

const centerPhotoFields = `
  centerPhotoFieldGroup {
    backgroundImage {
      ${mediaFields}
    }
    popup {
      title
      text
    }
    centerPhotoCutline
  }
`

const photoLayoutFields = `
  photoLayoutFieldGroup {
    photoLayout {
      photoLandscape {
        ${mediaFields}
      }
      landscapeCutline
      photoPortrait {
        ${mediaFields}
      }
      portraitCutline
    }
  }
`

const photoLayout1X2Fields = `
photoLayout1X2 {
  photoLayout1x2 {
    photo1 {
      image {
        ${mediaFields}
      }
      cutline
    }
    photo2 {
      image {
        ${mediaFields}
      }
      cutline
    }
  }
}
`

const photoLayout1X3Fields = `
  photoLayout1X3 {
    photoLayout1x3 {
      group1 {
        image {
          ${mediaFields}
        }
        cutline
      }
      group2 {
        image {
          ${mediaFields}
        }
        cutline
      }
      group3 {
        image {
          ${mediaFields}
        }
        cutline
      }
    }
  }
`

// const categoryFields = `
//   categories {
//     nodes {
//       name
//     }
//   }
// `

const languageFields = `
  language {
    code
  }
`

const contentFields = `
  nodes {
    id
    uri
    slug
    ${languageFields}
    ${themeSelectFields}
    ${heroFields}
    ${columnCopyFields}
    ${fullscreenImageFields}
    ${halfAndHalfFields}
    ${halfAndHalfReversedFields}
    ${quoteFields}
    ${iconGroupFields}
    ${centerPhotoFields}
    ${photoLayoutFields}
    ${photoLayout1X2Fields}
    ${photoLayout1X3Fields}
  }
`

module.exports = {
  themeSelectFields,
  heroFields,
  columnCopyFields,
  fullscreenImageFields,
  halfAndHalfFields,
  halfAndHalfReversedFields,
  quoteFields,
  iconGroupFields,
  centerPhotoFields,
  photoLayoutFields,
  photoLayout1X2Fields,
  photoLayout1X3Fields,
  languageFields,
  contentFields,
}
