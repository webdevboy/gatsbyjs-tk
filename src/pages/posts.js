import React, { useEffect, useState } from "react"
import Layout from "src/components/layout"
import { useAuth } from "react-use-auth"

function Posts() {
  const { isAuthenticated, user } = useAuth()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    if (localStorage.getItem("useAuth:user")) {
      setUserName(JSON.parse(localStorage.getItem("useAuth:user")).name)
      return
    }

    if (isAuthenticated()) {
      setUserName(user.name)
      return
    }
  }, [])

  return (
    <Layout>
      <h1>Hello {userName || "stranger"}, Welcome to Posts!</h1>
      <p>Hi {isAuthenticated() ? user.email : "unvalidated person"}</p>
    </Layout>
  )
}

export default Posts
