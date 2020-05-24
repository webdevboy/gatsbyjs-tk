
// This is a temporary generated file. Changes to this file will be overwritten eventually!
import React from "react"

import Layout from "../src/components/Layout"
import SEO from "../src/components/SEO"

// Sections


const Post = ({ pageContext }) => {
  const {
    post: { title, components },
  } = pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      {layouts.map((layout, index) => {
        
        })
      }
    </Layout>
  )
}

export default Post
  