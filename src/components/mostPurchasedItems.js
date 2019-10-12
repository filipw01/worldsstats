import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useContext } from "react"
import { ListEntry, DataEntrySpan, TopList, Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const MostPurchasedItems = ({ limit }) => {
  const [includeBoots, setIncludeBoots] = useState(false)

  const data = useStaticQuery(
    graphql`
      query {
        allItemsJson {
          nodes {
            id
            name
          }
        }
        allMainEventJson {
          nodes {
            players {
              items {
                id
                image
              }
            }
          }
        }
        allPlayInsJson {
          nodes {
            players {
              items {
                id
                image
              }
            }
          }
        }
      }
    `
  )
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const gamesCount = allTeams.length/2;
  const items = []
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
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
    .map(item => {
      const newItem = item
      data.allItemsJson.nodes.forEach(itemData => {
        if (itemData.id === item.id) {
          newItem.name = itemData.name
        }
      })
      return newItem
    })

  return (
    <section>
      <Header2>Most purchased items</Header2>
      <label style={{ marginTop: "20px", display: "block" }}>
        Include boots{" "}
        <input
          type="checkbox"
          value={includeBoots}
          onChange={setIncludeBootsAdapter}
        />
      </label>
      <TopList>
        {sortedItems.map(item => {
          return (
            <ListEntry key={item.id}>
              <img
                src={item.image}
                style={{ height: "50px", verticalAlign: "middle" }}
                alt={`Item with id ${item.id}`}
              />
              <DataEntrySpan>
                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: "18px" }}>{item.name}</div>
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    {Math.round((item.count / gamesCount) * 100) / 100} per game
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.count}
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default MostPurchasedItems
