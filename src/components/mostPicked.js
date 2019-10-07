import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { ListEntry, ListEntrySpan, TopList, Header2 } from "./styledComponents"

const MostPicked = ({ limit, gamesCount }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
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
        })
      } else {
        champions.forEach(champion => {
          if (champion.name === playerData.champion.id) {
            champion.count++
          }
        })
      }
    }
  }
  const sortedChampions = champions
    .sort((a, b) => {
      return b.count - a.count
    })
    .slice(0, limit)
  return (
    <section>
      <Header2>Most picked champions</Header2>
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
                    {champion.count} picks
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {Math.round((champion.count / gamesCount) * 100)}%
                </div>
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default MostPicked
