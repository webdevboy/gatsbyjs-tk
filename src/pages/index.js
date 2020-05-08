import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "src/components/layout"

// const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>
const IndexPage = () => (
  <Layout>
    {/* <SEO title="Home" /> */}
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

// export const query = graphql`
//   query RootQueryToPageConnection {
//     wordpress {
//       posts {
//         nodes {
//           hero {
//             blockAuthor
//             blockCopy
//             blockName
//             blockTitle
//             heroBackground {
//               id
//               link
//               srcSet
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default IndexPage
