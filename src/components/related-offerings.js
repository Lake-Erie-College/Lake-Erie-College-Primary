import React from 'react'
import PrimaryContent from '../components/primary-content'

import styles from "./related-offerings.module.scss";

const CourseHeading = ({heading, overline}) => (
    <h2 className={styles.courseHeading}>
        {overline && (
            <span className={styles.overline}>{overline}</span>
        )}
        {heading}
    </h2>
)

const Offering = ({offering}) => (
    <div className={styles.offering}>
        <CourseHeading heading={offering.shortTitle} overline={offering.offeringType} />
        {offering.primaryContent && (
            <PrimaryContent data={offering.primaryContent} isFullWidth={ true } />
        )}
    </div>
)

export default ({offerings, heading}) => (
    <section className={styles.relatedOfferings}>
        { heading && (
            <h2 className={styles.heading}>{heading}</h2>
        )}
        <div className={styles.offeringsList}>
            { offerings.map(( offering ) => <Offering key={'related' + offering.id} offering={offering} />) }
        </div>
    </section>
)