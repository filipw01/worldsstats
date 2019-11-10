import React, { useContext } from "react"
import { Link } from "gatsby"
import useData, { SettingsContext } from "../hooks/useData"
import { Header2 } from "../components/styledComponents"
import SEO from "../components/seo"

import Layout from "../components/layout"

const IndexPage = () => {
  const { uniqueTeams, uniqueTeamImages, eliminatedTeams } = useData(useContext(SettingsContext))
  const remainingTeams = uniqueTeams.filter(
    team => !eliminatedTeams.includes(team)
  )
  return (
    <Layout>
      <h1>Select the team</h1>
      <Header2 style={{ marginTop: "30px" }}>Winner of the tournament</Header2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {remainingTeams.map(uniqueTeam => (
          <Link
            key={uniqueTeam}
            to={`/${uniqueTeam.toLowerCase()}/`}
            className="team-tile"
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
      <Header2 style={{ marginTop: "30px" }}>Other teams</Header2>
      <p>Those teams failed to win this years championship</p>
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
            to={`/${uniqueTeam.toLowerCase()}/`}
            className="team-tile"
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
      <SEO title="Teams Statistics" />
    </Layout>
  )
}

export default IndexPage
