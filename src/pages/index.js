import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import AverageGameTime from "../components/averageGameTime"
import MostPicked from "../components/mostPicked"
import MostBanned from "../components/mostBanned"
import MostPurchasedItems from "../components/mostPurchasedItems"
import FirstBloodPerGame from "../components/firstBloodPerGame"
import TeamMostPicked from "../components/teamMostPicked"
import TeamObjectives from "../components/teamObjectives"
import GoldDifferenceAt15 from "../components/goldDifferenceAt15"
const IndexPage = ({ data }) => {
  const uniqueTeams = []
  for (const teamData of data.allDataJson.edges) {
    const isNewTeam =
    uniqueTeams.filter(team => team === teamData.node.name).length === 0
    if (isNewTeam) {
      uniqueTeams.push(teamData.node.name)
    }
  }
  return (
    <Layout>
      <GoldDifferenceAt15 uniqueTeams={uniqueTeams}/>
      <TeamObjectives uniqueTeams={uniqueTeams} />
      <TeamMostPicked uniqueTeams={uniqueTeams} />
      <FirstBloodPerGame />
      <MostPurchasedItems />
      <MostBanned />
      <MostPicked />
      <AverageGameTime />
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  query {
    allDataJson {
      edges {
        node {
          name
        }
      }
    }
  }
`

export default IndexPage
