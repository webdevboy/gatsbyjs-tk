import React from "react"
import { Router } from "@reach/router"
// import Layout from "src/components/layout"
import Event from "src/components/templates/event"
import Collection from "src/components/templates/collection"
import { useStaticQuery, graphql } from "gatsby"
// import { useAuth } from "react-use-auth"

const { contentFields } = require("../../queries/queries.js")

function Events() {
  // Template string interpolation not supported in Gatsby
  // https://glamanate.com/blog/attempting-handle-dynamic-schema-types-gatsby-graphql-queries
  // Queries defined in /src/queries/queries.js will be source of truth, make sure to update those before changing this query
  // console.log(contentFields)
  const data = useStaticQuery(graphql`
    query {
      wordpress {
        events {
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

  const dataES = data.wordpress.events.nodes.filter(
    node => node.language.code === "ES"
  )

  return (
    <Router>
      <Collection path={`/es/events/`} data={dataES} />
      <Event path={`/events/*`} />
    </Router>
  )
}

export default Events
