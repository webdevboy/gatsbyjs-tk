// import React from "react"

// import Layout from "../../components/Layout"
// // import SEO from "../../components/SEO"
// import AllLayouts from "../../components/AllLayouts"

// const Page = ({ pageContext }) => {
//   const {
//     post: { title },
//   } = pageContext

//   const layouts = pageBuilder.layouts || []

//   return (
//     <Layout>
//       <SEO title={title} />
//       <h1> {title} </h1>

//       {console.log(post)}

//       {/* {layouts.map((layout, index) => {
//         return <AllLayouts key={index} layoutData={layout} />
//       })} */}
//     </Layout>
//   )
// }

// export default Page

module.exports = imports => {
  return `
// This is a temporary generated file. Changes to this file will be overwritten eventually!
import React from "react"

import Layout from "../src/components/Layout"
import SEO from "../src/components/SEO"

// Sections
${imports
  .map(({ componentName, filePath }) => {
    if (componentName && filePath) {
      // console.log({ filePath })
      console.log(`../layouts/${componentName}`)

      // return `import ${componentName} from '${filePath}';`
      return `import ${componentName} from 'src/components/${componentName}';`
    }
  })
  .join("\n")}

const Post = ({ pageContext }) => {
  const {
    post: { title, components },
  } = pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      {layouts.map((layout, index) => {
        ${imports
          .map(({ componentName, layoutType }) => {
            return `
            if (layout.fieldGroupName === '${layoutType}') {
              return <${componentName} {...layout} key={index} />;
            }
          `
          })
          .join("\n")}
        })
      }
    </Layout>
  )
}

export default Post
  `
}
