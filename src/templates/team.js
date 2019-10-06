import React from "react"
import Layout from "../components/layout"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
import AverageGameTime from "../components/averageGameTime"
import FirstBloodPerGame from "../components/firstBloodPerGame"
import { Link } from "gatsby"

export default ({ path, pathContext }) => {
  const uniqueTeams = [path.slice(1, -1).toUpperCase()]
  return (
    <Layout>
      {pathContext.players.map(player => (
        <Link
          key={player.name}
          style={{ marginRight: "20px" }}
          to={`${path}${player.name.toLowerCase().replace(" ", "-")}/`}
        >
          {player.name}
        </Link>
      ))}
      <FirstBloodPerGame uniqueTeams={uniqueTeams}/>
      <AverageGameTime uniqueTeams={uniqueTeams} />
      <TeamMostPicked uniqueTeams={uniqueTeams} />
      <TeamObjectives uniqueTeams={uniqueTeams} />
      <GoldDifferenceAt15 uniqueTeams={uniqueTeams} />
    </Layout>
  )
}
