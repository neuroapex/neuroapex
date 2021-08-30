module.exports = {
  siteMetadata: {
    title: `neuroapex`,
    description: `neuroapex: neuroimaging analytics platform for expert guidance`,
    author: `@sgolovine`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Lobster"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `neuroapex`,
        short_name: `neuroapex`,
        start_url: `/`,
        background_color: `#2f323a`,
        theme_color: `#F3A712`,
        display: `browser`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `neuroapex.io`,
        customDomain: `analytics.glvn.co`,
        runInDevelopment: false,
      },
    },
    `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
  ],
}
