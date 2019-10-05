import { useStaticQuery, graphql } from "gatsby"
import React from "react"

const FirstBloodPerGame = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              players {
                champion {
                  id
                }
              }
              firstBlood {
                id
              }
              name
            }
          }
        }
      }
    `
  )
  const teams = []
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
      teams.filter(team => team.name === teamData.node.name).length === 0
    const isAllyFirstBlood =
      teamData.node.players.filter(
        player => player.champion.id === teamData.node.firstBlood.id
      ).length === 1
    if (isNewTeam && isAllyFirstBlood) {
      teams.push({
        name: teamData.node.name,
        firstBloods: 1,
        numberOfGames: 0,
      })
    } else if (isAllyFirstBlood) {
      teams.forEach(team => {
        if (team.name === teamData.node.name) {
          team.firstBloods++
        }
      })
    }
  }
  for (const teamData of data.allDataJson.edges) {
    teams.forEach(team => {
      if (team.name === teamData.node.name) {
        team.numberOfGames++
      }
    })
  }
  const sortedTeams = teams.sort((a,b)=>b.firstBloods-a.firstBloods||a.numberOfGames-b.numberOfGames)
  return (
    <>
      <h1>First blood</h1>
      <ul>
        {sortedTeams.map((team, index) => {
          return (
            <li key={index}>
              {team.name}: {team.firstBloods} ({Math.round(team.firstBloods/team.numberOfGames*100)}% of games)
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FirstBloodPerGame
