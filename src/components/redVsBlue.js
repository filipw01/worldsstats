import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const RedVsBlue = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            win
          }
        }
        allPlayInsJson {
          nodes {
            win
          }
        }
      }
    `
  )
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const gamesCount = allTeams.length / 2
  const sideWins = { blueWins: 0, redWins: 0 }
  for (const key in allTeams) {
    if (allTeams[key].win === true) {
      if (key % 2) {
        sideWins.blueWins++
      } else {
        sideWins.redWins++
      }
    }
  }
  const blueWinsPercentage = Math.round((sideWins.blueWins / gamesCount) * 100)
  const redWinsPercentage = Math.round((sideWins.redWins / gamesCount) * 100)

  return (
    <section>
      <Header2>Win Ratio: Blue vs Red </Header2>
      <p>Percentage of games won by blue and red team</p>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          margin: "30px 0",
          textAlign: "center",
          height: "250px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <div
            style={{
              width: "70px",
              height: `${blueWinsPercentage * 3}px`,
              backgroundColor: "#2747e8",
              marginBottom: "10px",
            }}
          ></div>
          {blueWinsPercentage}%
        </div>
        <div>
          <div
            style={{
              width: "70px",
              height: `${redWinsPercentage * 3}px`,
              backgroundColor: "#cb2124",
              marginBottom: "10px",
            }}
          ></div>
          {redWinsPercentage}%
        </div>
      </div>
    </section>
  )
}

export default RedVsBlue
