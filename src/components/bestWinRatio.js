import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const BestWinRatio = () => {
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
  const sortedChampions = champions.sort((a, b) => {
    return b.wins/b.count - a.wins/a.count || b.count - a.count
  })
  return (
    <>
      <h1>Highest win ratio champions</h1>
      <ul>
        {sortedChampions.map((champion, index) => {
          return (
            <li key={index}>
              <img
                src={champion.image}
                style={{ height: "40px", verticalAlign: "middle" }}
                alt=""
              />{" "}
              {champion.name}: {Math.round(champion.wins/champion.count*100)}% wins ({champion.count} games)
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default BestWinRatio
