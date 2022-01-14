import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import Layout from '../components/layout'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'
import ContactPerson from '../components/contact-person'
import SEO from '../components/seo'

class PersonTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulPerson')

        const fullName =
            typeof page.preferredFullName !== 'undefined' &&
            page.preferredFullName !== null
                ? page.preferredFullName
                : `${page.firstName} ${page.lastName}`

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} robots={'noindex'} location={this.props.location}/>
                <main>
                    <PageHeading
                        primary={fullName}
                        secondary={page.personType}
                        currentPage={page}
                    />
                    <ContactPerson person={page} displayName={false} />
                    {page.primaryContent && (
                        <PrimaryContent data={page.primaryContent} />
                    )}
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
        contentfulPerson(slug: { eq: $slug }) {
            title
            slug
            primaryContent {
                raw
            }
            jobTitles {
                jobTitles
            }
            id
            headshot {
                ...Asset
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
