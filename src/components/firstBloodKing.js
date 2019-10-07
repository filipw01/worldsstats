import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { TopList, ListEntry, ListEntrySpan, Header2 } from "./styledComponents"

const FirstBloodKing = ({ uniquePlayers, limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              name
              players {
                name
                champion {
                  id
                }
              }
              firstBlood {
                id
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
      firstBloods: 0,
      numberOfGames: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      if (playerData.champion.id === teamData.node.firstBlood.id) {
        players.forEach(player => {
          if (player.name === playerData.name) {
            player.firstBloods++
          }
        })
      }
    }
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.numberOfGames++
        }
      })
    }
  }
  const sortedPlayers = players
    .sort(
      (a, b) =>
        b.firstBloods - a.firstBloods || a.numberOfGames - b.numberOfGames
    )
    .slice(0, limit)
  return (
    <section>
      <Header2>First blood kings</Header2>
      <TopList>
        {sortedPlayers.map((player, index) => {
          return (
            <ListEntry key={index}>
              <ListEntrySpan>
                {player.name}: {player.firstBloods} (
                {Math.round((player.firstBloods / player.numberOfGames) * 100)}%
                of games)
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default FirstBloodKing
