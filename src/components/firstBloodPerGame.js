import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import useData, { SettingsContext } from "../hooks/useData"
import {
  Header2,
  DataEntry,
  DataEntrySpan,
  DataContainer,
} from "./styledComponents"

const FirstBloodPerGame = ({ displayTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
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
        allPlayInsJson {
          nodes {
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
    `
  )
  const { uniqueTeams} = useData(useContext(SettingsContext))
  const { includePlayIns } = useContext(SettingsContext)

  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      firstBloods: 0,
      numberOfGames: 0,
    })
  }
  for (const teamData of allTeams) {
    const isAllyFirstBlood =
      teamData.players.filter(
        player => player.champion.id === teamData.firstBlood.id
      ).length === 1
    if (isAllyFirstBlood) {
      teams.forEach(team => {
        if (team.name === teamData.name) {
          team.firstBloods++
        }
      })
    }
  }
  for (const teamData of allTeams) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.numberOfGames++
      }
    })
  }
  let place
  const sortedTeams = teams
    .sort(
      (a, b) =>
        b.firstBloods/b.numberOfGames - a.firstBloods/a.numberOfGames || a.firstBloods - b.firstBloods
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
