import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PageLayouts from "src/components/PageLayouts"

const Page = ({ pageContext }) => {
  const { title, components } = pageContext

  const layouts = components.contents || []

  return (
    <Layout theme={pageContext.themeSelect.themeSelect}>
      <SEO title={title || "Untitled"} />
      {layouts.map((layout, index) => (
        <PageLayouts key={index} layoutData={layout} />
      ))}
    </Layout>
  )
}

export default Page
