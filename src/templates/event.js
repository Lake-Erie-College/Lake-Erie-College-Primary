import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class EventTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulEvent')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
          <main>
            <h1>Event Page</h1>
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
      slug
      description {
        description
      }
      primaryContent {
        json
      }
    }
  }
`
