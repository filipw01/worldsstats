import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { ListEntry, DataEntrySpan, TopList, Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const MostBanned = ({ limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            bans {
              id
              image
            }
          }
        }
        allPlayInsJson {
          nodes {
            bans {
              id
              image
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
  const bans = []
  for (const teamData of allTeams) {
    for (const teamBan of teamData.bans) {
      const isNewBan = bans.filter(ban => ban.name === teamBan.id).length === 0
      if (isNewBan) {
        bans.push({
          name: teamBan.id,
          image: teamBan.image,
          count: 1,
        })
      } else {
        bans.forEach(ban => {
          if (ban.name === teamBan.id) {
            ban.count++
          }
        })
      }
    }
  }
  const sortedBans = bans
    .sort((a, b) => {
      return b.count - a.count
    })
    .slice(0, limit)
  return (
    <section>
      <Header2>Most banned champions</Header2>
      <p>Champions that both teams are afraid to face</p>
      <TopList>
        {sortedBans.map((ban, index) => {
          return (
            <ListEntry key={index}>
              <img
                src={ban.image}
                style={{ height: "50px", verticalAlign: "middle" }}
                alt=""
              />
              <DataEntrySpan>
                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: "18px" }}>{ban.name}</div>
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    {ban.count} bans
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {Math.round((ban.count / gamesCount) * 100)}%
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default MostBanned
