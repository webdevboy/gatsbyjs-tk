import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  query RootQueryToPageConnection {
    wordpress {
      pages {
        edges {
          node {
            id
            slug
            title
            uri
          }
        }
      }
    }
  }
`

export default ComponentName
