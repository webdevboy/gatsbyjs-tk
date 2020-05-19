import React from "react"
import { Router, Redirect } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"
import Collection from "src/components/templates/collection"
import Article from "src/components/templates/article"
import { Link } from "gatsby"

function Index() {
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

  const dataEN = data.wordpress.articles.nodes.filter(
    node => node.language.code === "EN"
  )

  return (
    <>
      <Router>
        <Collection path="/" data={dataEN} />
        <Article path="/*" />
      </Router>
      <p>
        <Link to="/events">Go to Events collection</Link>
      </p>
      <p>
        <Link to="/es/events">Go to Spanish Events collection</Link>
      </p>
      <p>
        <Link to="/">Go to Home collection</Link>
      </p>
      <p>
        <Link to="/es">Go to Spanish Home collection</Link>
      </p>
    </>
  )
}

export default Index

// import React from "react"
// // import { Router } from "@reach/router"
// import { useStaticQuery, graphql, Router } from "gatsby"
// // import addToMailchimp from "gatsby-plugin-mailchimp"
// // import Layout from "src/components/layout"
// import { Link } from "gatsby"
// import Article from "src/components/templates/article"
// import Collection from "src/components/templates/collection"
// // import { useAuth } from "react-use-auth"

// function IndexPage() {
//   // const [name, setName] = useState(null)
//   // const [email, setEmail] = useState(null)
//   // const { isAuthenticated, login, logout, user } = useAuth()
//   // const { homepage } = data.wordpress.pages.edges[0].node

//   // const handleEmailChange = e => {
//   //   setEmail(e.target.value)
//   // }

//   // const handleSubmit = e => {
//   //   e.preventDefault()

//   //   addToMailchimp(email, { name, email })
//   //     .then(({ msg, result }) => {
//   //       if (result !== "success") {
//   //         throw new Error(msg)
//   //       }
//   //     })
//   //     .catch(err => {
//   //       console.log("err", err)
//   //     })
//   // }

// const data = useStaticQuery(graphql`
//   query {
//     wordpress {
//       articles {
//         nodes {
//           id
//           uri
//           slug
//           language {
//             code
//           }
//         }
//       }
//     }
//   }
// `)

// const dataEN = data.wordpress.articles.nodes.filter(
//   node => node.language.code === "EN"
// )

// return (
//   <Router>
//     <Collection path={`/`} data={dataEN} />
//     <Article path={`/*`} />
//   </Router>
// )
// }

// export default IndexPage

// // <Layout>
// //   <Hero />
// //   <p>Welcome {isAuthenticated() ? user.name : "stranger"}!</p>
// //   {localStorage.getItem("useAuth:user") || isAuthenticated() ? (
// //     <button onClick={logout}>Logout</button>
// //   ) : (
// //     <button onClick={login}>Login</button>
// //   )}
// //   <div>
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         type="email"
// //         onChange={handleEmailChange}
// //         placeholder="email"
// //         name="email"
// //       />
// //       <br />
// //       <input type="submit" />
// //     </form>
// //   </div>
// <p>
//   <Link to="/events">Go to Events collection</Link>
// </p>
// <p>
//   <Link to="/es/events">Go to Spanish Events collection</Link>
// </p>
// <p>
//   <Link to="/articles">Go to Articles collection</Link>
// </p>
// <p>
//   <Link to="es/articles">Go to Spanish Articles collection</Link>
// </p>
// // </Layout>

// // export const query = graphql`
// //   query RootQueryToPageConnection {
// //     wordpress {
// //       pages {
// //         edges {
// //           node {
// //             homepage {
// //               hero {
// //                 sourceUrl
// //                 id
// //                 altText
// //               }
// //               logo {
// //                 id
// //                 sourceUrl
// //                 altText
// //               }
// //             }
// //             themeSelect {
// //               fieldGroupName
// //               themeSelect
// //             }
// //           }
// //         }
// //       }
// //       mediaItems {
// //         nodes {
// //           sourceUrl
// //           id
// //           title
// //           altText
// //         }
// //       }
// //     }
// //   }
// // `
