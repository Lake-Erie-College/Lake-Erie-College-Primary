import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import LocationEmbed from '../components/location'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class LocationTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulLocation')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        const summary = typeof page.summary !== 'undefined' && page.summary !== null ? page.summary.summary : null

        return (
            <Layout location={this.props.location}>
                <HelmetProvider>
                    <Helmet>
                        <title>{`${page.title} | ${siteTitle}`}</title>
                    </Helmet>
                </HelmetProvider>
                <main>
                    <PageHeading
                        primary={page.title}
                        overline={page.category ? page.category.title : null}
                        linkTo={page.category}
                    />
                    <LocationEmbed photo={page.photo} summary={summary} />
                    <PrimaryContent data={page.primaryContent} />
                </main>
            </Layout>
        )
    }
}

export default LocationTemplate

export const pageQuery = graphql`
    query LocationBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulLocation(slug: { eq: $slug }) {
            title
            shortTitle
            slug
            description {
                description
            }
            summary {
                summary
            }
            category {
                title
                category {
                    slug
                }
                shortTitle
                slug
            }
            photo {
                ...Asset
            }
            primaryContent {
                raw
                references {
                    # contentful_id is required to resolve the references
                    contentful_id
                    ...AcademicOffering
                    ...Asset
                    ...Department
                    ...Event
                    ...Homepage
                    ...Location
                    ...Person
                    ...NavigationItem
                    ...StandardPage
                    ...BlockAcademicOfferingListing
                    ...BlockCarousel
                    ...BlockEventListing
                    ...BlockExternalEmbed
                    ...BlockMediaWithCaption
                    ...BlockPersonListing
                    ...BlockQuote
                    ...BlockSearchResults
                    ...BlockSpotlightContent
                }
            }
        }
    }
`
