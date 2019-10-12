import React, { useContext } from "react"
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
import useData, { SettingsContext } from "../hooks/useData"

export default ({ pageContext }) => {
  const { eliminatedTeams } = useData(useContext(SettingsContext))

  const player = { name: pageContext.playerName, team: pageContext.teamName }
  return (
    <Layout>
      {eliminatedTeams.includes(player.team) ? <EliminatedBadge /> : ""}
      <Link
        style={{ marginRight: "20px" }}
        to={`/${player.team.toLowerCase()}/`}
      >
        {player.team}
      </Link>
      <Header2>{player.name}</Header2>
      <div className="layout">
        <KDA displayPlayers={[pageContext.playerName]} />
        <DeathsPerGame displayPlayers={[pageContext.playerName]} />
        <KillsPerGame displayPlayers={[pageContext.playerName]} />
        <GoldPerMinute displayPlayers={[pageContext.playerName]} />
        <CreepsPerMinute displayPlayers={[pageContext.playerName]} />
        <DamagePerMinute displayPlayers={[pageContext.playerName]} />
      </div>
      <SEO title={`${player.name} Statistics`} />
    </Layout>
  )
}
