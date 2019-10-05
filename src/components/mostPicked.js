import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const MostPicked = () => {
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
  const sortedChampions = champions.sort((a, b) => {
    return b.count - a.count
  })
  return (
    <>
      <h1>Most picked champions</h1>
      <ul>
        {sortedChampions.map((champion, index) => {
          return (
            <li key={index}>
              {champion.name}: {champion.count}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MostPicked
