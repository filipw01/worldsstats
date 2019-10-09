import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useRef } from "react"
import {
  TopList,
  ListEntry,
  DataEntrySpan,
  Header2,
  BaseButton,
} from "./styledComponents"
const BestWinRatio = ({ limit, initialMinimumGamesPlayed }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
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
    `
  )
  const [minimumGamesPlayed, setMinimumGamesPlayed] = useState(
    initialMinimumGamesPlayed
  )
  const [ascendingWinRatio, setAscendingWinRatio] = useState(false)
  const minimumGames = useRef(null)
  const setMinimumGamesPlayedAdapter = e =>
    setMinimumGamesPlayed(e.target.value)
  const champions = []
  for (const teamData of data.allDataJson.nodes) {
    for (const playerData of teamData.players) {
      const isNewChampion =
        champions.filter(champion => champion.name === playerData.champion.id)
          .length === 0
      if (isNewChampion) {
        champions.push({
          name: playerData.champion.id,
          image: playerData.champion.image,
          count: 1,
          wins: teamData.win ? 1 : 0,
        })
      } else {
        champions.forEach(champion => {
          if (champion.name === playerData.champion.id) {
            champion.count++
            if (teamData.win) {
              champion.wins++
            }
          }
        })
      }
    }
  }
  let sortedChampions
  if (ascendingWinRatio) {
    sortedChampions = champions.sort(
      (a, b) => a.wins / a.count - b.wins / b.count || a.count - b.count
    )
  } else {
    sortedChampions = champions.sort(
      (a, b) => b.wins / b.count - a.wins / a.count || b.count - a.count
    )
  }
  const filteredChampions = sortedChampions
    .filter(champion => champion.count >= minimumGamesPlayed)
    .slice(0, limit)

  return (
    <section>
      {ascendingWinRatio ? (
        <Header2>Lowest win ratio</Header2>
      ) : (
        <Header2>Highest win ratio</Header2>
      )}
      <label>
        Minimum games played:{" "}
        <input
          ref={minimumGames}
          min="1"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            width: "40px",
            fontSize: "24px",
            verticalAlign: "baseline",
            textAlign: "right",
            marginRight: "10px",
          }}
          type="number"
          value={minimumGamesPlayed}
          onChange={setMinimumGamesPlayedAdapter}
        />
        <BaseButton onClick={() => minimumGames.current.select()}>
          CHANGE
        </BaseButton>
      </label>
      <div>
        <BaseButton onClick={() => setAscendingWinRatio(!ascendingWinRatio)}>
          {ascendingWinRatio ? "SHOW HIGHEST" : "SHOW LOWEST"}
        </BaseButton>
      </div>
      <TopList>
        {filteredChampions.map((champion, index) => {
          return (
            <ListEntry key={index}>
              <img
                src={champion.image}
                style={{ height: "50px", verticalAlign: "middle" }}
                alt=""
              />{" "}
              <DataEntrySpan>
                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: "18px" }}>{champion.name}</div>
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    {champion.count} games
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {Math.round((champion.wins / champion.count) * 100)}%
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default BestWinRatio
