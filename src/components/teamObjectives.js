import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const TeamObjectives = ({ uniqueTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            name
            towers
            inhibitors
            herald
            dragons
            barons
          }
        }
      }
    `
  )
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      towers: 0,
      inhibitors: 0,
      heralds: 0,
      dragons: 0,
      barons: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of data.allDataJson.nodes) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.towers += Number(teamData.towers)
        team.inhibitors += Number(teamData.inhibitors)
        team.heralds += Number(teamData.herald)
        team.dragons += Number(teamData.dragons)
        team.barons += Number(teamData.barons)
        team.gamesCount++;
      }
    })
  }
  return (
    <>
      <h1>Neutral objectives</h1>
      {teams.map((team, index) => (
        <div key={index}>
          <p>{team.name}</p>
          <p>Towers {team.towers} ({Math.round(team.towers/team.gamesCount*100)/100} per game)</p>
          <p>Inhibitors {team.inhibitors} ({Math.round(team.inhibitors/team.gamesCount*100)/100} per game)</p>
          <p>Heralds {team.heralds} ({Math.round(team.heralds/team.gamesCount*100)/100} per game)</p>
          <p>Dragons {team.dragons} ({Math.round(team.dragons/team.gamesCount*100)/100} per game)</p>
          <p>Barons {team.barons} ({Math.round(team.barons/team.gamesCount*100)/100} per game)</p>
        </div>
      ))}
    </>
  )
}

export default TeamObjectives
