import React from "react"
import { connect } from "react-redux"
import { boxMouseEnter } from "../actions"

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

export default HomePage
