import React from "react"
import { graphql, useStaticQuery } from "gatsby"

function Logo({ theme }) {
  const data = useStaticQuery(graphql`
    query rootQueryToPageConnectionAndRootQueryToPageConnection {
      wordpress {
        mediaItems {
          nodes {
            sourceUrl
            id
            title
            altText
            imageTheme {
              fieldGroupName
              theme
              isSiteLogo
            }
          }
        }
      }
    }
  `)

  const img = data.wordpress.mediaItems.nodes.filter(
    item => item.imageTheme.isSiteLogo && item.imageTheme.theme === theme
  )

  // return <img src={img[0].sourceUrl || ""} alt={img[0].altText || ""} />
  return <div></div>
}

export default Logo
