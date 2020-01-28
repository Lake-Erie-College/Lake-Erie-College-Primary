import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class StandardPageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulStandardPage')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
          <Helmet title={`${page.title} | ${siteTitle}`} />
          <h1>Standard Page</h1>
          <PageHeading primary={page.primaryHeading} secondary={page.secondaryHeading} />
          <PrimaryContent data={page.primaryContent} />
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
      primaryHeading
      secondaryHeading
      isNews
      publishDate
      lead {
        lead
      }
      primaryContent {
        json
      }
    }
  }
`
