import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { TopList, ListEntry, DataEntrySpan, Header3 } from "./styledComponents"
import useData, { SettingsContext } from "../hooks/useData"

const DamagePerMinute = ({ displayPlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            players {
              name
              damage
            }
            gameLength
          }
        }
      }
    `
  )
  const { uniquePlayers } = useData(useContext(SettingsContext))
  const uniquePlayersNames = uniquePlayers.map(player => player.name)

  const players = []
  for (const uniquePlayer of uniquePlayersNames) {
    players.push({
      name: uniquePlayer,
      totalDamage: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of data.allDataJson.nodes) {
    for (const playerData of teamData.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name
          player.totalDamage += Number(playerData.damage)
          player.totalSeconds +=
            Number(teamData.gameLength.split(":")[0]) * 60 +
            Number(teamData.gameLength.split(":")[1])
        }
      })
    }
  }
  let place
  const sortedPlayers = players
    .sort(
      (a, b) => b.totalDamage / b.totalSeconds - a.totalDamage / a.totalSeconds
    )
    .filter((player, index) => {
      if (displayPlayers.includes(player.name)) {
        place = index + 1
        return true
      }
      return false
    })

  let nth = "th"
  if (place === 1) {
    nth = "st"
  } else if (place === 2) {
    nth = "nd"
  } else if (place === 3) {
    nth = "rd"
  }
  return (
    <section>
      <Header3>Damage</Header3>
      <TopList>
        {sortedPlayers.map((player, index) => {
          return (
            <ListEntry key={index}>
              <DataEntrySpan
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                }}
              >
                <div style={{ width: "100%" }}>
                  {place}
                  {nth}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>best</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {Math.round((player.totalDamage / player.totalSeconds) * 60)}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    dmg/minute
                  </div>
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default DamagePerMinute
