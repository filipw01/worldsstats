import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const AverageGameTime = ({ uniqueTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              name
              gameLength
            }
          }
        }
      }
    `
  )
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      gameLength: []
    })
  }
  for (const teamData of data.allDataJson.edges) {
    teams.forEach(team => {
      if (team.name === teamData.node.name) {
        team.gameLength.push(teamData.node.gameLength)
      }
    })
  }

  return (
    <>
      <h1>Average game time</h1>
      <ul>
        {teams.map((game, index) => {
          const totalGameLength = game.gameLength.reduce((acc, curr) => {
            const gameLengthArray = curr.split(":")
            const gameLengthInSeconds =
              Number(gameLengthArray[0]) * 60 + Number(gameLengthArray[1])
            return acc + gameLengthInSeconds
          }, 0)
          const averageGameLengthInSeconds =
            totalGameLength / game.gameLength.length
          return (
            <li key={index}>
              {game.name} {Math.floor(averageGameLengthInSeconds / 60)}:
              {Math.round(averageGameLengthInSeconds % 60)};
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default AverageGameTime
