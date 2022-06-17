import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import BlockMediaWithCaption from '../components/blocks/block-media-with-caption'
import LeadImage from '../components/lead-image'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'
import SEO from '../components/seo'

const linkResolver = require('../utils').linkResolver

class DepartmentTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulDepartment')
        const hasLeadImage = page.leadImage !== null
        const hasCTA = page.leadImage !== null && page.callToAction !== null

        let path = linkResolver.path(page)

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} location={path} />
                <main>
                    {hasLeadImage && !hasCTA && (
                        <LeadImage
                            title={page.leadImage.title}
                            fluid={page.leadImage.fluid}
                            file={page.leadImage.file}
                            description={page.leadImage.description}
                        />
                    )}
                    {hasCTA && (
                        <PageHeading
                            overline={page.category ? page.category.title : null}
                            linkTo={page.category}
                            currentPage={page}
                        />
                    )}
                    {hasLeadImage && hasCTA && (
                        <BlockMediaWithCaption
                            internalMedia={page.leadImage}
                            heading={page.primaryHeading ? page.primaryHeading : page.title}
                            caption={null}
                            internalLink={page.callToAction.internalLink}
                            externalUrl={page.callToAction.externalUrl}
                            callToAction={page.callToAction.displayTitle}
                            isLead={true}
                        />
                    )}
                    {!hasCTA && (
                        <PageHeading
                            primary={page.primaryHeading ? page.primaryHeading : page.title}
                            secondary={page.secondaryHeading ? page.secondaryHeading : null}
                            overline={page.category ? page.category.title : null}
                            linkTo={page.category}
                            currentPage={page}
                        />
                    )}
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
            primaryHeading
            secondaryHeading
            callToAction {
                ...NavigationItem
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
                    ...Asset
                    ...BlockAcademicOfferingListing
                    ...BlockCarousel
                    ...BlockMediaWithCaption
                    ...BlockPersonListing
                    ...BlockQuote
                    ...BlockSpotlightContent
                    ...Location
                    ...Person
                    ...StandardPage
                }
            }
        }
    }
`
