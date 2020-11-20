import React, { useState, useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './input.module.scss'

const DEBOUNCE_TIME = 400

export default connectSearchBox(({ searchType, refine, placeholder }) => {
    const [debouncedSetQuery, setDebouncedSetQuery] = useState(null)

    const onSearchQueryChange = updatedSearchQuery => {
        clearTimeout(debouncedSetQuery)

        setDebouncedSetQuery(
            setTimeout(() => {
                refine(updatedSearchQuery)
            }, DEBOUNCE_TIME)
        )
    }

    const targetElement = useRef(null)

    return (
        <form
            className={styles.form}
            role="search"
            aria-label={`All ${searchType}`}
        >
            <label className={styles.label} for={`search-${searchType}`}>
                {placeholder}
            </label>
            <input
                id={`search-${searchType}`}
                className={styles.input}
                type={'search'}
                placeholder={placeholder}
                // onChange={e => onSearchQueryChange(targetElement.current.value)}
                ref={targetElement}
                spellCheck={false}
            />
            <button
                type="submit"
                className={styles.button}
                onClick={event => {
                    event.preventDefault()
                    onSearchQueryChange(targetElement.current.value)
                }}
                aria-label="Search"
            >
                <FontAwesomeIcon
                    className={styles.icon}
                    icon="chevron-right"
                    size="lg"
                />
            </button>
        </form>
    )
})
