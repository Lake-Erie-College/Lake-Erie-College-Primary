import React from 'react'
import SearchBox from '../search/search-box'

import styles from './block-search-results.module.scss'

const BlockSearchResults = ({ searchType, primaryHeading, summary }) => {
    const hasContent = primaryHeading || summary
    const hasSummary = typeof summary !== 'undefined' && typeof summary.summary !== 'undefined'

    return (
        <section className={styles.blockSearchResults}>
            {hasContent && (
                <div>
                    {primaryHeading && <h2 className={styles.heading}>{primaryHeading}</h2>}
                    {hasSummary && <p className={styles.summary}>{summary.summary}</p>}
                </div>
            )}
            <div className={styles.search}>
                <SearchBox searchType={searchType} hitsAsGrid={true} />
            </div>
        </section>
    )
}

export default BlockSearchResults
