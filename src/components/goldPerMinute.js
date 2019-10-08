import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { TopList, ListEntry, DataEntrySpan, Header3 } from "./styledComponents"

const GoldPerMinute = ({ displayPlayers, uniquePlayers }) => {
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
      name: uniquePlayer,
      totalGold: 0,
      totalSeconds: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.name = playerData.name
          player.totalGold += Number(playerData.gold)
          player.totalSeconds +=
            Number(teamData.node.gameLength.split(":")[0]) * 60 +
            Number(teamData.node.gameLength.split(":")[1])
        }
      })
    }
  }
  let place

  const sortedPlayers = players
    .sort((a, b) => b.totalGold / b.totalSeconds - a.totalGold / a.totalSeconds)
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
    <Header3>Gold</Header3>
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
              <div style={{textAlign:"right"}}>
                {Math.round((player.totalGold / player.totalSeconds) * 6000) /
                  100}
                <div style={{ fontSize: "14px", color: "#bbb" }}>
                  gold/minute
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

export default GoldPerMinute
