import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Header2 } from "./styledComponents"

const GoldDifferenceAt15 = ({ uniqueTeams, displayTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            name
            goldDifferenceAt15
          }
        }
      }
    `
  )
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      goldDifferenceAt15: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of data.allDataJson.nodes) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.goldDifferenceAt15 += Number(teamData.goldDifferenceAt15)
        team.gamesCount++
      }
    })
  }
  let place;
  const sortedTeams = teams.sort(
    (a, b) =>
      b.goldDifferenceAt15 / b.gamesCount - a.goldDifferenceAt15 / a.gamesCount
  ).filter((team, index) => {
    if (displayTeams.includes(team.name)) {
      place = index + 1
      return true
    }
    return false
  })
  return (
    <section>
      <Header2>Gold difference at 15</Header2>
      {sortedTeams.map((team, index) => (
        <div key={index}>
          <p>
            {place}/{uniqueTeams.length} teams{" "}
            {team.goldDifferenceAt15 > 0 ? "+" : ""}
            {Math.round(team.goldDifferenceAt15 / team.gamesCount)} gold
          </p>
        </div>
      ))}
    </section>
  )
}

export default GoldDifferenceAt15
