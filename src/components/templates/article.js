import React from "react"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Components
import Hero from "src/components/Hero/hero"
import ColumnCopy from "src/components/ColumnCopy/column-copy"
import Quote from "src/components/Quote/quote"
import ColumnIcon from "src/components/ColumnIcon/column-icon"
import Photo from "src/components/Photo/photo"
import PhotoLayout from "src/components/PhotoLayout/photo-layout"

// Props come from gatsby-node
function Article({ pageContext }) {
  const theme = pageContext.themeSelect.themeSelect || "light"
  console.log(pageContext)
  return (
    <Layout theme={theme} title={pageContext.heroFieldGroup.title || null}>
      <Hero data={pageContext.heroFieldGroup} theme={theme} />
      <ColumnCopy data={pageContext.columnCopyFieldGroups} theme={theme} />
      <Quote data={pageContext.quoteFieldGroup} theme={theme} />
      <ColumnIcon data={pageContext.iconFieldGroups} theme={theme} />
      <Photo
        data={pageContext.fullscreenImageFieldGroup}
        centered={true} // false for fullscreen treatment
        theme={theme}
      />
      <PhotoLayout
        data={pageContext.photoLayout1X2}
        layout="split" // half
        theme={theme}
      />
      <PhotoLayout
        data={pageContext.photoLayout1X2}
        layout="half" // half
        theme={theme}
      />
      {/* <PhotoLayout
        data={pageContext.photoLayout1X3}
        layout="1x3"
        theme={theme}
      /> */}
    </Layout>
  )
}

export default Article
