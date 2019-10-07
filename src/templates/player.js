import React from "react"
import Layout from "../components/layout"
import DamagePerMinute from "../components/damagePerMinute"
import CreepsPerMinute from "../components/creepsPerMinute"
import GoldPerMinute from "../components/goldPerMinute"
import KillsPerGame from "../components/killsPerGame"
import DeathsPerGame from "../components/deathsPerGame"
import KDA from "../components/kda"
import { Header2 } from "../components/styledComponents"

export default ({ pageContext }) => {
  const player = { name: pageContext.playerName }
  return (
    <Layout>
      <Header2>{player.name}</Header2>
      <KDA uniquePlayers={[player]} />
      <DeathsPerGame uniquePlayers={[player]} />
      <KillsPerGame uniquePlayers={[player]} />
      <GoldPerMinute uniquePlayers={[player]} />
      <CreepsPerMinute uniquePlayers={[player]} />
      <DamagePerMinute uniquePlayers={[player]} />
    </Layout>
  )
}
