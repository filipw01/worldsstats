import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const TeamMostPicked = ({ uniqueTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
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
      }
    `
  )
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
    })
    const champions = []
    for (const teamData of data.allDataJson.edges) {
      for (const playerData of teamData.node.players) {
        const isNewChampion =
          champions.filter(champion => champion.name === playerData.champion.id)
            .length === 0
        if (
          teamData.node.name === uniqueTeam &&
          isNewChampion
        ) {
          champions.push({
            name: playerData.champion.id,
            image: playerData.champion.image,
            count: 1,
          })
        } else {
          champions.forEach(champion => {
            if (
              champion.name === playerData.champion.id &&
              teamData.node.name === uniqueTeam
            ) {
              champion.count++
            }
          })
        }
      }
    }
    const sortedChampions = champions.sort((a, b) => {
      return b.count - a.count
    })
    teams.forEach(team => {
      if (team.name === uniqueTeam) {
        team.champions = sortedChampions
      }
    })
  }

  return (
    <>
      <h1>Most picked champions per team</h1>
      <ul>
        {teams.map((team, index) => (
          <div key={index}>
            <p>{team.name}</p>
            <ul>
              {team.champions.map((champion, index) => (
                <li key={index}>
                  <img src={champion.image} style={{height: "40px",verticalAlign:"middle"}} alt=""/> {champion.name}: {champion.count}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </>
  )
}

export default TeamMostPicked
