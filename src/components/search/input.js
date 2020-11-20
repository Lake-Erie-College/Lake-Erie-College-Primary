import React, { useState, useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './input.module.scss'

const DEBOUNCE_TIME = 400

export default connectSearchBox(({ refine, placeholder }) => {
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
        <form className={styles.form}>
            <input
                className={styles.input}
                type={'search'}
                placeholder={placeholder}
                aria-label={'Search'}
                onChange={e => onSearchQueryChange(targetElement.current.value)}
                ref={targetElement}
            />
            <span className={styles.button} onClick={() => onSearchQueryChange(targetElement.current.value)}>
                <FontAwesomeIcon
                    className={styles.icon}
                    icon="chevron-right"
                    size="lg"
                />
            </span>
        </form>
    )
})
