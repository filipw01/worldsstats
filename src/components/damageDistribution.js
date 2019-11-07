import { useStaticQuery, graphql } from "gatsby"
import React, { useContext } from "react"
import { Header2 } from "./styledComponents"
import { SettingsContext } from "../hooks/useData"

const DamageDistribution = ({ team }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
            name
            players {
              position
              damage
            }
          }
        }
        allPlayInsJson {
          nodes {
            name
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
  const damagePerRole = { top: 0, jungle: 0, mid: 0, adc: 0, support: 0 }
  const currentTeamGames = allTeams.filter(teamData => teamData.name === team)
  let totalTeamDamage = 0

  for (const game of currentTeamGames) {
    for (const player of game.players) {
      damagePerRole[player.position] += Number(player.damage)
      totalTeamDamage += Number(player.damage)
    }
  }
  let highestDamage = 0
  for (const key in damagePerRole) {
    if (damagePerRole.hasOwnProperty(key)) {
      const roleDamage = damagePerRole[key]
      if (highestDamage < roleDamage) {
        highestDamage = roleDamage
      }
    }
  }
  return (
    <section>
      <Header2>Damage distribution</Header2>
      <div style={{ maxWidth: "calc(100% - 50px)" }}>
        {Object.entries(damagePerRole).map(damagePerRole => {
          const damageDistributionWidth =
            (damagePerRole[1] / highestDamage) * 100
          const damageDistributionPercentage =
            (damagePerRole[1] / totalTeamDamage) * 100
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: `10px`,
              }}
            >
              <div
                key={damagePerRole[0]}
                style={{
                  width: `${damageDistributionWidth}%`,
                  height: `30px`,
                  backgroundColor: "rgb(244, 222, 50)",
                  flexShrink: "0",
                  color: "black",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  textIndent: "10px",
                  fontSize: "12px",
                }}
              >
                {damagePerRole[0]}
              </div>
              <span style={{ marginLeft: "10px" }}>
                {Math.round(damageDistributionPercentage)}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default DamageDistribution
