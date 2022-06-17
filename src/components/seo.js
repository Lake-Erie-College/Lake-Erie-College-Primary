import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'

const SEO = ({ title, description, robots, location }) => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                    siteUrl
                }
            }
        }
    `)

    const siteTitle = get(data, 'site.siteMetadata.title')
    const siteUrl = get(data, 'site.siteMetadata.siteUrl')

    const hasDescription = typeof description !== 'undefined' && description !== null

    return (
        <Helmet>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta property="og:title" content={title} />
            {hasDescription && (
                <meta name="description" content={description.description} />
            )}
            {hasDescription && (
                <meta property="og:description" content={description.description} />
            )}
            {robots && (
                <meta name="robots" content={robots} />
            )}
            <link rel="canonical" href={`${siteUrl}${location.pathname || location}`} />
        </Helmet>
    )
}

export default SEO