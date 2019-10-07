import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const CreepsPerMinute = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                creeps
              }
              gameLength
            }
          }
        }
      }
    `
  )
  const players = []
  for (const uniquePlayer of uniquePlayers) {
    players.push({
      name: uniquePlayer.name,
      totalCreeps: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name;
          player.totalCreeps += Number(playerData.creeps)
          player.totalSeconds +=
            Number(teamData.node.gameLength.split(":")[0]) * 60 +
            Number(teamData.node.gameLength.split(":")[1])
        }
      })
    }
  }
  const sortedPlayers = players.sort((a,b)=>b.totalCreeps/b.totalSeconds - a.totalCreeps/a.totalSeconds)
  return (
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {Math.round((player.totalCreeps / player.totalSeconds) * 6000)/100} cs/minute
            </li>
          )
        })}
      </ul>
  )
}

export default CreepsPerMinute
