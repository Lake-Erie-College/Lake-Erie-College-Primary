import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
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
          <Helmet title={`${page.title} | ${siteTitle}`} />
          <PrimaryContent data={page.primaryContent} />
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
    }
  }
`
