module.exports = {
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-cosmicjs',
      options: {
        bucketSlug: `joincepcloud`, // process.env.COSMIC_BUCKET,
        objectTypes: ['posts','settings'],
        apiAccess: {
          read_key: `RruOD0tvhX00wFRkpO6ITsHCOoAxw7XdCLLqUGl6rOnirvYKyb` //process.env.COSMIC_READ_KEY,
        },
        localMedia: true
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
