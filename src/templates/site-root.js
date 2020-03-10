import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'

class SiteRootTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulHomepage')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
        <main>
          <PrimaryContent data={page.primaryContent} />
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
        json
      }
      heroCarousel {
        callToAction
        externalMediaUrl
        image {
          fluid(maxWidth: 1080) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        mediaHeading
        mediaCaption {
          mediaCaption
        }
        title
        internalLink {
          __typename
          ... on Node {
            ... on ContentfulAcademicOffering {
                id
                slug
                category {
                slug
                }
            }
            ... on ContentfulDepartment {
                id
                slug
                category {
                slug
                }
            }
            ... on ContentfulEvent {
                id
                slug
                category {
                slug
                }
            }
            ... on ContentfulHomepage {
                id
                slug
            }
            ... on ContentfulLocation {
                id
                slug
                category {
                slug
                }
            }
            ... on ContentfulPerson {
                id
                slug
            }
            ... on ContentfulStandardPage {
                id
                slug
                category {
                slug
                }
            }
          }
        }
      }
    }
  }
`
