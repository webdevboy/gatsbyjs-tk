/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import { navigate } from "gatsby"

import { AuthProvider } from "react-use-auth"

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain={process.env.AUTH0_DOMAIN}
    auth0_client_id={process.env.AUTH0_CLIENTID}
    auth0_params={{
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      responseType: "token id_token",
      scope: "openid profile email",
    }}
  >
    {element}
  </AuthProvider>
)
