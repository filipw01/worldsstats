import React from "react"
import Layout from "../components/layout"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
import AverageGameTime from "../components/averageGameTime"
import FirstBloodPerGame from "../components/firstBloodPerGame"
import { Link } from "gatsby"

export default ({ path, pageContext }) => {
  console.log(pageContext)
  const team = pageContext.team;
  return (
    <Layout>
      {pageContext.players.map(player => (
        <Link
          key={player.name}
          style={{ marginRight: "20px", color: "#bbb" }}
          to={`${path}${player.name.toLowerCase().replace(" ", "-")}/`}
        >
          {player.name}
        </Link>
      ))}
      <FirstBloodPerGame uniqueTeams={[team]}/>
      <AverageGameTime uniqueTeams={[team]} />
      <TeamMostPicked team={team} limit={3}/>
      <TeamObjectives uniqueTeams={[team]} />
      <GoldDifferenceAt15 uniqueTeams={[team]} />
    </Layout>
  )
}
