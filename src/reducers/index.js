import { createReducer } from "redux-act"
import { boxMouseEnter, login } from "../actions"

const reducer = createReducer(
  {
    [boxMouseEnter]: (state, payload) => ({
      ...state,
      values: { ...state.values, [payload]: (state.values[payload] || 0) + 1 },
    }),
    [login]: state => ({ ...state, login: { status: "LoggedIn" } }),
  },
  {
    values: {},
    login: { status: "NotLoggedIn" },
  },
)

export default reducer
