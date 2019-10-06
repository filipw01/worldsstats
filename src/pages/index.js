import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import MostPicked from "../components/mostPicked"
import MostBanned from "../components/mostBanned"
import MostPurchasedItems from "../components/mostPurchasedItems"

const IndexPage = ({ data }) => {
  const uniqueTeams = []
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
      uniqueTeams.filter(team => team === teamData.node.name).length === 0
    if (isNewTeam) {
      uniqueTeams.push(teamData.node.name)
    }
  }
  const uniquePlayers = []
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      const isNewPlayer =
        uniquePlayers.filter(player => player.name === playerData.name).length === 0
      if (isNewPlayer) {
        uniquePlayers.push({ name: playerData.name, team: teamData.node.name })
      }
    }
  }
  return (
    <Layout>
      {uniqueTeams.map(uniqueTeam => (
        <Link
          key={uniqueTeam}
          style={{ marginRight: "20px" }}
          to={`/${uniqueTeam.toLowerCase()}/`}
        >
          {uniqueTeam}
        </Link>
      ))}
      <MostPurchasedItems />
      <MostBanned />
      <MostPicked />
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          name
          players{
            name
          }
        }
      }
    }
  }
`

export default IndexPage
