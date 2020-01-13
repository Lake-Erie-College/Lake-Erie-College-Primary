import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

class DepartmentTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulDepartment')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} >
          <Helmet title={`${page.title} | ${siteTitle}`} />
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
    }
  }
`
