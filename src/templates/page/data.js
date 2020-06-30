const PageTemplateFragment = (layouts) => `
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
      }
    }
    components {
      contents {
        ${layouts}
      }
    }
  }
`;

module.exports.PageTemplateFragment = PageTemplateFragment;
