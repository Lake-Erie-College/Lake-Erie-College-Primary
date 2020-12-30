import React from 'react'
import PrimaryContent from '../components/primary-content'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defaultsDeep } from 'lodash'

import styles from './offering.module.scss'

const linkResolver = require('../utils').linkResolver

const CourseHeading = ({ heading, overline, tags }) => {
    return (
        <header className={styles.header}>
            <h3 className={styles.courseHeading}>
                {overline && <span className={styles.overline}>{overline}</span>}
                {tags && (
                    <span className={styles.tags}>
                        {tags && tags.map(tagName => <span>{tagName}</span>)}
                    </span>
                )}
                {heading}
            </h3>
        </header>
    )
}

const CourseHeadingWithLink = ({ heading, overline, to, tags }) => {
    return (
        <header className={styles.header}>
            <h3 className={styles.courseHeading}>
                {overline && <span className={styles.overline}>{overline}</span>}
                {tags && (
                    <span className={styles.tags}>
                        {tags && tags.map(tagName => <span>{tagName}</span>)}
                    </span>
                )}
                <GatsbyLink to={to} className={styles.internal}>
                    {heading}
                    <FontAwesomeIcon
                        icon="link"
                        size="xs"
                        className={styles.icon}
                    />
                </GatsbyLink>
            </h3>
        </header>
    )
}

export default ({ offering, isThumb }) => {
    const hasPrimaryContent =
        typeof offering.primaryContent !== 'undefined' &&
        offering.primaryContent !== null
    const hasDescription =
        typeof offering.description !== 'undefined' &&
        offering.description !== null &&
        offering.description.description !== null
    const isHidden =
        typeof offering.hidden !== 'undefined' && offering.hidden === true

    const offeringTo = !isHidden ? linkResolver.path(offering) : null

    const offeringTitle =
        typeof offering.shortTitle !== 'undefined' &&
        offering.shortTitle !== null
            ? offering.shortTitle
            : offering.title

    const summary =
        typeof offering.summary !== 'undefined' && offering.summary !== null
            ? offering.summary.summary
            : null

    return (
        <div className={styles.offering}>
            {isHidden && (
                <CourseHeading
                    heading={offeringTitle}
                    overline={offering.offeringType}
                    tags={offering.additionalTags}
                />
            )}
            {!isHidden && (
                <CourseHeadingWithLink
                    heading={offeringTitle}
                    overline={offering.offeringType}
                    to={offeringTo}
                    tags={offering.additionalTags}
                />
            )}

            {!summary && !isThumb && hasPrimaryContent && (
                <PrimaryContent
                    data={offering.primaryContent}
                    isFullWidth={true}
                />
            )}

            {!summary && !hasPrimaryContent && hasDescription && (
                <p className={styles.courseSummary}>
                    {offering.description.description}
                </p>
            )}

            {summary && (
                <p className={styles.courseSummary}>
                    {summary}
                </p>
            )}
        </div>
    )
}
