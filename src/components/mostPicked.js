import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { ListEntry, ListEntrySpan, TopList } from "./styledComponents"

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
    <>
      <h2>Most picked champions</h2>
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
                {champion.name}: {Math.round((champion.count / gamesCount) * 100)}% of games
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </>
  )
}

export default MostPicked
