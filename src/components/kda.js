import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const KDA = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                kills
                deaths
                assists
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
      totalKills: 0,
      totalAssists: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.totalDeaths += Number(playerData.deaths)
          player.totalKills += Number(playerData.kills)
          player.totalAssists += Number(playerData.assists)
        }
      })
    }
  }

  const sortedPlayers = players.sort(
    (a, b) =>
      (b.totalKills + b.totalAssists) / b.totalDeaths -
      (a.totalKills + a.totalAssists) / a.totalDeaths
  )
  return (
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {Math.round(
                ((player.totalKills + player.totalAssists) /
                  player.totalDeaths) *
                  100
              ) / 100}{" "}
              KDA
            </li>
          )
        })}
      </ul>
  )
}

export default KDA
