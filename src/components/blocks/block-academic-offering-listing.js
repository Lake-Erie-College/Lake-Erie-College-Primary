import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import RelatedOfferings from '../related-offerings'

const BlockAcademicOfferingListing = ({ category, offeringType }, ...rest) => {
    const data = useStaticQuery(graphql`
        {
            allContentfulAcademicOffering(
                filter: {
                    offeringType: { ne: null }
                    category: { title: { ne: null } }
                }
            ) {
                edges {
                    node {
                        id
                        title
                        slug
                        shortTitle
                        offeringType
                        additionalTags
                        description {
                            description
                        }
                        category {
                            id
                            slug
                        }
                        summary {
                            summary
                        }
                    }
                }
            }
        }
    `)

    const edges = get(data, 'allContentfulAcademicOffering.edges')

    const offerings = edges.map(edge => {
        return edge.node
    })

    const FilterOfferings = offering => {
        return (
            offering.category.slug === category.slug &&
            offering.offeringType === offeringType
        )
    }

    const SortByTitle = offering => {
        return typeof offering.shortTitle !== 'undefined' &&
            offering.shortTitle !== null
            ? offering.shortTitle
            : offering.title
    }

    const filteredOfferings = sortBy(offerings.filter(FilterOfferings), SortByTitle)

    if (filteredOfferings != null && filteredOfferings.length > 0) {
        return <RelatedOfferings offerings={filteredOfferings} />
    } else {
        return null
    }
}

export default BlockAcademicOfferingListing
