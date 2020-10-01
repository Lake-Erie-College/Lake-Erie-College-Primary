import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import RelatedEvents from '../components/related-events'
import RelatedNews from '../components/related-news'
import RelatedContent from '../components/related-content'
import Carousel from '../components/carousel'

class SiteRootTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulHomepage')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <Layout location={this.props.location}>
                <Helmet>
                    <title>{`${page.title} | ${siteTitle}`}</title>
                </Helmet>
                <main>
                    <Carousel content={page.heroCarousel} displayDots={true} />
                    <PrimaryContent data={page.primaryContent} />
                    <RelatedContent>
                        <RelatedNews heading={`News & Announcements`} />
                        <RelatedEvents heading={`Upcoming Events`} />
                    </RelatedContent>
                </main>
            </Layout>
        )
    }
}

export default SiteRootTemplate

export const pageQuery = graphql`
    query SiteRootBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulHomepage(slug: { eq: $slug }) {
            title
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
            heroCarousel {
                ...BlockMediaWithCaption
            }
        }
    }
`
