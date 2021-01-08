import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './page-heading.module.scss'

const linkResolver = require('../utils').linkResolver

const RegularHeading = ({ primary, secondary, overline }) => {
    const hasOverline = typeof overline !== 'undefined'

    return (
        <h1 className={styles.pageHeading}>
            {hasOverline && (
                <strong className={styles.overline}>{overline}</strong>
            )}
            <span>
                {primary}
                {secondary && <em> | {secondary}</em>}
            </span>
        </h1>
    )
}

const LinkHeading = ({ primary, secondary, overline, linkTo, currentPage }) => {
    const hasOverline = typeof overline !== 'undefined'
    const to = linkResolver.path(linkTo)
    const currentTo = linkResolver.path(currentPage)

    return (
        <header className={styles.pageHeading}>
            <ol vocab="https://schema.org/" typeof="BreadcrumbList" className={styles.breadcrumb}>
                <li property="itemListElement" typeof="ListItem">
                    {hasOverline && (
                        <strong className={styles.overline}>
                            <GatsbyLink
                                to={to}
                                className={styles.internal}
                                property="item"
                                typeof="WebPage"
                            >
                                <span property="name">{overline}</span>
                                <FontAwesomeIcon
                                    icon="external-link-square-alt"
                                    size="xs"
                                    className={styles.icon}
                                />
                            </GatsbyLink>
                        </strong>
                    )}
                    <meta property="position" content="1" />
                </li>
                <li property="itemListElement" typeof="ListItem">
                    {hasOverline && (
                        <GatsbyLink
                            to={currentTo}
                            className={`visually-hidden`}
                            property="item"
                            typeof="WebPage"
                        >
                            <span property="name">{currentPage.title}</span>
                        </GatsbyLink>
                    )}
                    <meta property="position" content="2" />
                </li>
            </ol>
            <h1 className={styles.pageHeader}>
                <span>
                    {primary}
                    {secondary && <em>| {secondary}</em>}
                </span>
            </h1>
        </header>
    )
}

const PageHeading = (
    { primary, secondary, overline, linkTo, currentPage },
    ...rest
) => {
    const hasLink = typeof linkTo !== 'undefined' && linkTo !== null

    if (!hasLink) {
        return (
            <RegularHeading
                primary={primary}
                secondary={secondary}
                overline={overline}
            />
        )
    } else if (hasLink) {
        return (
            <LinkHeading
                primary={primary}
                secondary={secondary}
                overline={overline}
                linkTo={linkTo}
                currentPage={currentPage}
            />
        )
    }
}

export default PageHeading
