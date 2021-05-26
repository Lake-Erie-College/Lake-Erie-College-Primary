import React from 'react'
import PrimaryContent from '../components/primary-content'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Offering from './offering'

import styles from './related-offerings.module.scss'

export default ({ offerings, heading, display }) => {
    const shorten = typeof display !== 'undefined' && display !== null ? display : false
    return (
        <section className={styles.relatedOfferings}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            <div className={styles.offeringsList}>
                {offerings.map((offering) => (
                    <Offering
                        key={'related-' + offering.id}
                        offering={offering}
                        short={shorten}
                    />
                ))}
            </div>
        </section>
    )
}
