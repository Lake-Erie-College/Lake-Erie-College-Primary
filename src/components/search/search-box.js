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
                <SearchInput />
            </InstantSearch>
        </div>
    )
}
