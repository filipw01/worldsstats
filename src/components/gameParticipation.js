import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { ListEntry, DataEntrySpan, TopList, Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const GameParticipation = ({ limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            bans {
              id
              image
            }
            players {
              champion {
                id
                image
              }
            }
          }
        }
        allPlayInsJson {
          nodes {
            bans {
              id
              image
            }
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
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const gamesCount = allTeams.length/2;
  const champions = []
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
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
    for (const teamBan of teamData.bans) {
      const isNewChampion = champions.filter(champion => champion.name === teamBan.id).length === 0
      if (isNewChampion) {
        champions.push({
          name: teamBan.id,
          image: teamBan.image,
          count: 1,
        })
      } else {
        champions.forEach(champion => {
          if (champion.name === teamBan.id) {
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
      <Header2>Picks and bans combined</Header2>
      <TopList>
        {sortedChampions.map((champion, index) => {
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
                    {champion.count} picks + bans
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
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default GameParticipation
