// import React, { useEffect } from "react"

// import { useAuth } from "react-use-auth"
// import Layout from "../components/layout"

// const Auth0CallbackPage = () => {
//   const { handleAuthentication } = useAuth()

//   useEffect(() => {
//     // if you want to redirect back to specific page (like the page User comes from?)
//     // handleAuthentication({ postLoginRoute: "/account" });
//     handleAuthentication()
//   }, [])

//   return (
//     <Layout>
//       <h1>
//         This is the auth callback page, you should be redirected immediately.
//       </h1>
//     </Layout>
//   )
// }

// export default Auth0CallbackPage

// src/pages/callback.js
import React from "react"
import { handleAuthentication } from "../utils/auth"

const Callback = () => {
  handleAuthentication()

  return <p>Loading...</p>
}

export default Callback
