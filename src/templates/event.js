import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PageDate from '../components/page-date'
import PageHeading from '../components/page-heading'
import PrimaryContent from '../components/primary-content'
import LeadImage from '../components/lead-image'

class EventTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulEvent')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        const hasLeadImage =
            typeof page.leadImage !== 'undefined' && page.leadImage !== null

        return (
            <Layout location={this.props.location}>
                <HelmetProvider>
                    <Helmet>
                        <title>{`${page.title} | ${siteTitle}`}</title>
                    </Helmet>
                </HelmetProvider>
                <main>
                    {hasLeadImage && (
                        <LeadImage
                            title={page.leadImage.title}
                            fluid={page.leadImage.fluid}
                            file={page.leadImage.file}
                        />
                    )}
                    <PageHeading
                        primary={page.shortTitle ? page.shortTitle : page.title}
                        secondary={'Event'}
                        overline={page.category ? page.category.title : null}
                        linkTo={page.category}
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
                # contentful_id is required to resolve the references
                contentful_id
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
