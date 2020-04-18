import React from "react"
import { Link } from "react-router-dom"

const Layout = ({ children }) => (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      // backgroundColor: "red",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        width: "100%",
        backgroundColor: "gray",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/nonhome">NonHome</Link>
    </div>
    {children}
  </div>
)

export default Layout
