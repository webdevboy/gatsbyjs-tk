import React from "react"
import { Link } from "gatsby"
// import { Router } from "@reach/router"
import Layout from "src/components/layout"

function PostCollection(props) {
  const { data } = props

  if (!data) return null

  console.log({ data })
  return (
    <Layout>
      {data.map(post => {
        return (
          <p>
            <Link key={post.id} to={`/posts/${post.uri}`}>
              {post.title}
            </Link>
          </p>
        )
      })}
    </Layout>
  )
}

export default PostCollection
