import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class AcademicOfferingTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulAcademicOffering')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
          <Helmet title={`${page.title} | ${siteTitle}`} />
          <main>
            <h1>Academic Offering Page</h1>
          </main>
      </Layout>
    )
  }
}

export default AcademicOfferingTemplate

export const pageQuery = graphql`
  query AcademicOfferingBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulAcademicOffering(slug: { eq: $slug }) {
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
