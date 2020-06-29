require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log('process.env.GATSBY_AUTH0_DOMAIN', process.env.GATSBY_AUTH0_DOMAIN);
console.log(
  'process.env.GATSBY_AUTH0_CLIENTID',
  process.env.GATSBY_AUTH0_CLIENTID
);
console.log(
  'process.env.GATSBY_AUTH0_CALLBACK',
  process.env.GATSBY_AUTH0_CALLBACK
);
console.log(
  'process.env.GATSBY_WP_GRAPHQL_ENDPOINT',
  process.env.GATSBY_WP_GRAPHQL_ENDPOINT
);

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-166107621-1',
        head: true,
      },
    },
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WordPress`,
        // refetching the data
        // refetchInterval: 60,
        // This is field under which it's accessible
        fieldName: `wordpress`,
        // Url to query from
        url: process.env.GATSBY_WP_GRAPHQL_ENDPOINT,
      },
    },
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
