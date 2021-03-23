import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import BlockMediaWithCaption from '../components/blocks/block-media-with-caption'
import PageDate from '../components/page-date'
import PageHeading from '../components/page-heading'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import LeadImage from '../components/lead-image'
import SEO from '../components/seo'

class StandardPageTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulStandardPage')
        const hasLeadImage = typeof page.leadImage !== 'undefined' && page.leadImage !== null
        const hasCTA = page.leadImage !== null && page.callToAction !== null

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} />
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
                            heading={page.primaryHeading}
                            caption={null}
                            internalLink={page.callToAction.internalLink}
                            callToAction={page.callToAction.displayTitle}
                            isLead={true}
                        />
                    )}
                    {!hasCTA && (
                        <PageHeading
                            primary={page.primaryHeading}
                            secondary={page.secondaryHeading}
                            overline={page.category ? page.category.title : null}
                            linkTo={page.category}
                            currentPage={page}
                        />
                    )}
                    {(page.lead) && <PageLead content={page.lead.lead} />}
                    {page.publishDate && <PageDate startDate={page.publishDate} />}
                    <PrimaryContent data={page.primaryContent} />
                </main>
            </Layout>
        )
    }
}

export default StandardPageTemplate

export const pageQuery = graphql`
    query StandardPageBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulStandardPage(slug: { eq: $slug }) {
            title
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
            pageIcon
            primaryHeading
            secondaryHeading
            callToAction {
                ...NavigationItem
            }
            isNews
            publishDate
            leadImage {
                title
                fluid(maxWidth: 2160) {
                    ...GatsbyContentfulFluid_withWebp
                }
                file {
                    url
                    contentType
                }
            }
            lead {
                lead
            }
            primaryContent {
              raw
                references {
                    ...AcademicOffering
                    ...Asset
                    ...BlockAcademicOfferingListing
                    ...BlockCarousel
                    ...BlockEventListing
                    ...BlockExternalEmbed
                    ...BlockMediaWithCaption
                    ...BlockPersonListing
                    ...BlockQuote
                    ...BlockSearchResults
                    ...BlockSpotlightContent
                    ...Department
                    ...Location
                    ...NavigationItem
                    ...Person
                    ...StandardPage
                }
            }
        }
    }
`
