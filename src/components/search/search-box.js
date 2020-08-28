import React, { useState, useEffect, createRef } from 'react'

import {
    InstantSearch,
    connectStateResults,
    Configure
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import SearchInput from './input'
import {
    useQueryParam,
    StringParam,
} from 'use-query-params'



const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

export default function SearchBox({ indices, collapse, hitsAsGrid }) {
    const [query, setQuery] = useQueryParam('query', StringParam)
    
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    
    const indexName = indices[0].name

    return (
        <div>
            <InstantSearch
                searchClient={searchClient}
                indexName={indexName}
                // onSearchStateChange={({ query }) => setQuery(query)}
            >
                <Configure hitsPerPage={10} query={query}/>
                <SearchInput />
                <h2 className={styles.heading}>Your search for <mark className={styles.query}>{query}</mark> returned <Stats />.</h2>
                
                <Results>
                    <Hits className={styles.hits} hitComponent={hitComps[hitComp]} />
                    <Pagination className={styles.pagination} />
                </Results>
            </InstantSearch>
        </div>
    )
}
