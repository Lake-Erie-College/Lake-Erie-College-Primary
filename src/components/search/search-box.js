import React, { useState, useEffect, createRef } from 'react'

import {
    InstantSearch,
    Configure,
    Pagination,
    connectStateResults,
    connectHits,
    connectHitInsights,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import aa from 'search-insights'
import SearchInput from './input'
import * as hitComps from './hit-comps'

import styles from './search-box.module.scss'

const Stats = connectStateResults(
    ({ searchResults: res }) =>
        res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const Results = connectStateResults(
    ({ searchState: searchState, searchResults: res, children }) =>
        searchState && searchState.query ? (
            res && res.nbHits > 0 ? (
                children
            ) : (
                <p className={styles.hits}>
                    Your search did not return any results.
                </p>
            )
        ) : (
            <div></div>
        )
)

export default function SearchBox({
    searchType,
    indices,
    collapse,
    hitsAsGrid,
    heading,
    summary
}) {
    const searchIndices = {
        default: {
            name: `prod_LEC_Pages`,
            title: `Pages`,
            hitComp: `SearchHit`,
            helpText: 'Search',
        },
        Pages: {
            name: `prod_LEC_Pages`,
            title: `Pages`,
            hitComp: `SearchHit`,
            helpText: 'Search',
        },
        People: {
            name: `prod_LEC_People`,
            title: `People`,
            hitComp: `SearchHit`,
            helpText: 'Search People',
        },
        Offerings: {
            name: `prod_LEC_Offerings`,
            title: `Offerings`,
            hitComp: `SearchHit`,
            helpText: 'Search Offerings',
        },
    }

    const selectedIndex = searchIndices[searchType] || searchIndices.default

    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    aa('init', {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
    })

    const [focus, setFocus] = useState(false)
    const [hold, setHold] = useState(false)

    const hasContent = heading || summary
    const hasSummary = typeof summary !== 'undefined' && summary !== null

    const indexName = selectedIndex.name
    const hitComp = selectedIndex.hitComp

    return (
        <div className={styles.searchBox}>
            <InstantSearch
                searchClient={searchClient}
                indexName={indexName}
            >
                <Configure hitsPerPage={10} clickAnalytics />
                <div className={styles.search}>
                    {hasContent && (
                        <div className={styles.introduction}>
                            {heading && <h2 className={styles.heading}>{heading}</h2>}
                            <SearchInput
                                setFocus={setFocus}
                                hold={hold}
                                placeholder={selectedIndex.helpText}
                            />
                            {hasSummary && <p className={styles.summary}>{summary.summary}</p>}
                        </div>
                    )}
                    {!hasContent && (
                        <SearchInput
                            setFocus={setFocus}
                            hold={hold}
                            placeholder={selectedIndex.helpText}
                        />
                    )}
                    <Results>
                        {focus && !hitsAsGrid && (
                            <div
                                className={styles.results}
                                onMouseEnter={() => setHold(true)}
                                onMouseLeave={() => setHold(false)}
                                onClick={() => setHold(true)}
                            >
                                <CustomHits hitComp={hitComp} />
                            </div>
                        )}
                        {hitsAsGrid && (
                            <div className={styles.gridResults}>
                                <CustomHits
                                    hitComp={hitComp}
                                    hitsAsGrid={true}
                                />
                                <Pagination className={styles.pagination} />
                            </div>
                        )}
                    </Results>
                </div>
            </InstantSearch>
        </div>
    )
}

const HitWithInsights =
    typeof window !== 'undefined'
        ? connectHitInsights(aa)(hitComps['SearchHit'])
        : hitComps['SearchHit']

const SearchHits = ({ hits, hitsAsGrid }) => {

    return (
        <>
            {hitsAsGrid && (
                <ol className={styles.gridResults}>
                    {hits.map(hit => (
                        <li
                            key={`search-hit-${hit.objectID}`}
                            className={styles.hit}
                        >
                            <HitWithInsights key={hit.objectID} hit={hit} thumbnail={true} />
                        </li>
                    ))}
                </ol>
            )}
            {!hitsAsGrid && (
                <ol className={styles.hits}>
                    {hits.map(hit => (
                        <li
                            key={`search-hit-${hit.objectID}`}
                            className={styles.hit}
                        >
                            <HitWithInsights key={hit.objectID} hit={hit} />
                        </li>
                    ))}
                </ol>
            )}
        </>
    )
}

const CustomHits = connectHits(SearchHits)