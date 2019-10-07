import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const AverageGameTime = ({ uniqueTeams, displayTeams }) => {
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
      gameLength: [],
    })
  }
  for (const teamData of data.allDataJson.edges) {
    teams.forEach(team => {
      if (team.name === teamData.node.name) {
        team.gameLength.push(teamData.node.gameLength)
      }
    })
  }

  const mappedTeams = teams.map(game => {
    const totalGameLength = game.gameLength.reduce((acc, curr) => {
      const gameLengthArray = curr.split(":")
      const gameLengthInSeconds =
        Number(gameLengthArray[0]) * 60 + Number(gameLengthArray[1])
      return acc + gameLengthInSeconds
    }, 0)
    return {
      averageGameLengthInSeconds: totalGameLength / game.gameLength.length,
      name: game.name,
    }
  })
  let place;
  const sortedTeams = mappedTeams
    .sort((a, b) => a.averageGameLengthInSeconds - b.averageGameLengthInSeconds)
    .filter((team, index) => {
      if (displayTeams.includes(team.name)) {
        place = index + 1
        return true
      }
      return false
    })

  return (
    <>
      <h1>Average game time</h1>
      {sortedTeams.map(team => {
        return (
          <p>
            {place}/{uniqueTeams.length} teams{" "}
            {Math.floor(team.averageGameLengthInSeconds / 60)}:
            {Math.round(team.averageGameLengthInSeconds % 60)}
          </p>
        )
      })}
    </>
  )
}

export default AverageGameTime
