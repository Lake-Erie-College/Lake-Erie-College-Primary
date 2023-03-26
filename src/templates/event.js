import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import PageDate from '../components/page-date'
import PageHeading from '../components/page-heading'
import PrimaryContent from '../components/primary-content'
import LeadImage from '../components/lead-image'
import SEO from '../components/seo'

class EventTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulEvent')
        const hasLeadImage =
            typeof page.leadImage !== 'undefined' && page.leadImage !== null

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} location={this.props.location} />
                <main>
                    {hasLeadImage && (
                        <LeadImage
                            title={page.leadImage.title}
                            fluid={page.leadImage.fluid}
                            file={page.leadImage.file}
                            description={page.leadImage.description}
                        />
                    )}
                    <PageHeading
                        primary={page.shortTitle ? page.shortTitle : page.title}
                        secondary={'Event'}
                        overline={page.category ? page.category.title : null}
                        linkTo={page.category}
                        currentPage={page}
                    />
                    {page.startDateAndTime && (
                        <PageDate
                            startDate={page.startDateAndTime}
                            endDate={page.endDateAndTime}
                        />
                    )}
                    <PrimaryContent data={page.primaryContent} />
                </main>
            </Layout>
        )
    }
}

export default EventTemplate

export const pageQuery = graphql`
    query EventBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulEvent(slug: { eq: $slug }) {
            title
            shortTitle
            slug
            description {
                description
            }
            category {
                title
                category {
                    slug
                }
                shortTitle
                slug
            }
            startDateAndTime
            endDateAndTime
            primaryContent {
                raw
                references {
                    ...Asset
                    ...BlockExternalEmbed
                    ...BlockMediaWithCaption
                    ...Location
                    ...Person
                }
            }
            mapLocation {
                lat
                lon
            }
            campusLocation {
                slug
                category {
                    title
                    slug
                    shortTitle
                }
            }
            hidden
        }
    }
`
