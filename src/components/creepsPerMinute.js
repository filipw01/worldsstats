import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { TopList, ListEntry, DataEntrySpan, Header3 } from "./styledComponents"
import useData, { SettingsContext } from "../hooks/useData"

const CreepsPerMinute = ({ displayPlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            players {
              name
              creeps
            }
            gameLength
          }
        }
        allPlayInsJson {
          nodes {
            players {
              name
              creeps
            }
            gameLength
          }
        }
      }
    `
  )
  const { uniquePlayers } = useData(useContext(SettingsContext))
  const { includePlayIns } = useContext(SettingsContext)

  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const uniquePlayersNames = uniquePlayers.map(player => player.name)
  const players = []
  for (const uniquePlayer of uniquePlayersNames) {
    players.push({
      name: uniquePlayer,
      totalCreeps: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name
          player.totalCreeps += Number(playerData.creeps)
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
      (a, b) => b.totalCreeps / b.totalSeconds - a.totalCreeps / a.totalSeconds
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
      <Header3>Creeps</Header3>
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
                  {Math.round(
                    (player.totalCreeps / player.totalSeconds) * 6000
                  ) / 100}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    cs/minute
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

export default CreepsPerMinute
