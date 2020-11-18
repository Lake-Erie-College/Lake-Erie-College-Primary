const queries = require('./src/utils/algolia')

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: process.env.CONTENTFUL_HOST,
    localeFilter: locale => locale.code === 'en-US',
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
    throw new Error(
        'Contentful spaceId and the access token need to be provided.'
    )
}

module.exports = {
    siteMetadata: {
        title: 'Lake Erie College',
        siteUrl: `https://www.lec.edu`,
    },
    plugins: [
        'gatsby-transformer-remark',
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-helmet-async',
        'gatsby-plugin-sharp',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-sass',
        'gatsby-transformer-inline-svg',
        'gatsby-plugin-use-query-params',
        {
            resolve: 'gatsby-source-contentful',
            options: contentfulConfig,
        },
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                queries,
                chunkSize: 10000, // default: 1000
            },
        },
        {
          resolve: `gatsby-plugin-netlify`,
          options: {
            headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
            allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
            mergeSecurityHeaders: true, // boolean to turn off the default security headers
            mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
            mergeCachingHeaders: true, // boolean to turn off the default caching headers
            transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
            generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
          },
        },
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `Lake Erie College`,
            short_name: `LEC`,
            start_url: `/`,
            background_color: `#094a3e`,
            theme_color: `#e8f2f8`,
            display: `standalone`,
            icon: `static/lec-favicon.svg`, // This path is relative to the root of the site.
          },
        },
        {
          resolve: `gatsby-plugin-offline`,
        },
        {
            resolve: 'gatsby-plugin-google-tagmanager',
            options: {
                id: 'GTM-57CDPX',

                // Include GTM in development.
                //
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: true,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                //
                // Defaults to null
                defaultDataLayer: { platform: 'gatsby' },

                // Specify optional GTM environment details.
                // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
                // gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
                // dataLayerName: 'YOUR_DATA_LAYER_NAME',

                // Name of the event that is triggered
                // on every Gatsby route change.
                //
                // Defaults to gatsby-route-change
                routeChangeEventName: 'gatsby-route-change',
            },
        },
        /*{
      resolve: 'gatsby-plugin-react-axe',
      options: {
        // Integrate react-axe in production. This defaults to false.
        showInProduction: false,
 
        // Options to pass to axe-core.
        // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
        axeOptions: {
          // Your axe-core options.
        },
        // Context to pass to axe-core.
        // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#context-parameter
        axeContext: {
          // Your axe-core context.
          include: [['#___gatsby']]
        }
      },
    },*/
    ],
}
