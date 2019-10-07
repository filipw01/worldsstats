import React from "react"
import Layout from "../components/layout"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
import AverageGameTime from "../components/averageGameTime"
import FirstBloodPerGame from "../components/firstBloodPerGame"
import { Link, useStaticQuery } from "gatsby"

export default ({ path, pageContext }) => {
  const data = useStaticQuery(graphql`
    query {
      allDataJson {
        totalCount
        edges {
          node {
            name
            players {
              name
            }
          }
        }
      }
    }
  `)
  const team = pageContext.team
  const uniqueTeams = []
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
      uniqueTeams.filter(team => team === teamData.node.name).length === 0
    if (isNewTeam) {
      uniqueTeams.push(teamData.node.name)
    }
  }
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
      <FirstBloodPerGame uniqueTeams={uniqueTeams} displayTeams={[team]} />
      <AverageGameTime uniqueTeams={uniqueTeams} displayTeams={[team]} />
      <TeamMostPicked team={team} limit={3} />
      <TeamObjectives uniqueTeams={[team]} />
      <GoldDifferenceAt15 uniqueTeams={uniqueTeams} displayTeams={[team]}/>
    </Layout>
  )
}
