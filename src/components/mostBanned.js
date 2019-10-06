import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const MostBanned = () => {
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
      const isNewBan =
        bans.filter(ban => ban.name === teamBan.id)
          .length === 0
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
  const sortedBans = bans.sort((a, b) => {
    return b.count - a.count
  })
  return (
    <>
      <h1>Most banned champions</h1>
      <ul>
        {sortedBans.map((ban, index) => {
          return (
            <li key={index}>
              <img src={ban.image} style={{height: "40px",verticalAlign:"middle"}} alt=""/> {ban.name}: {ban.count}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MostBanned
