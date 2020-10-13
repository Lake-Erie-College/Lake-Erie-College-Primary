import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'

const SEO = ({ title, description }) => {
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
                <>
                    <meta name="description" content={description.description} />
                    <meta property="og:description" content={description.description} />
                </>
            )}
        </Helmet>
    )
}

export default SEO