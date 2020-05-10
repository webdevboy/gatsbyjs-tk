import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "src/components/layout"
import Logo from "src/components/Logo/logo"

const IndexPage = ({ data }) => {
  const { homepage } = data.wordpress.pages.edges[0].node

  return (
    <Layout>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <div>
        <div className="logo-wrap">
          <Logo theme={"light"} />
        </div>
        <img
          className="hero-bg"
          src={homepage.hero.sourceUrl}
          alt={homepage.hero.altText || "Hero background"}
          style={{
            width: "100%",
          }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query RootQueryToPageConnection {
    wordpress {
      pages {
        edges {
          node {
            homepage {
              hero {
                sourceUrl
                id
                altText
              }
              logo {
                id
                sourceUrl
                altText
              }
            }
            themeSelect {
              fieldGroupName
              themeSelect
            }
          }
        }
      }
      mediaItems {
        nodes {
          sourceUrl
          id
          title
          altText
        }
      }
    }
  }
`

export default IndexPage
