import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Header2 } from "./styledComponents"

const FirstBloodPerGame = ({ uniqueTeams, displayTeams }) => {
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
  let place;
  const sortedTeams = teams.sort(
    (a, b) => b.firstBloods - a.firstBloods || a.numberOfGames - b.numberOfGames
  ).filter((team, index)=>{
    if(displayTeams.includes(team.name)){
      place=index+1;
      return true
    }
    return false
  } )

  return (
    <section>
      <Header2>First bloods</Header2>
      {sortedTeams.map((team) => {
        return (
          <p>
            {place}/{uniqueTeams.length} teams {Math.round((team.firstBloods / team.numberOfGames) * 100)}% (total {team.numberOfGames} games) 
          </p>
        )
      })}
    </section>
  )
}

export default FirstBloodPerGame
