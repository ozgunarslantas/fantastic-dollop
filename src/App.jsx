import React from "react"
import { Switch, Route, Link, Redirect } from "react-router-dom"
import wrongpage from "./wrongpage.jpg"

import { LoginPage, HomePage, NonHomePage } from "./pages"

const WrongPage = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      backgroundImage: `url("${wrongpage}")`,
      backgroundPosition: "center",
      flex: 1,
      backgroundSize: "50% auto",
      backgroundRepeat: "no-repeat",
    }}
  >
    Wrong Page
  </div>
)

const App = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        backgroundColor: "gray",
      }}
    >
      <Link to="/login">Login</Link>
      <Link to="/">Home</Link>
      <Link to="/nonhome">NonHome</Link>
    </div>
    <div
      style={{
        backgroundColor: "red",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/nonhome" component={NonHomePage} />
        <Route path="/404" exact component={WrongPage} />
        <Redirect to="/404" />
      </Switch>
    </div>
  </div>
)

export default App
