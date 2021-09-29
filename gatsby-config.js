module.exports = {
  siteMetadata: {
    title: `neuroapex`,
    description: `neuroapex: neuroimaging analytics platform for expert guidance`,
    author: `@cabeen`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    `gatsby-image`,
    `gatsby-plugin-modal-routing-3`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `resources/tools`,
        path: `${__dirname}/resources/tools`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `resources/datasets`,
        path: `${__dirname}/resources/datasets`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `resources/papers`,
        path: `${__dirname}/resources/papers`,
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `resources/tutorials`,
        path: `${__dirname}/resources/tutorials`,
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Roboto"],
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
