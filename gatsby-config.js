require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Tasting Kitchen (TK)`,
    description: `Tasting Kitchen (TK) is Asia’s premier epicurean lifestyle brand, presenting the best in food and drink, art and design, and luxury travel across the globe.`,
    author: `@gatsbyjs`,
    siteUrl: 'https://www.tasting-kitchen.com/',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-166107621-1',
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-robots-txt`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-s3`,
    //   options: {
    //     bucketName: process.env.S3_HOSTING_ENDPOINT,
    //   },
    // },
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
        icon: `src/images/tk-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: 'en',
        langKeyForNull: 'en',
        prefixDefault: false,
        useLangKeyLayout: false,
      },
    },
    // {
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: `301730536`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: `4294036017`,
    //   },
    // },
  ],
};
