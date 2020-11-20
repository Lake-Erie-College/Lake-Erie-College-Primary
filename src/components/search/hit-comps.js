import React, { Fragment } from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import TextLink from '../text-link'
import get from 'lodash/get'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import OfferingThumb from '../offering'
import PersonThumb from '../person'

import styles from './hit-comp.module.scss'

const hitHandlers = {
    academicOffering: value => <AcademicOffering hit={value} />,
    academicOfferingThumbnail: value => <OfferingThumb offering={value} isThumb={true} />,
    standardPage: value => <StandardPage hit={value} />,
    person: value => <Person hit={value} />,
    personThumbnail: value => <PersonThumb person={value} />,
    location: value => <Location hit={value} />,
    event: value => <Event hit={value} />,
    department: value => <Department hit={value} />,
    default: value => <TestHit hit={value} />,
}

export const PageHit = clickHandler => ({ hit }) => (
    <div>
        <h4 data-object-id={hit.objectID} data-position={hit.__hitIndex}>
            <TextLink node={hit} onClick={clickHandler} className={styles.link}>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </TextLink>
        </h4>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)

export const SearchHit = ({ hit, insights, thumbnail }) => {
    const type = get(hit, 'sys.contentType.sys.contentful_id')
    const useThumbnail = thumbnail || false

    const handler = useThumbnail ? hitHandlers[`${type}Thumbnail`] || hitHandlers.default : hitHandlers[type] || hitHandlers.default

    return (
        <div
            className={styles.hit}
            data-object-id={hit.objectID}
            data-position={hit.__position + 1}
            onClick={() =>
                insights('clickedObjectIDsAfterSearch', {
                  eventName: 'View Page'
                })
              }
        >
            {handler(hit)}
        </div>
    )
}

const AcademicOffering = ({ hit }) => {
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle =
        typeof hit.shortTitle !== 'undefined' && hit.shortTitle !== null
            ? hit.shortTitle
            : hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.offeringType && (
                    <span className={styles.overline}>{hit.offeringType}</span>
                )}
                {hit.category && (
                    <span className={styles.category}>
                        {hit.category.title}
                    </span>
                )}

                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

const StandardPage = ({ hit }) => {
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle = hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.isNews && (
                    <span className={styles.overline}>News</span>
                )}
                {hit.category && (
                    <span className={styles.category}>
                        {hit.category.title}
                    </span>
                )}
                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

const Person = ({ hit }) => {
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle =
        typeof hit.shortTitle !== 'undefined' && hit.shortTitle !== null
            ? hit.shortTitle
            : hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.department && (
                    <span className={styles.category}>
                        {hit.department.title}
                    </span>
                )}
                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

const Location = ({ hit }) => {
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle =
        typeof hit.shortTitle !== 'undefined' && hit.shortTitle !== null
            ? hit.shortTitle
            : hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.offeringType && (
                    <span className={styles.overline}>{hit.offeringType}</span>
                )}
                {hit.category && (
                    <span className={styles.category}>
                        {hit.category.title}
                    </span>
                )}
                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

const Event = ({ hit }) => {
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle =
        typeof hit.shortTitle !== 'undefined' && hit.shortTitle !== null
            ? hit.shortTitle
            : hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                <span className={styles.overline}>Event</span>
                {hit.category && (
                    <span className={styles.category}>
                        {hit.category.title}
                    </span>
                )}
                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

const Department = ({ hit }) => {
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTitle = hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.offeringType && (
                    <span className={styles.overline}>{hit.offeringType}</span>
                )}
                {hit.category && (
                    <span className={styles.category}>
                        {hit.category.title}
                    </span>
                )}
                <TextLink node={hit} className={styles.link}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="link"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </TextLink>
            </h2>

            {hasDescription && (
                <p className={styles.hitSummary}>
                    {hit.description.description}
                </p>
            )}
        </div>
    )
}

export const TestHit = ({ hit }) => {
    return <div>Test Hit</div>
}

export const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={`/blog` + hit.slug} onClick={clickHandler}>
            <h4>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
        </Link>
        <div>
            &nbsp;
            <Highlight attribute="date" hit={hit} tagName="mark" />
            &emsp; &nbsp;
            {hit.tags.map((tag, index) => (
                <Fragment key={tag}>
                    {index > 0 && `, `}
                    {tag}
                </Fragment>
            ))}
        </div>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)
