import React from "react"

import Layout from "../../components/Layout"
import SEO from "../../components/SEO"
import AllLayouts from "../../components/AllLayouts"

const Post = ({ pageContext }) => {
  const { title, components } = pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      <SEO title={title || "Untitled"} />
      {layouts.map((layout, index) => (
        <AllLayouts key={index} layoutData={layout} />
      ))}
    </Layout>
  )
}

export default Post
