import React from "react"
import wrongpage from "../wrongpage.jpg"

import Layout from "./Layout"

const WrongPage = () => (
  <Layout>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url("${wrongpage}")`,
        backgroundPosition: "center",
        flex: 1,
        backgroundSize: "auto 50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ marginTop: 48 }}>
        Do not wander on your own, or you might end up just like him.
      </div>
    </div>
  </Layout>
)

export default WrongPage
