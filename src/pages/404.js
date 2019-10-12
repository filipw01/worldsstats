import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div style={{ marginBottom: "30px" }}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">
        Visit the main page to see League of Legends World Championship 2019
        statistics
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
