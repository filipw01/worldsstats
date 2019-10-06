import { useStaticQuery, graphql } from "gatsby"
import React, { useState } from "react"
import { ListEntry, ListEntrySpan, TopList } from "./styledComponents"

const MostPurchasedItems = ({ limit, gamesCount }) => {
  const [includeBoots, setIncludeBoots] = useState(false)

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
          items.filter(item => item.id === itemData.id).length === 0
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
  const setIncludeBootsAdapter = () => {
    setIncludeBoots(!includeBoots)
  }
  const trinketsList = ["3364", "3340", "2055", "3363"]
  const bootsList = ["3111", "3020", "3047", "3006", "3117"]
  const notFinalItemsList = [
    "2421",
    "3067",
    "1058",
    "1055",
    "2420",
    "2033",
    "1026",
    "3140",
    "1028",
    "1038",
    "1031",
    "1029",
    "1052",
    "3024",
    "3108",
    "2031",
    "3155",
    "3916",
    "1082",
    "1033",
    "3086",
    "2424",
    "3098",
    "1037",
    "3052",
    "3211",
    "1036",
    "3114",
    "1011",
    "1053",
    "3096",
    "1056",
    "3191",
    "3077",
    "3123",
    "3134",
    "3105",
    "3801",
    "3044",
    "1051",
    "1057",
    "3082",
    "3097",
    "1054",
    "2423",
    "3136",
    "1042",
    "3133",
    "2422",
    "2138",
    "1018",
    "3028",
    "3076",
    "3035",
    "3113",
    "3802",
    "1004",
    "1001",
  ]
  const sortedItems = items
    .sort((a, b) => {
      return b.count - a.count
    })
    .filter(
      item =>
        !trinketsList.includes(item.id) &&
        !notFinalItemsList.includes(item.id) &&
        (includeBoots || !bootsList.includes(item.id))
    )
    .slice(0, limit)

  return (
    <>
      <h2>Most purchased items</h2>
      <label>
        Include boots{" "}
        <input
          type="checkbox"
          value={includeBoots}
          onChange={setIncludeBootsAdapter}
        />
      </label>
      <TopList>
        {sortedItems.map((item, index) => {
          return (
            <ListEntry key={index}>
              <img src={item.image} style={{ height: "50px", verticalAlign: "middle" }} alt={`Item with id ${item.id}`} />
              <ListEntrySpan>{item.count} ({Math.round(item.count/gamesCount*100)/100} per game)</ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </>
  )
}

export default MostPurchasedItems
