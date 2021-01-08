import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import take from 'lodash/take'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './related-events.module.scss'

const linkResolver = require('../utils').linkResolver

const EventHeadingWithLink = ({ heading, overline, month, date, to }) => {
    return (
        <GatsbyLink to={to} className={cx(styles.internal, styles.event)}>
            <header className={styles.header}>
                <h3 className={styles.eventHeading}>
                    {heading}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </h3>
                {overline && <p className={styles.overline}>{overline}</p>}
            </header>
            <p className={styles.eventDate}>
                <span className={styles.month}>{month}</span>
                <span className={styles.date}>{date}</span>
            </p>
        </GatsbyLink>
    )
}

const Event = ({ event }) => {
    const isHidden =
        typeof event.hidden !== 'undefined' && event.hidden === true

    const eventTo = !isHidden ? linkResolver.path(event) : null
    const eventTitle =
        typeof event.shortTitle !== 'undefined' ? event.title : event.title
    const momentStartDate = moment(event.startDateAndTime)
    const momentEndDate =
        typeof event.endDateAndTime !== 'undefined' &&
        event.endDateAndTime !== null
            ? moment(event.endDateAndTime)
            : null

    const eventMonth = momentStartDate.format('MMM')
    const eventDate = momentStartDate.format('DD')

    const eventOverline = momentEndDate
        ? `${momentStartDate.format('h:mm a')} - 
        ${
            momentEndDate.diff(momentStartDate, 'days') > 0
                ? momentEndDate.format('MMM DD h:mm a')
                : momentEndDate.format('h:mm a')
        }`
        : `${momentStartDate.format('h:mm a')}`

    return (
        <li className={styles.listItem}>
            <EventHeadingWithLink
                heading={eventTitle}
                overline={eventOverline}
                month={eventMonth}
                date={eventDate}
                to={eventTo}
            />
        </li>
    )
}

const SortEventsByDate = event => {
    return event.startDateAndTime
}

const SortEventsByTitle = event => {
    return typeof event.shortTitle !== 'undefined'
        ? event.shortTitle
        : event.title
}

export default ({ category, heading, limit, showViewAll }) => {
    const data = useStaticQuery(graphql`
        {
            allContentfulEvent(filter: { startDateAndTime: { ne: "" } }) {
                edges {
                    node {
                        id
                        title
                        slug
                        shortTitle
                        description {
                            description
                        }
                        category {
                            id
                            slug
                            title
                            shortTitle
                        }
                        startDateAndTime
                        endDateAndTime
                    }
                }
            }
        }
    `)

    const edges = get(data, 'allContentfulEvent.edges')

    const events = edges.map(edge => {
        return edge.node
    })

    const FilterEvents = event => {
        let isValidDate = moment().isSameOrBefore(event.startDateAndTime)

        if (!isValidDate && typeof event.endDateAndTime !== 'undefined') {
            isValidDate = moment().isSameOrBefore(event.endDateAndTime)
        }

        if (typeof category !== 'undefined' && category !== null) {
            return event.category.slug === category.slug && isValidDate
        } else {
            return isValidDate
        }
    }

    const filteredEvents = events.filter(FilterEvents)

    const viewAll =
        typeof showViewAll !== 'undefined' && showViewAll === true
            ? true
            : false
    const limitEvents = typeof limit !== 'undefined' ? limit : 5

    const sortedEvents = sortBy(filteredEvents, [
        SortEventsByDate,
        SortEventsByTitle,
    ])
    const limitedEvents = take(sortedEvents, limitEvents)

    const categoryLabel =
        typeof category !== 'undefined' && category !== null
            ? category.shortTitle
            : null

    return (
        <div className={styles.relatedEvents}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            {limitedEvents.length > 0 && (
                <ul className={styles.eventsList}>
                    {limitedEvents.map(event => (
                        <Event
                            key={'related-events-' + event.id}
                            event={event}
                        />
                    ))}
                </ul>
            )}
            {limitedEvents.length === 0 && (
                <p className={styles.empty}>
                    There are no upcoming {categoryLabel} events.
                </p>
            )}
        </div>
    )
}
