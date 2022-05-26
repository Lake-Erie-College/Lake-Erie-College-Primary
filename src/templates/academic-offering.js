import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Layout from '../components/layout'
import BlockMediaWithCaption from '../components/blocks/block-media-with-caption'
import LeadImage from '../components/lead-image'
import PageLead from '../components/page-lead'
import PrimaryContent from '../components/primary-content'
import PageHeading from '../components/page-heading'
import Divider from '../components/divider'
import ContactPerson from '../components/contact-person'
import RelatedOfferings from '../components/related-offerings'
import BlockPersonListing from '../components/blocks/block-person-listing'
import SEO from '../components/seo'

class AcademicOfferingTemplate extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulAcademicOffering')
        const hasLeadImage = page.leadImage !== null
        const hasCTA = page.leadImage !== null && page.callToAction !== null
        const relatedOfferings = page.relatedOfferings
        const primaryContact = page.primaryContact

        const facultyType = 'Faculty'

        const FilterPeople = person => {
            return person.personType == facultyType
        }

        const SortByLastName = person => {
            return person.lastName
        }

        const relatedPeople =
            typeof page.showAllDepartmentFaculty !== 'undefined' &&
            page.showAllDepartmentFaculty &&
            page.category.person
                ? sortBy(
                      page.category.person.filter(FilterPeople),
                      SortByLastName
                  )
                : page.relatedFaculty

        const relatedPeopleHeading =
            typeof page.showAllDepartmentFaculty !== 'undefined' &&
            page.showAllDepartmentFaculty
                ? `${page.category.title} ${facultyType}`
                : `${page.title} ${facultyType}`

        return (
            <Layout location={this.props.location}>
                <SEO title={page.title} description={page.description} location={this.props.location} />
                <main>
                    {hasLeadImage && !hasCTA && (
                        <LeadImage
                            title={page.leadImage.title}
                            fluid={page.leadImage.fluid}
                            file={page.leadImage.file}
                            description={page.leadImage.description}
                        />
                    )}
                    {hasCTA && (
                        <PageHeading
                            overline={page.category ? page.category.title : null}
                            linkTo={page.category}
                            currentPage={page}
                        />
                    )}
                    {hasLeadImage && hasCTA && (
                        <BlockMediaWithCaption
                            internalMedia={page.leadImage}
                            heading={page.primaryHeading ? page.primaryHeading : page.title}
                            caption={page.offeringType}
                            internalLink={page.callToAction.internalLink}
                            externalUrl={page.callToAction.externalUrl}
                            callToAction={page.callToAction.displayTitle}
                            isLead={true}
                        />
                    )}
                    {!hasCTA && (
                        <PageHeading
                            primary={page.primaryHeading ? page.primaryHeading : page.title}
                            secondary={page.offeringType}
                            overline={page.category ? page.category.title : null}
                            linkTo={page.category}
                            currentPage={page}
                        />
                    )}
                    {page.lead && <PageLead content={page.lead.lead} />}
                    <PrimaryContent data={page.primaryContent} />
                    {primaryContact && (
                        <ContactPerson
                            person={primaryContact}
                            heading={`For more information about ${page.title}…`}
                        />
                    )}
                    {relatedOfferings && (
                        <div>
                            <Divider />
                            <RelatedOfferings
                                offerings={relatedOfferings}
                                heading={page.relatedOfferingsHeading}
                            />
                        </div>
                    )}
                    {relatedPeople && (
                        <div>
                            <Divider />
                            <BlockPersonListing
                                title={page.title}
                                primaryHeading={relatedPeopleHeading}
                                people={relatedPeople}
                            />
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
            description {
                description
            }
            offeringType
            category {
                title
                category {
                    slug
                }
                shortTitle
                slug
                person {
                    ...Person
                }
            }
            callToAction {
                ...NavigationItem
            }
            lead {
                lead
            }
            leadImage {
                title
                file {
                    url
                    contentType
                }
                fluid(maxWidth: 2160) {
                    ...GatsbyContentfulFluid_withWebp
                }
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
                category {
                    title
                    shortTitle
                    slug
                }
                summary {
                    summary
                }
                primaryContent {
                    raw
                    references {
                        ...Asset
                        ...BlockMediaWithCaption
                        ...BlockPersonListing
                        ...BlockSpotlightContent
                        ...Person
                        ...StandardPage
                    }
                }
                lead {
                    lead
                }
                offeringType
                additionalTags
                hidden
            }
            primaryContent {
                raw
                references {
                    ...Asset
                    ...BlockCarousel
                    ...BlockMediaWithCaption
                    ...BlockPersonListing
                    ...BlockQuote
                    ...BlockSpotlightContent
                    ...Person
                    ...StandardPage
                }
            }
            showAllDepartmentFaculty
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
