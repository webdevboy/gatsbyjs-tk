// ./gatsby-browser.js
import React from "react"
// import { silentAuth } from "./src/utils/auth"
//
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"

// class SessionCheck extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       loading: true,
//     }
//   }

//   handleCheckSession = () => {
//     this.setState({ loading: false })
//   }

//   componentDidMount() {
//     silentAuth(this.handleCheckSession)
//   }

//   render() {
//     return (
//       !this.state.loading && (
//         <React.Fragment>{this.props.children}</React.Fragment>
//       )
//     )
//   }
// }

// gatsby-browser.js

// import React from "react"

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
