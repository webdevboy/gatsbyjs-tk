import React, { useEffect, useState } from "react"
import { Router } from "@reach/router"
import Layout from "src/components/layout"
import Post from "src/components/templates/post"
import PostCollection from "src/components/templates/post-collection"
import { useStaticQuery, graphql } from "gatsby"
// import { useAuth } from "react-use-auth"

function Posts() {
  const data = useStaticQuery(graphql`
    query {
      wordpress {
        posts {
          nodes {
            id
            uri
            title
          }
        }
      }
    }
  `)

  return (
    <Router>
      <PostCollection path={`/posts/`} data={data.wordpress.posts.nodes} />
      <Post path={`/posts/*`} />
    </Router>
  )
}

export default Posts
