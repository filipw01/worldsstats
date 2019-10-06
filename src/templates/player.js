import React from "react"
import Layout from "../components/layout"

export default ({ path }) => {
  const player = path.slice(1, -1).replace("-", " ");
  return (
    <Layout>
      <div>{player}</div>
    </Layout>
  )
}
