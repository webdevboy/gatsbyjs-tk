import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Layout from "src/components/layout"
import Logo from "src/components/Logo/logo"

export default function IndexPage() {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  // const { homepage } = data.wordpress.pages.edges[0].node

  const handleEmailChange = e => {
    console.log(`${e.target.name} : ${e.target.value}`)
    setEmail(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    addToMailchimp(email, { name, email })
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`)

        if (result !== "success") {
          throw new Error(msg)
        }
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            onChange={handleEmailChange}
            placeholder="email"
            name="email"
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    </Layout>
  )
}

// export const query = graphql`
//   query RootQueryToPageConnection {
//     wordpress {
//       pages {
//         edges {
//           node {
//             homepage {
//               hero {
//                 sourceUrl
//                 id
//                 altText
//               }
//               logo {
//                 id
//                 sourceUrl
//                 altText
//               }
//             }
//             themeSelect {
//               fieldGroupName
//               themeSelect
//             }
//           }
//         }
//       }
//       mediaItems {
//         nodes {
//           sourceUrl
//           id
//           title
//           altText
//         }
//       }
//     }
//   }
// `
