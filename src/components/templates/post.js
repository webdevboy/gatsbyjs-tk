import React from "react"
// import { Router } from "@reach/router"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Props come from gatsby-node
function Post(props) {
  console.log(props)
  const { pageContext } = props

  console.log({ pageContext })

  return (
    <Layout>
      <h1>{pageContext.heroFieldGroup.title || "No Title Entered"}</h1>
    </Layout>
  )
}

export default Post
