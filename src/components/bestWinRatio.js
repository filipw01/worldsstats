import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useRef } from "react"
import { TopList, ListEntry, ListEntrySpan, Header2 } from "./styledComponents"
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
  const minimumGames = useRef(null);
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
    const focusMinimumGames = ()=>{
      minimumGames.current.focus();
    }
  return (
    <section>
      <Header2>Highest win ratio</Header2>
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
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
      <label>
        Minimum games played{" "}
        <input
        ref={minimumGames}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#fff",
            width: "30px"
          }}
          type="number"
          value={minimumGamesPlayed}
          onChange={setMinimumGamesPlayedAdapter}
        />
        <button onClick={focusMinimumGames} style={{backgroundColor: "#0E0E0E", color: "#fff", padding: ".25rem 1rem", fontSize: ".875rem"}}>CHANGE</button>
      </label>
    </section>
  )
}

export default BestWinRatio
