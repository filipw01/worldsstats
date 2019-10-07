import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MostPicked from "../components/mostPicked"
import MostBanned from "../components/mostBanned"
import MostPurchasedItems from "../components/mostPurchasedItems"
import FirstBloodKing from "../components/firstBloodKing"
import BestWinRatio from "../components/bestWinRatio"

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
        uniquePlayers.filter(player => player.name === playerData.name)
          .length === 0
      if (isNewPlayer) {
        uniquePlayers.push({ name: playerData.name, team: teamData.node.name })
      }
    }
  }
  const gamesCount = data.allDataJson.totalCount / 2
  return (
    <Layout>
      {uniqueTeams.map(uniqueTeam => (
        <Link
          key={uniqueTeam}
          style={{ marginRight: "20px", color: "#bbb" }}
          to={`/${uniqueTeam.toLowerCase()}/`}
        >
          {uniqueTeam}
        </Link>
      ))}
      <BestWinRatio limit={5} initialMinimumGamesPlayed={4} />
      <FirstBloodKing uniquePlayers={uniquePlayers} limit={5} />
      <MostPurchasedItems limit={5} gamesCount={gamesCount} />
      <MostBanned limit={5} gamesCount={gamesCount} />
      <MostPicked limit={5} gamesCount={gamesCount} />
      <SEO title="Home" />
    </Layout>
  )
}

export const query = graphql`
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
`

export default IndexPage
