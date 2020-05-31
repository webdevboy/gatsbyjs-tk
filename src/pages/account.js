// src/pages/account.js
import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"

const MyAccount = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}

const Account = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/article-component-library">Article Component Library</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            e.preventDefault()
            logout()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <MyAccount path="/account/" user={user} />
      </Router>
    </>
  )
}

export default Account
