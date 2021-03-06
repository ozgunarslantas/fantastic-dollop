import React from "react"
import inspirational from "../inspirational.jpg"
import Layout from "./Layout"

const NonHomePage = () => (
  <Layout>
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url("${inspirational}")`,
        backgroundPosition: "center",
        flex: 1,
        backgroundSize: "50% auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ marginTop: 48 }}>Nothing to see here</div>
    </div>
  </Layout>
)

export default NonHomePage
