module.exports = {
  siteMetadata: {
    title: `Worlds Stats 2019`,
    description: `Best customizable statistics from League of Legends World Championship 2019. Check out Play-In's, Main Event and the tournament as a whole. Best LoL stats out there.`,
    author: `Filip Wachowiak`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Worlds Stats 2019`,
        short_name: `Worlds Stats`,
        start_url: `/`,
        display: "standalone",
        background_color: `#0E0E0E`,
        theme_color: `#0E0E0E`,
        display: `minimal-ui`,
        icon: `src/images/logo.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-149612460-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
      },
    },
  ],
}
