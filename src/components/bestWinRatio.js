import { useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import {TopList, ListEntry, ListEntrySpan} from './styledComponents'
const BestWinRatio = ({ limit, initialMinimumGamesPlayed }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              win
              players {
                champion {
                  id
                  image
                }
              }
            }
          }
        }
      }
    `
  )
  const [minimumGamesPlayed, setMinimumGamesPlayed] = useState(
    initialMinimumGamesPlayed
  )
  const setMinimumGamesPlayedAdapter = e =>
    setMinimumGamesPlayed(e.target.value)
  const champions = []
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      const isNewChampion =
        champions.filter(champion => champion.name === playerData.champion.id)
          .length === 0
      if (isNewChampion) {
        champions.push({
          name: playerData.champion.id,
          image: playerData.champion.image,
          count: 1,
          wins: teamData.node.win ? 1 : 0,
        })
      } else {
        champions.forEach(champion => {
          if (champion.name === playerData.champion.id) {
            champion.count++
            if (teamData.node.win) {
              champion.wins++
            }
          }
        })
      }
    }
  }
  const sortedChampions = champions
    .sort((a, b) => {
      return b.wins / b.count - a.wins / a.count || b.count - a.count
    })
    .filter(champion => champion.count >= minimumGamesPlayed)
    .slice(0, limit)
  return (
    <>
      <h2>Highest win ratio champions</h2>
      <p>
        Minimum games played{" "}
        <input
          type="number"
          value={minimumGamesPlayed}
          onChange={setMinimumGamesPlayedAdapter}
        />
      </p>
      <TopList>
        {sortedChampions.map((champion, index) => {
          return (
            <ListEntry key={index}>
              <img
                src={champion.image}
                style={{ height: "50px", verticalAlign: "middle" }}
                alt=""
              />{" "}
              <ListEntrySpan>
                {champion.name}:{" "}
                {Math.round((champion.wins / champion.count) * 100)}% wins (
                {champion.count} games)
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </>
  )
}

export default BestWinRatio
