import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import useData, { SettingsContext } from "../hooks/useData"
import {
  Header2,
  DataContainer,
  DataEntry,
  DataEntrySpan,
} from "./styledComponents"

const GoldDifferenceAt15 = ({ displayTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            name
            goldDifferenceAt15
          }
        }
        allPlayInsJson {
          nodes {
            name
            goldDifferenceAt15
          }
        }
      }
    `
  )
  const { uniqueTeams } = useData(useContext(SettingsContext))
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      goldDifferenceAt15: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of allTeams) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.goldDifferenceAt15 += Number(teamData.goldDifferenceAt15)
        team.gamesCount++
      }
    })
  }
  let place
  const sortedTeams = teams
    .sort(
      (a, b) =>
        b.goldDifferenceAt15 / b.gamesCount -
        a.goldDifferenceAt15 / a.gamesCount
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
      <Header2>Gold difference at 15</Header2>
      {sortedTeams.map((team, index) => (
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
                  {team.goldDifferenceAt15 > 0 ? "+" : ""}
                  {Math.round(team.goldDifferenceAt15 / team.gamesCount)}
                </div>
                <div style={{ fontSize: "14px", color: "#bbb" }}>gold</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
        </DataContainer>
      ))}
    </section>
  )
}

export default GoldDifferenceAt15
