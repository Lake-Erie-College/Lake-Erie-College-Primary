import React from 'react'
import SearchBox from '../search/search-box'

import styles from './block-search-results.module.scss'

const BlockSearchResults = ({ searchType, primaryHeading, summary }) => {
    return (
        <section className={styles.blockSearchResults}>
            <div className={styles.search}>
                <SearchBox searchType={searchType} hitsAsGrid={true} heading={primaryHeading} summary={summary} />
            </div>
        </section>
    )
}

export default BlockSearchResults
