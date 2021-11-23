import React, { useState } from 'react'
import cx from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'
import RelatedNews from '../related-news'
import moment from 'moment'
import Divider from '../divider'

import styles from './block-news-listing.module.scss'

const BlockNewsListing = ({ category, limit, showViewAll }, ...rest) => {
    return (
        <section>
            <Divider />
            <div className={styles.blockNewsListing}>
                <div className={styles.newsList}>
                    <RelatedNews category={category} showViewAll={showViewAll} limit={limit} />
                </div>
            </div>
        </section>
    )
}

export default BlockNewsListing