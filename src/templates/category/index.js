import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import CategoryLayouts from "src/components/CategoryLayouts"

const Category = ({ pageContext }) => {
  const { title, components } = pageContext
  console.log(pageContext);
  const layouts = components.contents || []

  return (
      <Layout theme={pageContext.themeSelect.themeSelect}>
        <SEO title={title || "Untitled"} />
        {layouts.map((layout, index) => {
            return <CategoryLayouts key={index} layoutData={layout} theme={pageContext.themeSelect.themeSelect} />
        })}
    </Layout>
  )
}

export default Category;
