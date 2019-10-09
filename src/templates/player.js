import React from "react"
import Layout from "../components/layout"
import DamagePerMinute from "../components/damagePerMinute"
import CreepsPerMinute from "../components/creepsPerMinute"
import GoldPerMinute from "../components/goldPerMinute"
import KillsPerGame from "../components/killsPerGame"
import DeathsPerGame from "../components/deathsPerGame"
import EliminatedBadge from "../components/eliminatedBadge"
import SEO from "../components/seo"
import KDA from "../components/kda"
import { Header2 } from "../components/styledComponents"
import { Link } from "gatsby"
import useData from "../hooks/useData"

export default ({ pageContext }) => {
  const { uniquePlayers, eliminatedTeams } = useData()
  const player = { name: pageContext.playerName, team: pageContext.teamName }
  const uniquePlayersNames = uniquePlayers.map(player => player.name)
  return (
    <Layout>
      {eliminatedTeams.includes(player.team) ? <EliminatedBadge /> : ""}
      <Link
        style={{ marginRight: "20px", color: "#bbb" }}
        to={`/${player.team.toLowerCase()}/`}
      >
        {player.team}
      </Link>
      <Header2>{player.name}</Header2>
      <div className="layout">
        <KDA
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
        <DeathsPerGame
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
        <KillsPerGame
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
        <GoldPerMinute
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
        <CreepsPerMinute
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
        <DamagePerMinute
          uniquePlayers={uniquePlayersNames}
          displayPlayers={[pageContext.playerName]}
        />
      </div>
      <SEO title={player.name} />
    </Layout>
  )
}
