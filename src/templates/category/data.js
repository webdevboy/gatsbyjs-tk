const SubCategoryTemplate = layouts => `
    childPages {
        nodes {
            id
            title
            slug
            uri
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
    }
`;

const CategoryTemplateFragment = layouts => `
  fragment CategoryTemplateFragment on WordPress_Page {
    id
    slug
    childPages {
        nodes {
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
            ${SubCategoryTemplate(layouts)}
        }
    }
  }
`

module.exports.CategoryTemplateFragment = CategoryTemplateFragment
