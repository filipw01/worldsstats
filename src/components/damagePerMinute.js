import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const DamagePerMinute = ({ uniquePlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                name
                damage
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
      totalDamage: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name.toLowerCase() === playerData.name.toLowerCase()) {
          player.name = playerData.name;
          player.totalDamage += Number(playerData.damage)
          player.totalSeconds +=
            Number(teamData.node.gameLength.split(":")[0]) * 60 +
            Number(teamData.node.gameLength.split(":")[1])
        }
      })
    }
  }
  const sortedPlayers = players.sort((a,b)=>b.totalDamage/b.totalSeconds - a.totalDamage/a.totalSeconds)
  return (
    <>
      <h1>Damage per minute</h1>
      <ul>
        {sortedPlayers.map((player, index) => {
          return (
            <li key={index}>
              {player.name} {Math.round((player.totalDamage / player.totalSeconds) * 60)} dmg/minute
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default DamagePerMinute
