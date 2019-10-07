import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const DeathsPerGame = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                deaths
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
      totalDeaths: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.totalDeaths += Number(playerData.deaths)
          player.gamesCount++
        }
      })
    }
  }
  const sortedPlayers = players.sort(
    (a, b) => b.totalDeaths / b.gamesCount - a.totalDeaths / a.gamesCount
  )
  return (
    <>
      <h1>Deaths per game</h1>
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {player.name}{" "}
              {Math.round((player.totalDeaths / player.gamesCount) * 100) / 100}{" "}
              deaths/game
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default DeathsPerGame
