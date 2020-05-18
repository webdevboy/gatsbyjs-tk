import React from "react"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Props come from gatsby-node
function Article({ pageContext }) {
  console.log(pageContext)
  return (
    <Layout theme={pageContext.themeSelect.themeSelect || "light"}>
      <h1>{pageContext.heroFieldGroup.title || "No Title Entered"}</h1>
    </Layout>
  )
}

export default Article
