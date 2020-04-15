import React from "react"
import { BrowserRouter, Route, Link } from "react-router-dom"

const LoginPage = () => <div>Login Page</div>
const HomePage = () => <div>Home Page</div>
const NonHomePage = () => <div>NonHome Page</div>

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
      <Route path="/login" component={LoginPage} />
      <Route path="/" exact component={HomePage} />
      <Route path="/nonhome" component={NonHomePage} />
    </div>
  </div>
)

export default App
