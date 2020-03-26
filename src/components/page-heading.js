import React from 'react'
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./page-heading.module.scss";

const linkResolver = require('../utils').linkResolver

const RegularHeading = ({ primary, secondary, overline }) => {
    const hasOverline = typeof overline !== 'undefined'
    
    return (
        <h1 className={styles.pageHeading}>
            { hasOverline && (
                <strong className={styles.overline}>
                    {overline}
                </strong>
            )}
            <span>
                {primary}
                {secondary && (
                    <em> | {secondary}</em>
                )}
            </span>
        </h1>
    )
}

const LinkHeading = ({ primary, secondary, overline, linkTo }) => {
    const hasOverline = typeof overline !== 'undefined'
    const to = linkResolver.path(linkTo)
    
    return (
        <h1 className={styles.pageHeading}>
            { hasOverline && (
                <strong className={styles.overline}>
                    <GatsbyLink to={to} className={styles.internal}>
                        {overline}
                        <FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} />
                    </GatsbyLink>
                </strong>
            )}
            <span>
                {primary}
                {secondary && (
                    <em>| {secondary}</em>
                )}
            </span>
        </h1>
    )
}

const PageHeading = ({ primary, secondary, overline, linkTo }, ...rest) => {
    const hasLink = typeof linkTo !== 'undefined' && linkTo !== null
    
    if (!hasLink) {
        return (
            <RegularHeading primary={primary} secondary={secondary} overline={overline} />
        )
    } else if (hasLink) {
        return (
            <LinkHeading primary={primary} secondary={secondary} overline={overline} linkTo={linkTo} />
        )
    }
}

export default PageHeading