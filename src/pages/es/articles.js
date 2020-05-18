import React from "react"
import { Router } from "@reach/router"
// import Layout from "src/components/layout"
import Article from "src/components/templates/article"
import Collection from "src/components/templates/collection"
import { useStaticQuery, graphql } from "gatsby"
// import { useAuth } from "react-use-auth"

const { contentFields } = require("../../queries/queries.js")

function Articles() {
  // Template string interpolation not supported in Gatsby
  // https://glamanate.com/blog/attempting-handle-dynamic-schema-types-gatsby-graphql-queries
  // Queries defined in /src/queries/queries.js will be source of truth, make sure to update those before changing this query
  // console.log(contentFields)
  const data = useStaticQuery(graphql`
    query {
      wordpress {
        articles {
          nodes {
            id
            uri
            slug
            language {
              code
            }
          }
        }
      }
    }
  `)

  const dataES = data.wordpress.articles.nodes.filter(
    node => node.language.code === "ES"
  )

  return (
    <Router>
      <Collection path={`/es/articles/`} data={dataES} />
      <Article path={`/articles/*`} />
    </Router>
  )
}

export default Articles
