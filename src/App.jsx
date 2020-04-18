import React from "react"
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom"

import { LoginPage, HomePage, NonHomePage, WrongPage } from "./pages"

import { useSelector } from "react-redux"

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute path="/">
            <AuthenticatedRoutes />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  )
}

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/nonhome" component={NonHomePage} />
        <Route exact path="/404" component={WrongPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

function PrivateRoute({ children, ...rest }) {
  const { status } = useSelector(state => ({
    status: state.login.status,
  }))
  return (
    <Route
      {...rest}
      render={({ location }) =>
        status === "LoggedIn" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: location.pathname,
            }}
          />
        )
      }
    />
  )
}

export default App
