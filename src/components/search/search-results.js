import React, { useState, useEffect, createRef } from 'react'
import {
    InstantSearch,
    Index,
    Configure,
    SearchBox,
    Hits,
    Highlight,
    Pagination,
    connectStateResults,
} from 'react-instantsearch-dom'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import {
    useQueryParam,
    StringParam,
    NumberParam,
    ArrayParam,
    withDefault,
} from 'use-query-params'
import * as hitComps from './hit-comps'
import styles from './search-results.module.scss'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) =>
        res && res.nbHits > 0 ? children : `Your search did not return any results.`
)

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

export default function SearchResults({ index, hitComp, collapse, hitsAsGrid }) {
    const [query, setQuery] = useQueryParam('query', StringParam)
    const [focus, setFocus] = useState(false)

    const indexName = index

    return (
        <div className={styles.searchResults}>
            <InstantSearch
                searchClient={searchClient}
                indexName={indexName}
                // onSearchStateChange={({ query }) => setQuery(query)}
            >
                <Configure hitsPerPage={10} query={query}/>
                <h2 className={styles.heading}>Your search for <mark className={styles.query}>{query}</mark> returned <Stats />.</h2>
                
                <Results>
                    <Hits className={styles.hits} hitComponent={hitComps[hitComp]} />
                    <Pagination className={styles.pagination} />
                </Results>
            </InstantSearch>
        </div>
    )
}