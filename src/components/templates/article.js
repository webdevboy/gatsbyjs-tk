import React from "react"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Props come from gatsby-node
function Article({ pageContext }) {
  return (
    <Layout>
      <h1>{pageContext.heroFieldGroup.title || "No Title Entered"}</h1>
    </Layout>
  )
}

export default Article
