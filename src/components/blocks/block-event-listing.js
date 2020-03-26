import React, { useState } from 'react'
import cx from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'
import RelatedEvents from '../related-events'
import moment from 'moment'
import Divider from '../divider'

import styles from "./block-event-listing.module.scss";

const BlockEventListing = ({ category, limit, showViewAll }, ...rest) => {
    return (
        <section>
            <Divider />
            <div className={styles.blockEventListing}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        <span className={styles.overline}>Upcoming</span>
                        {category.shortTitle} Events
                    </h2>
                </header>
                <div className={styles.eventsList}>
                    <RelatedEvents category={category} showViewAll={false} limit={limit} />
                </div>
            </div>
        </section>
    )
}

export default BlockEventListing