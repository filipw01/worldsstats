import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { TopList, ListEntry, DataEntrySpan, Header3 } from "./styledComponents"
import useData, { SettingsContext } from "../hooks/useData"

const DeathsPerGame = ({ displayPlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            players {
              name
              deaths
            }
          }
        }
        allPlayInsJson {
          nodes {
            players {
              name
              deaths
            }
          }
        }
      }
    `
  )
  const { uniquePlayers} = useData(useContext(SettingsContext))
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
      totalDeaths: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.totalDeaths += Number(playerData.deaths)
          player.gamesCount++
        }
      })
    }
  }
  let place
  const sortedPlayers = players
    .sort((a, b) => a.totalDeaths / a.gamesCount - b.totalDeaths / b.gamesCount)
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
      <Header3>Deaths</Header3>
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
                  {Math.round((player.totalDeaths / player.gamesCount) * 100) /
                    100}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    deaths/game
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

export default DeathsPerGame
