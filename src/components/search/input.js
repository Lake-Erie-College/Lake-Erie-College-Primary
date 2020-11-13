import React, { useState, useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

import styles from './input.module.scss'

const DEBOUNCE_TIME = 400

export default connectSearchBox(({ refine, setFocus, hold, placeholder }) => {
    const [query, setQuery] = useState(null)
    const [category, setCategory] = useState(null)

    const keepFocus = typeof hold !== 'undefined' ? hold : false

    const [debouncedSetQuery, setDebouncedSetQuery] = useState(null)

    const onSearchQueryChange = updatedSearchQuery => {
        clearTimeout(debouncedSetQuery)

        setDebouncedSetQuery(
            setTimeout(() => {
                refine(updatedSearchQuery)
                if (updatedSearchQuery !== null && updatedSearchQuery !== '') {
                    setFocus(true)
                } else {
                    setFocus(false)
                }
            }, DEBOUNCE_TIME)
        )
    }

    const onInputFocus = value => {
        if (value !== null && value !== '') {
            setFocus(true)
        } else {
            setFocus(false)
        }
    }

    const onInputBlur = value => {
        if (!keepFocus) {
            setFocus(false)
        }
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
                onFocus={e => onInputFocus(targetElement.current.value)}
                onBlur={e => onInputBlur(targetElement.current.value)}
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
