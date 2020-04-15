import React from "react"
import { Switch, Route, Link } from "react-router-dom"
import wrongpage from "./wrongpage.jpg"

import { connect } from "react-redux"
import { boxMouseEnter } from "./actions"

const LoginPage = () => <div>Login Page</div>
const HomePage = connect(state => ({ values: state.values }), { boxMouseEnter })(
  ({ values, boxMouseEnter }) => (
    <div style={{ display: "flex", flex: 1, width: "100%", flexWrap: "wrap" }}>
      {Array(16)
        .fill(undefined)
        .map((el, index) => {
          const colors = { 0: "red", 1: "blue", 2: "yellow", 3: "green" }
          const colorValue = (values[index] || 0) % 4
          const bgColor = colors[colorValue]
          return (
            <div
              key={index}
              onMouseEnter={() => boxMouseEnter(index)}
              style={{
                width: "25%",
                height: "25%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                cursor: "default",
                backgroundColor: bgColor,
                fontSize: 36,
              }}
            >
              {values[index] || 0}
            </div>
          )
        })}
    </div>
  ),
)
const NonHomePage = () => <div>NonHome Page</div>
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
        <Route component={WrongPage} />
      </Switch>
    </div>
  </div>
)

export default App
