import React from "react"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Components
import Hero from "src/components/Hero/hero"

// Props come from gatsby-node
function Article({ pageContext }) {
  const theme = pageContext.themeSelect.themeSelect || "light"
  return (
    <Layout theme={theme}>
      <Hero data={pageContext.heroFieldGroup} theme={theme} />
    </Layout>
  )
}

export default Article
