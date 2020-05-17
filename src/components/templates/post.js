import React from "react"
// import { Router } from "@reach/router"
import Layout from "src/components/layout"
import { Link } from "gatsby"

// Props come from gatsby-node
function Post(props) {
  console.log(props)
  const { pageContext } = props

  return (
    <Layout>
      <div>{console.log({ pageContext })}</div>
    </Layout>
  )
}

export default Post
