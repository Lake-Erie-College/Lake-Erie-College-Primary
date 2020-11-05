import React, { useState, useEffect, createRef } from 'react'

import {
    InstantSearch,
    Index,
    Configure,
    Hits,
    Highlight,
    Pagination,
    connectStateResults,
    connectHitInsights,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import aa from 'search-insights'
import * as hitComps from './hit-comps'
import SearchInput from './input'

import styles from './search-box.module.scss'

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) =>
        res && res.nbHits > 0 ? (
            children
        ) : (
            <p className={styles.hits}>
                Your search did not return any results.
            </p>
        )
)

export default function SearchBox({ indices, collapse, hitsAsGrid }) {
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    aa('init', {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY
    })

    const [focus, setFocus] = useState(false)
    const [hold, setHold] = useState(false)

    const indexName = indices[0].name
    const hitComp = indices[0].hitComp

    const hitWithInsights = typeof window !== 'undefined' ? connectHitInsights(aa)(hitComps[hitComp]) : hitComps[hitComp]

    const query = 'No More...'

    return (
        <div className={styles.searchBox}>
            <InstantSearch
                searchClient={searchClient}
                indexName={indexName}
                // onSearchStateChange={({ query }) => setQuery(query)}
            >
                <Configure hitsPerPage={15} clickAnalytics />
                <div className={styles.search}>
                    <SearchInput setFocus={setFocus} hold={hold} />
                    <h2 className={styles.heading}>
                        Your search for{' '}
                        <mark className={styles.query}>{query}</mark> returned{' '}
                        <Stats />.
                    </h2>

                    {focus && (
                        <div
                            className={styles.results}
                            onMouseEnter={() => setHold(true)}
                            onMouseLeave={() => setHold(false)}
                            onClick={() => setHold(true)}
                        >
                            <Results>
                                <Hits
                                    className={styles.hits}
                                    hitComponent={hitWithInsights}
                                />
                                <Pagination className={styles.pagination} />
                            </Results>
                        </div>
                    )}
                </div>
            </InstantSearch>
        </div>
    )
}
