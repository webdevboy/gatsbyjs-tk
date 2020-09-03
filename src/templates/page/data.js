const PageTemplateFragment = (layouts, aboutLayouts, eventLayouts) => `
  fragment PageTemplateFragment on WordPress_Page {
    id
    title
    slug
    uri
    isFrontPage
    language {
      code
      slug
    }
    translations {
      id
      title
      slug
      uri
      language {
        code
        slug
      }
      components {
        contents {
          ${layouts}
        }
        aboutContents {
          ${aboutLayouts}
        }
        eventContents {
          ${eventLayouts}
        }
      }
    }
    components {
      contents {
        ${layouts}
      }
      aboutContents {
        ${aboutLayouts}
      }
      eventContents {
        ${eventLayouts}
      }
    }
  }
`;

module.exports.PageTemplateFragment = PageTemplateFragment;
