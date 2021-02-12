import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'

const SEO = ({ title, description, robots }) => {
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    const siteTitle = get(data, 'site.siteMetadata.title')

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
        </Helmet>
    )
}

export default SEO