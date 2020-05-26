import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PostLayouts from "src/components/PostLayouts"

const Post = ({ pageContext }) => {
  const { title, components } = pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      <SEO title={title || "Untitled"} />
      {layouts.map((layout, index) => (
        <PostLayouts key={index} layoutData={layout} />
      ))}
    </Layout>
  )
}

export default Post
