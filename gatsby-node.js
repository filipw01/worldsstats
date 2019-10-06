/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const teamTemplate = path.resolve(`src/templates/team.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query {
        allDataJson {
          edges {
            node {
              name
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
    uniqueTeams.forEach(uniqueTeam => {
        createPage({
        // Path for this page — required
        path: `/${uniqueTeam.toLowerCase()}/`,
        component: teamTemplate,
        context: {
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
