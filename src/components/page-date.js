import React from 'react'
import styles from './page-date.module.scss'
import moment from 'moment'

export default ({ startDate, endDate }) => {
    return (
        <p className={styles.pageDate}>
            <span className={styles.content}>
                {startDate && <StartDate date={startDate} />}
                {endDate && <EndDate startDate={startDate} date={endDate} />}
            </span>
        </p>
    )
}

const StartDate = ({ date }) => {
    const momentStartDate = moment(date)

    const dateText = `${momentStartDate.format('MMMM DD, YYYY')}`
    const dateTime = `${momentStartDate.format('YYYY-mm-DD h:mm A')}`

    const time = `${momentStartDate.format('h:mm A')}`
    const isValidTime = time !== '12:00 AM'

    return (
        <time dateTime={dateTime}>
            {dateText}
            {isValidTime && <span> {time} </span>}
        </time>
    )
}

const EndDate = ({ startDate, date }) => {
    const momentEndDate = moment(date)
    const momentStartDate = moment(startDate)

    const dateText = `${momentEndDate.format('MMMM DD, YYYY')}`
    const dateTime = `${momentEndDate.format('YYYY-mm-DD h:mm A')}`

    const isSameDay = momentEndDate.isSame(momentStartDate, 'date')

    const time = `${momentEndDate.format('h:mm A')}`
    const isValidTime = time !== '12:00 AM'

    return (
        <time dateTime={dateTime}>
            - {!isSameDay && <span>{dateText}</span>}
            {isValidTime && <span> {time}</span>}
        </time>
    )
}
