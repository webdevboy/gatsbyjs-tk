// src/utils/auth.js
import auth0 from "auth0-js"
import { navigate } from "gatsby"

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: "token id_token",
      scope: "openid profile email",
    })
  : {}

const goHome = () => navigate("/")

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem("isLoggedIn") === "true"
}

export const login = () => {
  if (!isBrowser) {
    return
  }

  auth.authorize()
}

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    if (!isBrowser) {
      return
    }

    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt

    user = authResult.idTokenPayload

    localStorage.setItem("isLoggedIn", true)
    localStorage.setItem("user", JSON.stringify(user))

    cb()
  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  auth.parseHash(setSession(goHome))
}

export const getProfile = () => {
  if (!isBrowser) {
    return
  }

  return JSON.parse(localStorage.getItem("user"))
}

export const logout = () => {
  if (!isBrowser) {
    return
  }

  localStorage.setItem("isLoggedIn", false)
  auth.logout()
}
