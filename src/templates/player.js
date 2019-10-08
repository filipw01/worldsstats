import React from "react"
import Layout from "../components/layout"
import DamagePerMinute from "../components/damagePerMinute"
import CreepsPerMinute from "../components/creepsPerMinute"
import GoldPerMinute from "../components/goldPerMinute"
import KillsPerGame from "../components/killsPerGame"
import DeathsPerGame from "../components/deathsPerGame"
import KDA from "../components/kda"
import { Header2 } from "../components/styledComponents"
import { useStaticQuery, Link } from "gatsby"

export default ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    query {
      allDataJson {
        totalCount
        edges {
          node {
            name
            players {
              name
            }
          }
        }
      }
    }
  `)
  const player = { name: pageContext.playerName, team: pageContext.teamName }
  const uniquePlayers = []
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      const isNewPlayer =
        uniquePlayers.filter(player => player === playerData.name).length === 0
      if (isNewPlayer) {
        uniquePlayers.push(playerData.name)
      }
    }
  }
  return (
    <Layout>
      <Link
        style={{ marginRight: "20px", color: "#bbb" }}
        to={`/${player.team.toLowerCase()}/`}
      >
        {player.team}
      </Link>
      <section>
        <Header2>{player.name}</Header2>
        <KDA
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
        <DeathsPerGame
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
        <KillsPerGame
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
        <GoldPerMinute
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
        <CreepsPerMinute
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
        <DamagePerMinute
          uniquePlayers={uniquePlayers}
          displayPlayers={[pageContext.playerName]}
        />
      </section>
    </Layout>
  )
}
