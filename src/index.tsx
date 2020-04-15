import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

import { BrowserRouter } from "react-router-dom"

import { createStore, compose, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { createEpicMiddleware } from "redux-observable"
import reducer from "./reducers"
import combinedEpics from "./epics"

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const epicMiddleware = createEpicMiddleware()

const store = createStore(reducer, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(combinedEpics)

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      ,
    </BrowserRouter>,
    document.getElementById("root"),
  )
}

store.subscribe(render)

render()
