import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'

class DepartmentTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulDepartment')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
          <main>
            <h1>Department Page</h1>
            <PrimaryContent data={page.primaryContent} />
          </main>
      </Layout>
    )
  }
}

export default DepartmentTemplate

export const pageQuery = graphql`
  query DepartmentBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulDepartment(slug: { eq: $slug }) {
      title
      primaryContent {
        json
      }
    }
  }
`
