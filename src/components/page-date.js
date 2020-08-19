import React from 'react'
import styles from './page-date.module.scss'
import moment from 'moment'

export default ({ startDate, endDate }) => {
    return (
        <p className={styles.pageDate}>
            <span className={styles.content}>
                {startDate && <StartDate date={startDate} />}
                {endDate && <EndDate date={endDate} />}
            </span>
        </p>
    )
}

const StartDate = ({ date }) => {
    const momentStartDate = moment(date)

    const dateText = `${momentStartDate.format('MMMM DD, YYYY')}`
    const dateTime = `${momentStartDate.format('YYYY-mm-DD')}`

    return <time datetime={dateTime}>{dateText}</time>
}

const EndDate = ({ date }) => {
    const momentStartDate = moment(date)

    const dateText = `${momentStartDate.format('MMMM DD, YYYY')}`
    const dateTime = `${momentStartDate.format('YYYY-mm-DD')}`

    return <time datetime={dateTime}> - {dateText}</time>
}
