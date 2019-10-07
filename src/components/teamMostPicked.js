import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Header2, TopList, ListEntry, ListEntrySpan } from "./styledComponents"

const TeamMostPicked = ({ team, limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            name
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

  const champions = []
  for (const teamData of data.allDataJson.nodes) {
    for (const playerData of teamData.players) {
      const isNewChampion =
        champions.filter(champion => champion.name === playerData.champion.id)
          .length === 0
      if (teamData.name === team && isNewChampion) {
        champions.push({
          name: playerData.champion.id,
          image: playerData.champion.image,
          count: 1,
        })
      } else {
        champions.forEach(champion => {
          if (
            champion.name === playerData.champion.id &&
            teamData.name === team
          ) {
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
        {sortedChampions.map((champion) => (
          <ListEntry key={champion.name}>
            <img
              src={champion.image}
              style={{ height: "40px", verticalAlign: "middle" }}
              alt=""
            />{" "}
            <ListEntrySpan>
              <div style={{ width: "100%" }}>
                <div style={{ fontSize: "18px" }}>{champion.name}</div>
              </div>
              <div
                style={{
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {champion.count}
              </div>
            </ListEntrySpan>
          </ListEntry>
        ))}
      </TopList>
    </section>
  )
}

export default TeamMostPicked
