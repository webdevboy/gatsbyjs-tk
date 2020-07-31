const PageTemplateFragment = (layouts, aboutLayouts) => `
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
      }
    }
    components {
      contents {
        ${layouts}
      }
      aboutContents {
        ${aboutLayouts}
      }
    }
  }
`;

module.exports.PageTemplateFragment = PageTemplateFragment;
