import { useStaticQuery, graphql, Link } from "gatsby"
import React from "react"
import { TopList, ListEntry, DataEntrySpan, Header2 } from "./styledComponents"

const FirstBloodKing = ({ uniquePlayers, limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allDataJson {
          edges {
            node {
              name
              players {
                name
                champion {
                  id
                }
              }
              firstBlood {
                id
              }
            }
          }
        }
      }
    `
  )
  const players = []
  for (const uniquePlayer of uniquePlayers) {
    players.push({
      team: uniquePlayer.team,
      name: uniquePlayer.name,
      firstBloods: 0,
      numberOfGames: 0,
    })
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      if (playerData.champion.id === teamData.node.firstBlood.id) {
        players.forEach(player => {
          if (player.name === playerData.name) {
            player.firstBloods++
          }
        })
      }
    }
  }
  for (const teamData of data.allDataJson.edges) {
    for (const playerData of teamData.node.players) {
      players.forEach(player => {
        if (player.name === playerData.name) {
          player.numberOfGames++
        }
      })
    }
  }
  const sortedPlayers = players
    .sort(
      (a, b) =>
        b.firstBloods - a.firstBloods || a.numberOfGames - b.numberOfGames
    )
    .slice(0, limit)
  return (
    <section>
      <Header2>First blood kings</Header2>
      <TopList>
        {sortedPlayers.map((player, index) => {
          return (
            <ListEntry key={index}>
              <DataEntrySpan>
                <div style={{ width: "100%" }}>
                  <Link
                    to={`/${player.team.toLowerCase()}/${player.name
                      .toLowerCase()
                      .replace(" ", "-")}/`}
                    style={{ textDecoration: "none" }}
                  >
                    <div style={{ fontSize: "18px", color: "#fff" }}>
                      {player.team} {player.name}
                    </div>
                    <div style={{ fontSize: "14px", color: "#bbb" }}>
                      {Math.round(
                        (player.firstBloods / player.numberOfGames) * 100
                      )}
                      % of games
                    </div>
                  </Link>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {player.firstBloods}
                </div>
              </DataEntrySpan>
            </ListEntry>
          )
        })}
      </TopList>
    </section>
  )
}

export default FirstBloodKing
