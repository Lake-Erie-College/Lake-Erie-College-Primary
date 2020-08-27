import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PageDate from '../components/page-date'
import PageHeading from '../components/page-heading'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import LeadImage from '../components/lead-image'

class StandardPageTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulStandardPage')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')
        const hasLeadImage = page.leadImage !== null

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
                        primary={page.primaryHeading}
                        secondary={page.secondaryHeading}
                        overline={page.category ? page.category.title : null}
                        linkTo={page.category}
                    />
                    {page.lead && <PageLead content={page.lead.lead} />}
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
                json
            }
        }
    }
`
