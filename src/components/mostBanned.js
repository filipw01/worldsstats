import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { ListEntry, ListEntrySpan, TopList, Header2 } from "./styledComponents"

const MostBanned = ({ limit, gamesCount }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              bans {
                id
                image
              }
            }
          }
        }
      }
    `
  )
  const bans = []
  for (const teamData of data.allDataJson.edges) {
    for (const teamBan of teamData.node.bans) {
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
      <TopList>
        {sortedBans.map((ban, index) => {
          return (
            <ListEntry key={index}>
              <img
                src={ban.image}
                style={{ height: "50px", verticalAlign: "middle" }}
                alt=""
              />
              <ListEntrySpan>
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
              </ListEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default MostBanned
