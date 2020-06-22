import React from "react"
import { Link } from "gatsby"
import { login, logout, isAuthenticated, getProfile } from "../../utils/auth"

const user = getProfile()

const LoginLogout = () => {
  if (isAuthenticated()) {
    return (
      <>
        <a
          href="#logout"
          onClick={e => {
            e.preventDefault()
            logout()
          }}
        >
          Logout{" "}
        </a>
        <img src={user.picture} width="25px" />
        <span>{user.nickname}</span>
      </>
    )
  } else {
    return (
      <>
        <a
          href="#login"
          onClick={e => {
            e.preventDefault()
            login()
          }}
        >
          Login{" "}
        </a>
      </>
    )
  }
}

export default LoginLogout
