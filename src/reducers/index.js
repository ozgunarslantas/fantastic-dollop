import { createReducer } from "redux-act"
import { boxMouseEnter } from "../actions"

const reducer = createReducer(
  {
    [boxMouseEnter]: (state, payload) => ({
      ...state,
      values: { ...state.values, [payload]: (state.values[payload] || 0) + 1 },
    }),
  },
  { values: {} },
)

export default reducer
