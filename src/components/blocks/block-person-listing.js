import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import Person from '../person'

import styles from './block-person-listing.module.scss'

const BlockPersonListing = ({
    title,
    primaryHeading,
    people,
    department,
    personType,
}) => {
    const data = useStaticQuery(graphql`
        {
            allContentfulPerson {
                edges {
                    node {
                        ...Person
                    }
                }
            }
        }
    `)

    const edges = get(data, 'allContentfulPerson.edges')

    const allPeople = edges.map(edge => {
        return edge.node
    })

    let filteredPeople = (typeof department !== 'undefined' && department !== null) || (typeof personType !== 'undefined' && personType !== null) ? allPeople : []

    const hasHeading =
        typeof primaryHeading !== 'undefined' && primaryHeading !== null

    const FilterPeopleByDepartment = (person) => {
        if (person.department === null) {
            return false
        } else {
            return person.department.slug === department.slug
        }
    }

    const FilterPeopleByPersonType = (person) => {
        const found = personType.indexOf(person.personType) > -1
        return found
    }

    const SortPeopleByLastName = person => {
        return typeof person.lastName !== 'undefined'
            ? person.lastName
            : 'Z'
    }

    if (typeof department !== 'undefined' && department !== null) {
        filteredPeople = filteredPeople.filter(FilterPeopleByDepartment)
    }

    if (typeof personType !== 'undefined' && personType !== null) {
        filteredPeople = filteredPeople.filter(FilterPeopleByPersonType)
    }
    
    filteredPeople = sortBy(filteredPeople, [
        SortPeopleByLastName,
    ])

    return (
        <section className={styles.blockPersonListing}>
            {hasHeading && <h2 className={styles.heading}>{primaryHeading}</h2>}
            <ul className={styles.listing}>
                {people != null &&
                    people.length > 0 &&
                    people.map((person) => {
                        return (
                            <li
                                key={`${title}-${person.slug}`}
                                className={styles.listingItem}
                            >
                                <Person person={person} />
                            </li>
                        )
                    })}
                {filteredPeople.length > 0 &&
                    filteredPeople.map((person) => {
                        return (
                            <li
                                key={`${title}-${person.slug}`}
                                className={styles.listingItem}
                            >
                                <Person person={person} />
                            </li>
                        )
                    })}
            </ul>
        </section>
    )
}

export default BlockPersonListing
