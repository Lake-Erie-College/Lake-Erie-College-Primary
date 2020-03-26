import React, { useState } from 'react'
import cx from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'
import RelatedOfferings from '../related-offerings'

const BlockAcademicOfferingListing = ({ category, offeringType }, ...rest) => {
    const data = useStaticQuery(graphql`
        {
            allContentfulAcademicOffering(filter: {offeringType: {ne: null}, category: {title: {ne: null}}}) {
                edges {
                    node {
                        id
                        title
                        slug
                        shortTitle
                        offeringType
                        description {
                            description
                        }
                        category {
                            id
                            slug
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

    const FilterOfferings = (offering) => {
        return (offering.category.slug === category.slug && offering.offeringType === offeringType);
    }
    
    const filteredOfferings = offerings.filter(FilterOfferings)

    if (filteredOfferings != null && filteredOfferings.length > 0) {
        return <RelatedOfferings offerings={filteredOfferings} />
    } else {
        return
    }
}

export default BlockAcademicOfferingListing