// src/pages/account.js
import React from "react"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link } from "gatsby"

const Home = () => <p>Home</p>
const MyAccount = ({ user }) => {
  return <p>Hi, {user.name ? user.name : "friend"}!</p>
}
const Posts = () => <p>Posts</p>
const Pages = () => <p>Pages</p>

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
        <Link to="/account/">MyAccount</Link>{" "}
        <Link to="/account/posts/">Posts</Link>{" "}
        <Link to="/account/pages/">Pages</Link>{" "}
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/"/>
        <MyAccount path="/account/" user={user} />
        <Posts path="/account/posts" />
        <Pages path="/account/pages" />
      </Router>
    </>
  )
}

export default Account