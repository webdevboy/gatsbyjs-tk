import React from "react"
import { graphql } from "gatsby"

const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  query RootQueryToPageConnection {
    wordpress {
      posts {
        nodes {
          hero {
            blockAuthor
            blockCopy
            blockName
            blockTitle
            heroBackground {
              id
              link
              srcSet
            }
          }
        }
      }
    }
  }
`

export default ComponentName
