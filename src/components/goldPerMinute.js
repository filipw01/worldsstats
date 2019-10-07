import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const GoldPerMinute = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                gold
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
      totalGold: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name;
          player.totalGold += Number(playerData.gold)
          player.totalSeconds +=
            Number(teamData.node.gameLength.split(":")[0]) * 60 +
            Number(teamData.node.gameLength.split(":")[1])
        }
      })
    }
  }
  const sortedPlayers = players.sort((a,b)=>b.totalGold/b.totalSeconds - a.totalGold/a.totalSeconds)
  return (
    <>
      <h1>Gold per minute</h1>
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {player.name} {Math.round((player.totalGold / player.totalSeconds) * 6000)/100} gold/minute
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default GoldPerMinute
