import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const KillsPerGame = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                kills
              }
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
      totalKills: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name
          player.totalKills += Number(playerData.kills)
          player.gamesCount++
        }
      })
    }
  }
  const sortedPlayers = players.sort(
    (a, b) => b.totalKills / b.gamesCount - a.totalKills / a.gamesCount
  )
  return (
    <>
      <h1>Kills per game</h1>
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {player.name}{" "}
              {Math.round((player.totalKills / player.gamesCount) * 100) / 100}{" "}
              kills/game
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default KillsPerGame
