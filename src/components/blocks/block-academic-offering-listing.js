import React, { useState } from 'react'
import cx from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'
import RelatedOfferings from '../related-offerings'

import styles from "./block-academic-offering-listing.module.scss";

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

    const hasHeading = typeof primaryHeading !== 'undefined' && primaryHeading !== null
    
    const filteredOfferings = offerings.filter(FilterOfferings)

    return (
        <section className={styles.blockAcademicOfferingListing}>
            { hasHeading && (
                <h2 className={styles.heading}>{primaryHeading}</h2>
            )}
            { filteredOfferings != null && filteredOfferings.length > 0 && (
                <RelatedOfferings offerings={filteredOfferings} />
            )}
        </section>
    )
}

export default BlockAcademicOfferingListing