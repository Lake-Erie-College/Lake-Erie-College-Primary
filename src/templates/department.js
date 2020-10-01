import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import LeadImage from '../components/lead-image'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'
import SEO from '../components/seo'

class DepartmentTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulDepartment')
        const hasLeadImage = page.leadImage !== null

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} />
                <main>
                    {hasLeadImage && (
                        <LeadImage
                            title={page.leadImage.title}
                            fluid={page.leadImage.fluid}
                            file={page.leadImage.file}
                        />
                    )}
                    <PageHeading
                        primary={page.title}
                        overline={page.category ? page.category.title : null}
                        linkTo={page.category}
                    />
                    {page.lead && <PageLead content={page.lead.lead} />}
                    <PrimaryContent data={page.primaryContent} />
                </main>
            </Layout>
        )
    }
}

export default DepartmentTemplate

export const pageQuery = graphql`
    query DepartmentBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulDepartment(slug: { eq: $slug }) {
            title
            slug
            description {
                description
            }
            category {
                title
                shortTitle
                slug
            }
            lead {
                lead
            }
            leadImage {
                title
                file {
                    url
                    contentType
                }
                fluid(maxWidth: 2160) {
                    ...GatsbyContentfulFluid_withWebp
                }
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
