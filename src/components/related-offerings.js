import React from 'react'
import PrimaryContent from '../components/primary-content'
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./related-offerings.module.scss"

const linkResolver = require('../utils').linkResolver

const CourseHeading = ({heading, overline}) => (
    <h2 className={styles.courseHeading}>
        {overline && (
            <span className={styles.overline}>{overline}</span>
        )}
        {heading}
    </h2>
)

const CourseHeadingWithLink = ({heading, overline, to}) => {
    return (
        <h2 className={styles.courseHeading}>
            {overline && (
                <span className={styles.overline}>{overline}</span>
            )}
            <GatsbyLink to={to} className={styles.internal}>
                {heading}<nobr><FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} /></nobr>
            </GatsbyLink>
        </h2>
    )
}

const Offering = ({offering}) => {
    const hasPrimaryContent = typeof offering.primaryContent !== 'undefined' && offering.primaryContent !== null
    const hasDescription = typeof offering.description !== 'undefined' && offering.description !== null && offering.description.description !== null
    const isHidden = typeof offering.hidden !== 'undefined' && offering.hidden === true

    const offeringTo = !isHidden ? linkResolver.path(offering) : null

    return (
        <div className={styles.offering}>
            {isHidden && (
                <CourseHeading heading={offering.shortTitle} overline={offering.offeringType} />
            )}
            {!isHidden && (
                <CourseHeadingWithLink heading={offering.shortTitle} overline={offering.offeringType} to={offeringTo} />
            )}

            {hasPrimaryContent && (
                <PrimaryContent data={offering.primaryContent} isFullWidth={ true } />
            )}

            {!hasPrimaryContent && hasDescription && (
                <p className={styles.courseSummary}>{offering.description.description}</p>
            )}
        </div>
    )
}

export default ({offerings, heading}) => (
    <section className={styles.relatedOfferings}>
        { heading && (
            <h2 className={styles.heading}>{heading}</h2>
        )}
        <div className={styles.offeringsList}>
            { offerings.map(( offering ) => <Offering key={'related-' + offering.id} offering={offering} />) }
        </div>
    </section>
)