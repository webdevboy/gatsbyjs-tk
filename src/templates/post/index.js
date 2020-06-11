import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PostLayouts from "src/components/PostLayouts"

const filterCategories = categories => {
  const cats = categories.nodes.length ? categories.nodes : null

  if (!cats) {
    return null
  }

  return cats.filter(
    cat => cat.name !== "Uncategorized" && cat.name !== "Featured"
  )
}

const Post = ({ pageContext }) => {
  const { title, components, categories } = pageContext

  const layouts = components.contents || []

  return (
    <Layout theme={pageContext.themeSelect.themeSelect}>
      <SEO title={title || "Untitled"} />
      {layouts.map((layout, index) => (
        <PostLayouts
          key={index}
          layoutData={layout}
          categories={filterCategories(categories)}
          theme={pageContext.themeSelect.themeSelect}
        />
      ))}
    </Layout>
  )
}

export default Post
