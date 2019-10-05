import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const MostPurchasedItems = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                items {
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
  const items = []
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      for (const itemData of playerData.items) {
        
      const isNewItem =
        items.filter(item => item.id === itemData.id)
          .length === 0
      if (isNewItem) {
        items.push({
          id: itemData.id,
          image: itemData.image,
          count: 1,
        })
      } else {
        items.forEach(item => {
          if (item.id === itemData.id) {
            item.count++
          }
        })
      }
    }
  }
  }
  const sortedItems = items.sort((a, b) => {
    return b.count - a.count
  })
  return (
    <>
      <h1>Most purchased items</h1>
      <ul>
        {sortedItems.map((item, index) => {
          return (
            <li key={index}>
              <img src={item.image} alt={`Item with id ${item.id}`}/>{item.id}: {item.count}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MostPurchasedItems
