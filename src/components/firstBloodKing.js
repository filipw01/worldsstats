import { useStaticQuery, graphql, Link } from "gatsby"
import React, {useContext} from "react"
import { TopList, ListEntry, DataEntrySpan, Header2 } from "./styledComponents"
import useData, {SettingsContext} from "../hooks/useData"

const FirstBloodKing = ({ limit }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMainEventJson {
          nodes {
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
        allPlayInsJson {
          nodes {
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
    `
  )
  const { includePlayIns } = useContext(SettingsContext)
  let allTeams = data.allMainEventJson.nodes
  if (includePlayIns) {
    allTeams = [...allTeams, ...data.allPlayInsJson.nodes]
  }
  const { uniquePlayers } = useData(useContext(SettingsContext))
  const players = []
  for (const uniquePlayer of uniquePlayers) {
    players.push({
      team: uniquePlayer.team,
      name: uniquePlayer.name,
      firstBloods: 0,
      numberOfGames: 0,
    })
  }
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
      if (playerData.champion.id === teamData.firstBlood.id) {
        players.forEach(player => {
          if (player.name === playerData.name) {
            player.firstBloods++
          }
        })
      }
    }
  }
  for (const teamData of allTeams) {
    for (const playerData of teamData.players) {
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
                <div className="hover-entry" style={{ width: "100%" }}>
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
