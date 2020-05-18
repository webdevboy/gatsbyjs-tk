import React from "react"
import { Link } from "gatsby"
import Layout from "src/components/layout"

function Collection(props) {
  const { data } = props

  if (!data) return null

  return (
    <Layout>
      {data.map(post => {
        return (
          <p key={post.id}>
            <Link to={post.uri}>{post.slug}</Link>
          </p>
        )
      })}
    </Layout>
  )
}

export default Collection
