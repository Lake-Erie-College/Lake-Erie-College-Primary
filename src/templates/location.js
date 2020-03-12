import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class LocationTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulLocation')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
        <main><h1>Location Page</h1></main>
      </Layout>
    )
  }
}

export default LocationTemplate

export const pageQuery = graphql`
  query LocationBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulLocation(slug: { eq: $slug }) {
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
