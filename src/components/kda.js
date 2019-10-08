import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { TopList, ListEntry, DataEntrySpan, Header3 } from "./styledComponents"

const KDA = ({ uniquePlayers, displayPlayers }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            players {
              name
              kills
              deaths
              assists
            }
          }
        }
      }
    `
  )
  const players = []
  for (const uniquePlayer of uniquePlayers) {
    players.push({
      name: uniquePlayer,
      totalDeaths: 0,
      totalKills: 0,
      totalAssists: 0,
    })
  }
  for (const teamData of data.allDataJson.nodes) {
    for (const playerData of teamData.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.totalDeaths += Number(playerData.deaths)
          player.totalKills += Number(playerData.kills)
          player.totalAssists += Number(playerData.assists)
        }
      })
    }
  }

  let place
  const sortedPlayers = players
    .sort(
      (a, b) =>
        (b.totalKills + b.totalAssists) / b.totalDeaths -
        (a.totalKills + a.totalAssists) / a.totalDeaths
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
      <Header3>KDA</Header3>
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
                    ((player.totalKills + player.totalAssists) /
                      player.totalDeaths) *
                      100
                  ) / 100}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>KDA</div>
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default KDA
