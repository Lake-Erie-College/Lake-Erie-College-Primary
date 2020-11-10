import React from 'react'
import Person from '../person'

import styles from "./block-person-listing.module.scss";

const BlockPersonListing = ({ title, primaryHeading, people }) => {
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

export default BlockPersonListing