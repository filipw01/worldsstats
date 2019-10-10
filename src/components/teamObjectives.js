import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import {
  Header2,
  DataContainer,
  DataEntry,
  DataEntrySpan,
} from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const TeamObjectives = ({ displayTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            name
            towers
            inhibitors
            herald
            dragons
            barons
          }
        }
        allPlayInsJson {
          nodes {
            name
            towers
            inhibitors
            herald
            dragons
            barons
          }
        }
      }
    `
  )
  const teams = []
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  for (const displayTeam of displayTeams) {
    teams.push({
      name: displayTeam,
      towers: 0,
      inhibitors: 0,
      heralds: 0,
      dragons: 0,
      barons: 0,
      gamesCount: 0,
    })
  }
  for (const teamData of allTeams) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.towers += Number(teamData.towers)
        team.inhibitors += Number(teamData.inhibitors)
        team.heralds += Number(teamData.herald)
        team.dragons += Number(teamData.dragons)
        team.barons += Number(teamData.barons)
        team.gamesCount++
      }
    })
  }

  return (
    <section>
      <Header2>Neutral objectives</Header2>
      {teams.map((team, index) => (
        <DataContainer key={index}>
          <DataEntry>
            <DataEntrySpan>
              <div style={{ width: "100%", fontSize: "24px" }}>Towers</div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {Math.round((team.towers / team.gamesCount) * 100) / 100}
                <div style={{ fontSize: "14px", color: "#bbb" }}>per game</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
          <DataEntry>
            <DataEntrySpan>
              <div style={{ width: "100%", fontSize: "24px" }}>Inhibitors</div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {Math.round((team.inhibitors / team.gamesCount) * 100) / 100}{" "}
                <div style={{ fontSize: "14px", color: "#bbb" }}>per game</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
          <DataEntry>
            <DataEntrySpan>
              <div style={{ width: "100%", fontSize: "24px" }}>Heralds</div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {Math.round((team.heralds / team.gamesCount) * 100) / 100}
                <div style={{ fontSize: "14px", color: "#bbb" }}>per game</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
          <DataEntry>
            <DataEntrySpan>
              <div style={{ width: "100%", fontSize: "24px" }}>Dragons</div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {Math.round((team.dragons / team.gamesCount) * 100) / 100}
                <div style={{ fontSize: "14px", color: "#bbb" }}>per game</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
          <DataEntry>
            <DataEntrySpan>
              <div style={{ width: "100%", fontSize: "24px" }}>Barons</div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                {Math.round((team.barons / team.gamesCount) * 100) / 100}
                <div style={{ fontSize: "14px", color: "#bbb" }}>per game</div>
              </div>
            </DataEntrySpan>
          </DataEntry>
        </DataContainer>
      ))}
    </section>
  )
}

export default TeamObjectives
