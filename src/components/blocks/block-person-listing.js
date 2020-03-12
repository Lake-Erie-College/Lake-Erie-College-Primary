import React, { useState } from 'react'
import cx from "classnames"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GatsbyImage from "gatsby-image"

const linkResolver = require('../../utils').linkResolver

import styles from "./block-person-listing.module.scss";

const BlockPersonListing = ({ title, primaryHeading, people }, ...rest) => {
    const hasHeading = typeof primaryHeading !== 'undefined' && primaryHeading !== null
    return (
        <section className={styles.blockPersonListing}>
            { hasHeading && (
                <h2 className={styles.heading}>{primaryHeading}</h2>
            )}
            <ul className={styles.listing}>
                { people != null && people.length > 0 && (
                    people.map(person => {
                        return (
                            <li key={`${title}-${person.slug}`} className={styles.listingItem}>
                                <Person person={person} />
                            </li>
                        )
                    })
                )}
            </ul>
        </section>
    )
}

const Person = ({person}) => {
    return (
        <p>{person.firstName}</p>
    )
}

const Link = ({ node, cta }) => {
    const to = linkResolver.path(node)

    return (
        <p className={cx(styles.info, styles.building)}>
            <GatsbyLink to={to} className={styles.internal}>
                <FontAwesomeIcon icon='arrow-circle-right' size='sm' className={styles.icon} />
                <span>
                    {cta}
                </span>
            </GatsbyLink>
        </p>
    )
}

export default BlockPersonListing