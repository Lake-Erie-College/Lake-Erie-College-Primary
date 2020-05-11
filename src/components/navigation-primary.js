import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'
import get from 'lodash/get'
import FocusLock from 'react-focus-lock'
import { Link as GatsbyLink } from 'gatsby'
import styles from './navigation-primary.module.scss'

const linkResolver = require('../utils').linkResolver

const NavigationPrimary = () => {
    const data = useStaticQuery(graphql`
        {
            contentfulSiteSettings(slug: { eq: "global-site-settings" }) {
                navigationPrimary {
                    id
                    navigationItems {
                        id
                        title
                        newWindow
                        externalUrl
                        internalLink {
                            ... on ContentfulAcademicOffering {
                                id
                                slug
                                category {
                                    slug
                                }
                            }
                            ... on ContentfulDepartment {
                                id
                                slug
                            }
                            ... on ContentfulEvent {
                                id
                                slug
                                category {
                                    slug
                                }
                            }
                            ... on ContentfulHomepage {
                                id
                                slug
                            }
                            ... on ContentfulLocation {
                                id
                                slug
                                category {
                                    slug
                                }
                            }
                            ... on ContentfulPerson {
                                id
                                slug
                            }
                            ... on ContentfulStandardPage {
                                id
                                slug
                                category {
                                    slug
                                }
                            }
                        }
                        navigationSubmenu {
                            id
                            title
                            navigationItems {
                                id
                                title
                                newWindow
                                externalUrl
                                internalLink {
                                    ... on ContentfulAcademicOffering {
                                        id
                                        slug
                                        category {
                                            slug
                                        }
                                    }
                                    ... on ContentfulDepartment {
                                        id
                                        slug
                                    }
                                    ... on ContentfulEvent {
                                        id
                                        slug
                                        category {
                                            slug
                                        }
                                    }
                                    ... on ContentfulHomepage {
                                        id
                                        slug
                                    }
                                    ... on ContentfulLocation {
                                        id
                                        slug
                                        category {
                                            slug
                                        }
                                    }
                                    ... on ContentfulPerson {
                                        id
                                        slug
                                    }
                                    ... on ContentfulStandardPage {
                                        id
                                        slug
                                        category {
                                            slug
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const navigationItems = get(
        data,
        'contentfulSiteSettings.navigationPrimary.navigationItems'
    )

    const NavigationItem = ({ level, link, className, tabIndex }) => {
        const submenuItems = get(link, 'navigationSubmenu.navigationItems')
        const hasPopup =
            typeof submenuItems !== 'undefined' &&
            submenuItems !== null &&
            submenuItems.length > 0

        const currentTabIndex = typeof tabIndex === 'undefined' ? 0 : tabIndex

        const [hover, toggleHover] = useState(false)

        return (
            <li
                className={cx(styles.navigationItem, {
                    [`${styles.navigationItemPrimaryLevel}`]: level === 0,
                    [`${styles.navigationItemOpen}`]: hover
                })}
                role="none"
                onMouseEnter={() => toggleHover(hasPopup && true)}
                onMouseLeave={() => toggleHover(hasPopup && false)}
            >
                <FocusLock disabled={!hover}>
                    <NavigationLink
                        level={level}
                        link={link}
                        hasPopup={hasPopup}
                        isExpanded={hover}
                        tabIndex={currentTabIndex}
                    />
                    {hasPopup && (
                        <NavigationSubmenu
                            level={level + 1}
                            links={submenuItems}
                            label={link.title}
                            expand={hover}
                            tabIndex={hover ? 0 : -1}
                        />
                    )}
                </FocusLock>
            </li>
        )
    }

    const NavigationLink = ({ level, link, hasPopup, isExpanded, tabIndex }) => {
        const isExternal =
            typeof link.externalURL !== 'undefined' && link.externalURL !== null

        if (
            !isExternal &&
            (typeof link.internalLink === 'undefined' ||
                link.internalLink === null)
        ) {
            return (
                <span
                    className={cx(styles.navigationLink, {
                        [`${styles.navigationLinkPrimaryLevel}`]: level === 0,
                    })}
                    aria-haspopup={hasPopup}
                    aria-expanded={isExpanded}
                    tabIndex={tabIndex}
                >
                    {link.title}
                </span>
            )
        }

        const to = !isExternal
            ? linkResolver.path(link.internalLink)
            : link.externalURL

        if (isExternal) {
            return (
                <NavigationExternalLink
                    level={level}
                    url={to}
                    name={link.title}
                    hasPopup={hasPopup}
                    isExpanded={isExpanded}
                    tabIndex={tabIndex}
                />
            )
        } else {
            return (
                <NavigationInternalLink
                    level={level}
                    url={to}
                    name={link.title}
                    hasPopup={hasPopup}
                    isExpanded={isExpanded}
                    tabIndex={tabIndex}
                />
            )
        }
    }

    const NavigationExternalLink = ({
        level,
        url,
        name,
        hasPopup,
        isExpanded,
        tabIndex,
    }) => {
        return (
            <a
                className={cx(styles.navigationLink, {
                    [`${styles.navigationLinkPrimaryLevel}`]: level === 0,
                })}
                href={url}
                aria-haspopup={hasPopup}
                aria-expanded={isExpanded}
                tabIndex={tabIndex}
            >
                {name}
            </a>
        )
    }

    const NavigationInternalLink = ({
        level,
        url,
        name,
        hasPopup,
        isExpanded,
        tabIndex,
    }) => {
        return (
            <GatsbyLink
                className={cx(styles.navigationLink, {
                    [`${styles.navigationLinkPrimaryLevel}`]: level === 0,
                })}
                to={url}
                aria-haspopup={hasPopup}
                aria-expanded={isExpanded}
                tabIndex={tabIndex}
            >
                {name}
            </GatsbyLink>
        )
    }

    const NavigationSubmenu = ({ level, links, label, expand, tabIndex }) => {

        return (
            <ul
                className={cx(styles.navigationMenu, {
                    [`${styles.navigationPrimaryLevel}`]: level === 0,
                })}
                aria-label={label}
            >
                {links.map(link => (
                    <NavigationItem
                        level={level}
                        key={`navigation-item-` + link.id}
                        link={link}
                        tabIndex={tabIndex}
                    />
                ))}
            </ul>
        )
    }

    return (
        <NavigationSubmenu
            level={0}
            links={navigationItems}
            label="Primary Navigation"
        />
    )
}

export default NavigationPrimary
