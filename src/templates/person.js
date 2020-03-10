import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'

class PersonTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulPerson')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')    
    
    const fullName = typeof page.preferredFullName !== 'undefined' && page.preferredFullName !== null ? page.preferredFullName : `${page.firstName} ${page.lastName}`


    return (
      <Layout location={this.props.location} >
        <HelmetProvider>
            <Helmet>
              <title>{`${page.title} | ${siteTitle}`}</title>
            </Helmet>
        </HelmetProvider>
        <main>
          <h1>Person Page</h1>
          <PageHeading primary={fullName} secondary={page.personType} />
          <PrimaryContent data={page.primaryContent} />
        </main>
      </Layout>
    )
  }
}

export default PersonTemplate

export const pageQuery = graphql`
  query PersonBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson(slug: {eq: $slug}) {
      title
      slug
      primaryContent {
        json
      }
      jobTitles {
        jobTitles
      }
      id
      headshot {
        title
        file {
          url
        }
      }
      firstName
      emailAddress
      building {
        title
        slug
        shortTitle
        id
      }
      lastName
      office
      personType
      phoneNumber
      preferredFullName
      shortTitle
      department {
        title
        slug
        shortTitle
      }
    }
  }
`
