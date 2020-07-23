import React from 'react'
import { graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'
import Divider from '../components/divider'
import ContactPerson from '../components/contact-person'
import RelatedOfferings from '../components/related-offerings'
import BlockPersonListing from '../components/blocks/block-person-listing'

class AcademicOfferingTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulAcademicOffering')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const relatedOfferings = page.relatedOfferings
    const primaryContact = page.primaryContact
    const relatedPeople = page.relatedFaculty

    return (
      <Layout location={this.props.location} >
          <HelmetProvider>
              <Helmet>
                <title>{`${page.title} | ${siteTitle}`}</title>
              </Helmet>
          </HelmetProvider>
          <main>
            <PageHeading primary={page.title} secondary={page.offeringType} overline={page.category ? page.category.title : null} linkTo={page.category} />
            {page.lead && (
              <PageLead content={page.lead.lead} />
            )}
            <PrimaryContent data={page.primaryContent} />
            { primaryContact && (
              <ContactPerson person={primaryContact} heading={`For more information about ${page.title}…`}/>
            )}
            { relatedOfferings && (
              <div>
                  <Divider />
                  <RelatedOfferings offerings={relatedOfferings} heading={page.relatedOfferingsHeading} />
              </div>
            )}
            { relatedPeople && (
              <div>
                <Divider />
                <BlockPersonListing title={page.title} primaryHeading={`${page.title} Faculty`} people={relatedPeople} />
              </div>
            )}
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
      offeringType
      category {
        title
        shortTitle
        slug
      }
      lead {
        lead
      }
      pageIcon
      primaryContact {
        jobTitles {
          jobTitles
        }
        firstName
        headshot {
          title
          fluid(maxWidth: 1080) {
              ...GatsbyContentfulFluid_withWebp
          }
          file {
            url
            contentType
          }
        }
        emailAddress
        department {
          slug
          title
          category {
            slug
          }
        }
        building {
          slug
          title
          category {
            slug
          }
        }
        lastName
        phoneNumber
        preferredFullName
        slug
      }
      relatedOfferingsHeading
      relatedOfferings {
        id
        slug
        title
        shortTitle
        primaryContent {
          json
        }
        lead {
          lead
        }
        offeringType
        additionalTags
        hidden
      }
      primaryContent {
        json
      }
      relatedFaculty {
        firstName
        lastName
        jobTitles {
          jobTitles
        }
        headshot {
          title
          fluid(maxWidth: 1080) {
              ...GatsbyContentfulFluid_withWebp
          }
          file {
            url
            contentType
          }
        }
        phoneNumber
        emailAddress
        slug
        preferredFullName
        department {
          slug
          title
          category {
            slug
          }
        }
        building {
          slug
          title
          category {
            slug
          }
        }
      }
    }
  }
`
