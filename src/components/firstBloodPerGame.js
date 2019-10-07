import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Header2 } from "./styledComponents"

const FirstBloodPerGame = ({ uniqueTeams }) => {
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
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      firstBloods: 0,
      numberOfGames: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    const isAllyFirstBlood =
      teamData.node.players.filter(
        player => player.champion.id === teamData.node.firstBlood.id
      ).length === 1
    if (isAllyFirstBlood) {
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
  const sortedTeams = teams.sort(
    (a, b) => b.firstBloods - a.firstBloods || a.numberOfGames - b.numberOfGames
  )
  return (
    <section>
      <Header2>First blood</Header2>
      <ul>
        {sortedTeams.map((team, index) => {
          return (
            <li key={index}>
              {team.name}: {team.firstBloods} (
              {Math.round((team.firstBloods / team.numberOfGames) * 100)}% of
              games)
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FirstBloodPerGame
