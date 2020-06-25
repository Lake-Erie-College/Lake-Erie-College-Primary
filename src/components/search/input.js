import React, { useState } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import {
    useQueryParam,
    StringParam,
    NumberParam,
    ArrayParam,
    withDefault,
} from 'use-query-params' //https://github.com/pbeshai/use-query-params
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DEBOUNCE_TIME = 400

export default connectSearchBox(({ refine }, ...rest) => {
    const [query, setQuery] = useQueryParam('query', StringParam)
    const [category, setCategory] = useQueryParam('category', StringParam)

    const [debouncedSetQuery, setDebouncedSetQuery] = useState(null)

    const onSearchQueryChange = updatedSearchQuery => {
        clearTimeout(debouncedSetQuery)

        setDebouncedSetQuery(
            setTimeout(() => {
                console.log(updatedSearchQuery)
                setQuery(updatedSearchQuery)
            }, DEBOUNCE_TIME)
        )
    }

    return (
        <form>
            <input
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={e => onSearchQueryChange(e.target.value)}
                {...rest}
            />
            <span onClick={() => refine(query)}>Search Icon</span>
        </form>
    )
})
