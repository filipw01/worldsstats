import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const AverageGameTime = () => {
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
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
      teams.filter(team => team.name === teamData.node.name).length === 0
    if (isNewTeam) {
      teams.push({
        name: teamData.node.name,
        gameLength: [teamData.node.gameLength],
      })
    } else {
      teams.forEach(team => {
        if (team.name === teamData.node.name) {
          team.gameLength.push(teamData.node.gameLength)
        }
      })
    }
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
