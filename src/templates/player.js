import React from "react"
import Layout from "../components/layout"
import DamagePerMinute from "../components/damagePerMinute"
import CreepsPerMinute from "../components/creepsPerMinute"
import GoldPerMinute from "../components/goldPerMinute"
import KillsPerGame from "../components/killsPerGame"

export default ({ path }) => {
  const [team, playerName] = path
    .slice(1, -1)
    .replace("-", " ")
    .split("/")
  const player = { name: playerName }
  return (
    <Layout>
      <KillsPerGame uniquePlayers={[player]} />
      <GoldPerMinute uniquePlayers={[player]} />
      <CreepsPerMinute uniquePlayers={[player]} />
      <DamagePerMinute uniquePlayers={[player]} />
    </Layout>
  )
}
