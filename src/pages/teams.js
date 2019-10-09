import React from "react"
import { Link, graphql } from "gatsby"
import useData from "../hooks/useData"
import { Header2 } from "../components/styledComponents"
import SEO from "../components/seo"

import Layout from "../components/layout"

const IndexPage = () => {
  const { uniqueTeams, uniqueTeamImages, eliminatedTeams } = useData()
  const remainingTeams = uniqueTeams.filter(
    team => !eliminatedTeams.includes(team)
  )
  return (
    <Layout>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {remainingTeams.map(uniqueTeam => (
          <Link
            key={uniqueTeam}
            style={{
              margin: "5px",
              color: "#000",
              width: "150px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
            to={`/${uniqueTeam.toLowerCase()}/`}
          >
            <img
              src={uniqueTeamImages[uniqueTeam]}
              alt=""
              style={{ height: "50px", marginRight: "15px" }}
            />
            {uniqueTeam}
          </Link>
        ))}
      </div>
      <Header2 style={{ marginTop: "30px" }}>Eliminated</Header2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {eliminatedTeams.map(uniqueTeam => (
          <Link
            key={uniqueTeam}
            style={{
              margin: "5px",
              color: "#000",
              width: "150px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
            to={`/${uniqueTeam.toLowerCase()}/`}
          >
            <img
              src={uniqueTeamImages[uniqueTeam]}
              alt=""
              style={{ height: "50px", marginRight: "15px" }}
            />
            {uniqueTeam}
          </Link>
        ))}
      </div>
      <SEO title="Teams" />
    </Layout>
  )
}

export const query = graphql`
  query {
    allDataJson {
      totalCount
      edges {
        node {
          name
        }
      }
    }
  }
`

export default IndexPage
