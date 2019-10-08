import React from "react"
import Layout from "../components/layout"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
import AverageGameTime from "../components/averageGameTime"
import FirstBloodPerGame from "../components/firstBloodPerGame"
import { Link } from "gatsby"
import useData from "../hooks/useData"
import EliminatedBadge from '../components/eliminatedBadge'

export default ({ path, pageContext }) => {
  const { uniqueTeams, uniqueTeamImages, eliminatedTeams } = useData()
  const team = pageContext.team
  return (
    <Layout>
      {eliminatedTeams.includes(team) ? <EliminatedBadge /> : ""}
      <div
        style={{
          display: "inline-block",
          marginBottom: "20px",
          background: "#fff",
          borderRadius: "10px",
          padding: "10px 20px",
          zIndex: "-2",
          position: "relative",
        }}
      >
        <img src={uniqueTeamImages[team]} alt="" />
      </div>
      <div>
        {pageContext.players.map(player => (
          <Link
            key={player.name}
            style={{ marginRight: "20px", color: "#bbb" }}
            to={`${path}${player.name.toLowerCase().replace(" ", "-")}/`}
          >
            {player.name}
          </Link>
        ))}
      </div>
      <div className="layout">
        <FirstBloodPerGame uniqueTeams={uniqueTeams} displayTeams={[team]} />
        <AverageGameTime uniqueTeams={uniqueTeams} displayTeams={[team]} />
        <TeamMostPicked team={team} limit={3} />
        <TeamObjectives uniqueTeams={[team]} />
        <GoldDifferenceAt15 uniqueTeams={uniqueTeams} displayTeams={[team]} />
      </div>
    </Layout>
  )
}
