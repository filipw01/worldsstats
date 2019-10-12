import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MostPicked from "../components/mostPicked"
import MostBanned from "../components/mostBanned"
import MostPurchasedItems from "../components/mostPurchasedItems"
import FirstBloodKing from "../components/firstBloodKing"
import BestWinRatio from "../components/bestWinRatio"
import GameParticipation from "../components/gameParticipation"
import RedVsBlue from "../components/redVsBlue"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <h1 style={{ marginBottom: ".5em" }}>Worlds Stats 2019</h1>
        <div style={{ lineHeight: "1.33" }}>
          <p style={{ marginBottom: ".75em" }}>
            Check out{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lol.gamepedia.com/2019_Season_World_Championship"
            >
              League of Legends World Championship 2019
            </a>{" "}
            statistics
          </p>
          <p style={{ marginBottom: ".75em" }}>
            Customize displayed data. Exclude Play-In stage and teams that have
            been eliminated
          </p>
          <p>Find best teams and players, all in one place</p>
        </div>
      </div>
      <div className="layout">
        <BestWinRatio limit={5} initialMinimumGamesPlayed={5} />
        <FirstBloodKing limit={5} />
        <GameParticipation limit={5} />
        <MostBanned limit={5} />
        <MostPicked limit={5} />
        <RedVsBlue />
        <MostPurchasedItems limit={5} />
      </div>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
