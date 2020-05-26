const PageTemplateFragment = layouts => `
  fragment PageTemplateFragment on WordPress_Page {
    id
    title
    slug
    isFrontPage
    language {
      code
    }
    themeSelect {
      fieldGroupName
      themeSelect
    }
    components {
      contents {
        ${layouts}
      }
    }
  }
`

module.exports.PageTemplateFragment = PageTemplateFragment
