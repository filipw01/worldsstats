import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import {
  Header2,
  DataEntry,
  DataEntrySpan,
  DataContainer,
} from "./styledComponents"

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
  let place
  const sortedTeams = teams
    .sort(
      (a, b) =>
        b.firstBloods - a.firstBloods || a.numberOfGames - b.numberOfGames
    )
    .filter((team, index) => {
      if (displayTeams.includes(team.name)) {
        place = index + 1
        return true
      }
      return false
    })
  let nth = "th"
  if (place === 1) {
    nth = "st"
  } else if (place === 2) {
    nth = "nd"
  } else if (place === 3) {
    nth = "rd"
  }
  return (
    <section>
      <Header2>First bloods</Header2>
      {sortedTeams.map((team, index) => {
        return (
          <DataContainer key={index}>
            <DataEntry>
              <DataEntrySpan style={{ fontSize: "24px" }}>
                <div style={{ width: "100%" }}>
                  {place}
                  {nth}{" "}
                  <div style={{ fontSize: "14px", color: "#bbb" }}>best</div>
                </div>
                <div style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                  <div>
                    {Math.round((team.firstBloods / team.numberOfGames) * 100)}%
                  </div>
                  <div style={{ fontSize: "14px", color: "#bbb" }}>
                    {team.numberOfGames} games
                  </div>
                </div>
              </DataEntrySpan>
            </DataEntry>
          </DataContainer>
        )
      })}
    </section>
  )
}

export default FirstBloodPerGame
