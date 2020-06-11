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
  fragment CategoryTemplateFragment on WordPress_Category {
    id
    slug
    uri
    name
    description
    posts {
        nodes {
            id
            slug
            title
            uri
            author {
                id
                name
            }
            categories {
                nodes {
                  name
                }
            }
            components {
                contents {
                    ${layouts}
                }
            }
        }
    }
  }
`


// childPages {
//     nodes {
//         id
//         title
//         slug
//         isFrontPage
//         language {
//             code
//         }
//         themeSelect {
//             fieldGroupName
//             themeSelect
//         }
//         components {
//             contents {
//                 ${layouts}
//             }
//         }
//         ${SubCategoryTemplate(layouts)}
//     }
// }




module.exports.CategoryTemplateFragment = CategoryTemplateFragment
