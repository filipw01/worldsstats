import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MostPicked from "../components/mostPicked"
import MostBanned from "../components/mostBanned"
import MostPurchasedItems from "../components/mostPurchasedItems"
import FirstBloodKing from "../components/firstBloodKing"
import BestWinRatio from "../components/bestWinRatio"
import useData from "../hooks/useData"

const IndexPage = ({ data }) => {
  const { uniquePlayers } = useData()
  const gamesCount = data.allDataJson.totalCount / 2
  return (
    <Layout>
      <div className="layout">
        <BestWinRatio limit={5} initialMinimumGamesPlayed={5} />
        <FirstBloodKing uniquePlayers={uniquePlayers} limit={5} />
        <MostBanned limit={5} gamesCount={gamesCount} />
        <MostPicked limit={5} gamesCount={gamesCount} />
        <MostPurchasedItems limit={5} gamesCount={gamesCount} />
      </div>
      <SEO title="Home" />
    </Layout>
  )
}

export const query = graphql`
  query {
    allDataJson {
      totalCount
    }
  }
`

export default IndexPage
