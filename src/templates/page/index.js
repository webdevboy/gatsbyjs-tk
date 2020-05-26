import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PageLayouts from "src/components/PageLayouts"

const Page = props => {
  const { title, components } = props.pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      <SEO title={title || "Untitled"} />
      {layouts.map((layout, index) => (
        <PageLayouts key={index} layoutData={layout} />
      ))}
    </Layout>
  )
}

export default Page
