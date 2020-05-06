import React, { useState, useEffect, createRef } from 'react'

import {
    InstantSearch,
    Index,
    Hits,
    connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import SearchInput from './input'

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) =>
        res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
    if (!events) events = [`mousedown`, `touchstart`]
    const detectClickOutside = event =>
        !ref.current.contains(event.target) && handler()
    useEffect(() => {
        for (const event of events)
            document.addEventListener(event, detectClickOutside)
        return () => {
            for (const event of events)
                document.removeEventListener(event, detectClickOutside)
        }
    })
}

export default function SearchBox({ indices, collapse, hitsAsGrid }) {
    const [query, setQuery] = useState(``)
    const [focus, setFocus] = useState(false)
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
                <p>Instant Search - {query}</p>
                <SearchInput
                    onFocus={() => setFocus(true)}
                    {...{ collapse, focus }}
                />
            </InstantSearch>
        </div>
    )
}
