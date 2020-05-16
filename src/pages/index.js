import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Layout from "src/components/layout"
import Logo from "src/components/Logo/logo"
import { useAuth } from "react-use-auth"

export default function IndexPage() {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const { isAuthenticated, login, logout, user } = useAuth()
  // const { homepage } = data.wordpress.pages.edges[0].node

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    addToMailchimp(email, { name, email })
      .then(({ msg, result }) => {
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
      <p>Welcome {isAuthenticated() ? user.name : "stranger"}!</p>
      {localStorage.getItem("useAuth:user") || isAuthenticated() ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
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
