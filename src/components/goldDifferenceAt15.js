import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const GoldDifferenceAt15 = ({ uniqueTeams }) => {
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
        team.gamesCount++;
      }
    })
  }
  const sortedTeams = teams.sort((a,b)=>b.goldDifferenceAt15/b.gamesCount-a.goldDifferenceAt15/a.gamesCount)
  return (
    <>
      <h1>Gold difference at 15</h1>
      {sortedTeams.map((team, index) => (
        <div key={index}>
          <p>{team.name}</p>
          <p>{Math.round(team.goldDifferenceAt15/team.gamesCount)} gold</p>
        </div>
      ))}
    </>
  )
}

export default GoldDifferenceAt15
