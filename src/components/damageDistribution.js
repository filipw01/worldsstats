import { useStaticQuery, graphql } from "gatsby"
import React, { useState, useContext } from "react"
import { ListEntry, DataEntrySpan, TopList, Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const DamageDistribution = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            players {
              position
              damage
            }
          }
        }
        allPlayInsJson {
          nodes {
            players {
              position
              damage
            }
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
  const sideWins = { blueWins: 0, redWins: 0 }
  for (const teamData of allTeams) {
    if (teamData.win === true) {
      if (key % 2) {
        sideWins.blueWins++
      } else {
        sideWins.redWins++
      }
    }
  }

  return (
    <section>
      <Header2>Wins by map side</Header2>
      <div style={{ display: "flex" }}>
        <div
          stye={{
            width: "30px",
            height: `${sideWins.blueWins}px`,
            backgroundColor: "blue",
          }}
        >
          {sideWins.blueWins}
        </div>
        <div
          stye={{
            width: "30px",
            height: `${sideWins.redWins}px`,
            backgroundColor: "red",
          }}
        >
          {sideWins.redWins}
        </div>
      </div>
    </section>
  )
}

export default DamageDistribution
