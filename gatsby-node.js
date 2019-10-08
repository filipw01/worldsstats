/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const teamTemplate = path.resolve(`src/templates/team.js`)
  const playerTemplate = path.resolve(`src/templates/player.js`)

  return graphql(
    `
      query {
        allDataJson {
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
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    const uniqueTeams = []
    for (const teamData of result.data.allDataJson.edges) {
      const isNewTeam =
        uniqueTeams.filter(team => team === teamData.node.name).length === 0
      if (isNewTeam) {
        uniqueTeams.push(teamData.node.name)
      }
    }
    const uniquePlayers = []
    for (const teamData of result.data.allDataJson.edges) {
      for (const playerData of teamData.node.players) {
        const isNewPlayer =
          uniquePlayers.filter(player => player.name === playerData.name).length ===
          0
        if (isNewPlayer) {
          uniquePlayers.push({
            name: playerData.name,
            team: teamData.node.name,
          })
        }
      }
    }
    uniqueTeams.forEach(uniqueTeam => {
      const players = uniquePlayers.filter(
        uniquePlayer => uniquePlayer.team === uniqueTeam
      )
      createPage({
        path: `/${uniqueTeam.toLowerCase()}/`,
        component: teamTemplate,
        context: {
          players,
          team: uniqueTeam
        },
      })
    })
    uniquePlayers.forEach(uniquePlayer => {
      createPage({
        path: `/${uniquePlayer.team.toLowerCase()}/${uniquePlayer.name
          .toLowerCase()
          .replace(" ", "-")}/`,
        component: playerTemplate,
        context: {
          playerName: uniquePlayer.name,
          teamName: uniquePlayer.team
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      })
    })
  })
}
