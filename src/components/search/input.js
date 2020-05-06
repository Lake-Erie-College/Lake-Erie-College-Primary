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

export default connectSearchBox(({ refine }, ...rest) => {
    const [query, setQuery] = useQueryParam('query', StringParam)
    const [category, setCategory] = useQueryParam('category', StringParam)

    return (
        <form>
            <p>{query}</p>
            <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={e => setQuery(e.target.value)}
                {...rest}
            />
            <span onClick={() => refine(query)}>Search Icon?</span>
        </form>
    )
})
