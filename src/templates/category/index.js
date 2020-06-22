import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import CategoryLayouts from "src/components/CategoryLayouts"

const Category = ({ pageContext }) => {
  const { name } = pageContext

  return (
    <Layout>
      <SEO title={name || "Untitled"} />
      <CategoryLayouts categoryData={pageContext} />
    </Layout>
  )
}

export default Category
