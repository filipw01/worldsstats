import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import useData, { SettingsContext } from "../hooks/useData"
import {
  DataEntry,
  DataContainer,
  DataEntrySpan,
  Header2,
} from "./styledComponents"

const AverageGameTime = ({ displayTeams }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          nodes {
            name
            gameLength
          }
        }
      }
    `
  )
  const { uniqueTeams } = useData(useContext(SettingsContext))
  const teams = []
  for (const uniqueTeam of uniqueTeams) {
    teams.push({
      name: uniqueTeam,
      gameLength: [],
    })
  }
  for (const teamData of data.allDataJson.nodes) {
    teams.forEach(team => {
      if (team.name === teamData.name) {
        team.gameLength.push(teamData.gameLength)
      }
    })
  }

  const mappedTeams = teams.map(game => {
    const totalGameLength = game.gameLength.reduce((acc, curr) => {
      const gameLengthArray = curr.split(":")
      const gameLengthInSeconds =
        Number(gameLengthArray[0]) * 60 + Number(gameLengthArray[1])
      return acc + gameLengthInSeconds
    }, 0)
    return {
      averageGameLengthInSeconds: totalGameLength / game.gameLength.length,
      name: game.name,
    }
  })
  let place
  const sortedTeams = mappedTeams
    .sort((a, b) => a.averageGameLengthInSeconds - b.averageGameLengthInSeconds)
    .filter((team, index) => {
      if (displayTeams.includes(team.name)) {
        place = index + 1
        return true
      }
      return false
    })
  let nth = "th"
  if (place % 10 === 1) {
    nth = "st"
  } else if (place % 10 === 2) {
    nth = "nd"
  } else if (place % 10 === 3) {
    nth = "rd"
  }
  return (
    <section>
      <Header2>Average game time</Header2>
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
                <div style={{ whiteSpace: "nowrap" }}>
                  <div>
                    {Math.floor(team.averageGameLengthInSeconds / 60)}:
                    {Math.round(team.averageGameLengthInSeconds % 60)}
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

export default AverageGameTime
