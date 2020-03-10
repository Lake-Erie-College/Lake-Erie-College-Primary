import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
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
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
        <main>
          <PageHeading primary={page.primaryHeading} secondary={page.secondaryHeading} />
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
      pageIcon
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
