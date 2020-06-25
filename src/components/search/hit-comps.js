import React, { Fragment } from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby'
import get from 'lodash/get'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './hit-comp.module.scss'

const linkResolver = require('../../utils').linkResolver

const hitHandlers = {
    academicOffering: value => <AcademicOffering hit={value} />,
    standardPage: value => <StandardPage hit={value} />,
    person: value => <Person hit={value} />,
    location: value => <Location hit={value} />,
    event: value => <Event hit={value} />,
    department: value => <Department hit={value} />,
    default: value => <TestHit hit={value} />,
}

export const PageHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={hit.slug} onClick={clickHandler}>
            <h4>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
        </Link>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)

export const SearchHit = ({ hit }) => {
    const type = get(hit, 'sys.contentType.sys.contentful_id')
    const handler = hitHandlers[type] || hitHandlers.default

    return <div className={styles.hit}>{handler(hit)}</div>
}

const AcademicOffering = ({ hit }) => {
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTo = linkResolver.path(hit)

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
                    <span className={styles.category}>{hit.category.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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
    
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTo = linkResolver.path(hit)

    const hitTitle = hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.shortTitle && (
                    <span className={styles.overline}>{hit.shortTitle}</span>
                )}
                {hit.category && (
                    <span className={styles.category}>{hit.category.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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
    
    const hasPrimaryContent =
        typeof hit.primaryContent !== 'undefined' && hit.primaryContent !== null
    const hasDescription =
        typeof hit.description !== 'undefined' &&
        hit.description !== null &&
        hit.description.description !== null

    const hitTo = linkResolver.path(hit)

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
                {hit.department && (
                    <span className={styles.category}>{hit.department.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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

    const hitTo = linkResolver.path(hit)

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
                    <span className={styles.category}>{hit.category.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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

    const hitTo = linkResolver.path(hit)

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
                    <span className={styles.category}>{hit.category.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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

    const hitTo = linkResolver.path(hit)

    const hitTitle = hit.title

    return (
        <div className={styles.offeringHit}>
            <h2 className={styles.heading}>
                {hit.offeringType && (
                    <span className={styles.overline}>{hit.offeringType}</span>
                )}
                {hit.category && (
                    <span className={styles.category}>{hit.category.title}</span>
                )}
                <GatsbyLink to={hitTo} className={styles.hitUrl}>
                    {hitTitle}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </GatsbyLink>
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
