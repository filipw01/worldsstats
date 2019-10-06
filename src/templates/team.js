import React from "react"
import Layout from "../components/layout"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
import AverageGameTime from "../components/averageGameTime"
import FirstBloodPerGame from "../components/firstBloodPerGame"

export default ({ path }) => {
  const uniqueTeams = [path.slice(1, -1).toUpperCase()]
  return (
    <Layout>
      <FirstBloodPerGame uniqueTeams={uniqueTeams}/>
      <AverageGameTime uniqueTeams={uniqueTeams} />
      <TeamMostPicked uniqueTeams={uniqueTeams} />
      <TeamObjectives uniqueTeams={uniqueTeams} />
      <GoldDifferenceAt15 uniqueTeams={uniqueTeams} />
    </Layout>
  )
}
