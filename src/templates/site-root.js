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
import SEO from '../components/seo'

class SiteRootTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulHomepage')
        const siteSettings = get(this.props, 'data.contentfulSiteSettings')

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} location={this.props.location} />
                <main>
                    {page.primaryHeading && <h1 className={'visually-hidden'}>{page.primaryHeading}</h1>}
                    {page.secondaryHeading && <h2 className={'visually-hidden'}>{page.secondaryHeading}</h2>}
                    <Carousel content={page.heroCarousel} displayDots={true} />
                    <PrimaryContent data={page.primaryContent} />
                    <RelatedContent>
                        <RelatedNews heading={`News & Announcements`} showViewAll={siteSettings.showViewAllNews} viewAllPage={siteSettings.newsPage} />
                        <RelatedEvents heading={`Upcoming Events`} showViewAll={siteSettings.showViewAllEvents} viewAllPage={siteSettings.eventsPage} />
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
            description {
                description
            }
            primaryHeading
            secondaryHeading
            primaryContent {
                raw
                references {
                    ...BlockCarousel
                    ...BlockMediaWithCaption
                    ...BlockSpotlightContent
                }
            }
            heroCarousel {
                ...BlockMediaWithCaption
            }
        }
        contentfulSiteSettings(slug: { eq: "global-site-settings" }) {
            id
            newsPage {
                ...StandardPage
            }
            showViewAllNews
            eventsPage {
                ...StandardPage
            }
            showViewAllEvents
        }
    }
`
