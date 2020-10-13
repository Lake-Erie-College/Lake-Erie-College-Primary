import React, { useState } from 'react'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'gatsby-image'

import TextLink from '../text-link'
import CallToAction from '../call-to-action'

import styles from './block-spotlight-content.module.scss'


// Display Types - Navigation, Interstitial, Resource Links

const typeClasses = {
    Navigation: 'navigation',
    Interstitial: 'interstitial',
    'Resource Links': 'resources',
    default: 'default',
}
// This text is used in scenarios where a shortened name is ideal (ex. navigation).
const handlers = {
    Navigation: (value, className) => (
        <Navigation props={value} className={className} />
    ),
    Interstitial: (value, className) => (
        <Interstitial props={value} className={className} />
    ),
    'Resource Links': (value, className) => (
        <Resources props={value} className={className} />
    ),
    default: value => <span></span>,
}

const displayComponent = (type, value) => {
    const classModifier = typeClasses[type] || typeClasses.default
    const className = cx(styles.base, styles[classModifier])

    const handler = handlers[type] || handlers.default
    return handler(value, className)
}

const Navigation = ({ props, className }) => {
    const hasRelatedPages =
        typeof props.relatedPages !== 'undefined' &&
        props.relatedPages.length > 0
    const primaryHeading =
        typeof props.primaryHeading !== 'undefined'
            ? props.primaryHeading
            : null
    const secondaryHeading =
        typeof props.secodnaryHeading !== 'undefined'
            ? props.secodnaryHeading
            : null
    const summary =
        typeof props.summary !== 'undefined' && props.summary !== null
            ? props.summary.summary
            : null

    return (
        <nav className={className}>
            {primaryHeading && (
                <div className={styles.sectionLead}>
                    <Heading
                        heading={primaryHeading}
                        overline={secondaryHeading}
                    />
                    {summary && <Summary summary={summary} />}
                </div>
            )}
            <ul className={styles.navigationList}>
                {hasRelatedPages &&
                    props.relatedPages.map(node => {
                        let fields = {}

                        const modCount = props.relatedPages.length % 3
                        let navClassName = styles.navigationItem

                        if (modCount === 0) {
                            navClassName = cx(
                                styles.navigationItem,
                                styles.mod0
                            )
                        }
                        if (modCount === 1) {
                            navClassName = cx(
                                styles.navigationItem,
                                styles.mod1
                            )
                        }

                        const name =
                            typeof node.displayTitle !== 'undefined'
                                ? node.displayTitle
                                : node.title
                        const isInternalMedia =
                            node.internalMedia !== null
                                ? node.internalMedia
                                : false
                        const isExternal =
                            typeof node.externalUrl !== 'undefined' &&
                            node.externalUrl !== null
                        const isEmbed =
                            typeof node.sourceUrl !== 'undefined' &&
                            node.sourceUrl !== null

                        if (
                            typeof node.internalLink !== 'undefined' &&
                            node.internalLink !== null
                        ) {
                            fields = node.internalLink
                        } else if (isExternal) {
                            fields = node.externalUrl
                        } else if (isEmbed) {
                            fields = node.sourceUrl
                        } else if (isInternalMedia) {
                            fields = node.internalMedia
                        }

                        const icon =
                            typeof node.pageIcon !== 'undefined' &&
                            node.pageIcon !== null
                                ? node.pageIcon
                                      .toLowerCase()
                                      .split(' ')
                                      .join('-')
                                : false

                        const [hover, toggleHover] = useState(false)

                        return (
                            <li
                                className={navClassName}
                                onMouseEnter={() => toggleHover(true)}
                                onMouseLeave={() => toggleHover(false)}
                                key={`spotlight-navigation-${node.title}`}
                            >
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={icon}
                                        size="2x"
                                        className={styles.navigationIcon}
                                    />
                                )}

                                {!icon && !isExternal && (
                                    <FontAwesomeIcon
                                        icon="link"
                                        size="2x"
                                        className={styles.navigationIcon}
                                    />
                                )}

                                {!icon && isExternal && (
                                    <FontAwesomeIcon
                                        icon="external-link-square-alt"
                                        size="2x"
                                        className={styles.navigationIcon}
                                    />
                                )}

                                {!isEmbed && isExternal && (
                                    <CallToAction
                                        name={name}
                                        url={fields}
                                        isHovered={hover}
                                    />
                                )}

                                {!isEmbed && isInternalMedia && (
                                    <CallToAction
                                        name={name}
                                        url={fields.file.url}
                                        isHovered={hover}
                                    />
                                )}

                                {!isEmbed && !isInternalMedia && !isExternal && (
                                    <CallToAction
                                        name={name}
                                        node={fields}
                                        isHovered={hover}
                                    />
                                )}

                                {isEmbed && (
                                    <CallToAction
                                        name={name}
                                        formUrl={fields}
                                        isHovered={hover}
                                    />
                                )}
                            </li>
                        )
                    })}
            </ul>
        </nav>
    )
}

const Interstitial = ({ props, className }) => {
    const hasRelatedPages =
        props.relatedPages !== null &&
        props.relatedPages.length > 0
    const primaryHeading =
        props.primaryHeading !== null &&
        props.primaryHeading !== null
            ? props.primaryHeading
            : null
    const secondaryHeading =
        props.secondaryHeading !== null &&
        props.secondaryHeading !== null
            ? props.secondaryHeading
            : null
    const summary =
        props.summary !== null
            ? props.summary.summary
            : null
    const primaryImage =
        props.primaryImage !== null
            ? props.primaryImage
            : null

    return (
        <div className={className}>
            {primaryImage && (
                <div className={styles.sectionImage}>
                    <PrimaryImage image={primaryImage} />
                </div>
            )}
            <div
                className={
                    primaryImage ? styles.sectionContent : styles.sectionFull
                }
            >
                {primaryHeading && (
                    <Heading
                        heading={primaryHeading}
                        overline={secondaryHeading}
                    />
                )}
                {summary && <Summary summary={summary} />}

                {hasRelatedPages && (
                    <div className={styles.interstitialLinks}>
                        {hasRelatedPages &&
                            props.relatedPages.map(node => {
                                let fields = {}

                                const name =
                                    typeof node.displayTitle !== 'undefined'
                                        ? node.displayTitle
                                        : node.title

                                const isExternal =
                                    typeof node.externalUrl !== 'undefined' &&
                                    node.externalUrl !== null
                                const isEmbed =
                                    typeof node.sourceUrl !== 'undefined' &&
                                    node.sourceUrl !== null
                                const isInternalMedia =
                                    node.internalMedia !== null
                                        ? node.internalMedia
                                        : false

                                if (
                                    typeof node.internalLink !== 'undefined' &&
                                    node.internalLink !== null
                                ) {
                                    fields = node.internalLink
                                } else if (isExternal) {
                                    fields = node.externalUrl
                                } else if (isEmbed) {
                                    fields = node.sourceUrl
                                } else if (isInternalMedia) {
                                    fields = node.internalMedia
                                }

                                return (
                                    <div
                                        className={styles.interstitialLink}
                                        key={`spotlight-interstitial-cta-${node.title}`}
                                    >
                                        {!isEmbed && !isExternal && !isInternalMedia && (
                                            <CallToAction
                                                name={name}
                                                node={fields}
                                            />
                                        )}

                                        {!isEmbed && isExternal && (
                                            <CallToAction
                                                name={name}
                                                url={fields}
                                            />
                                        )}

                                        {!isEmbed && isInternalMedia && (
                                            <CallToAction
                                                name={name}
                                                url={fields.file.url}
                                            />
                                        )}

                                        {isEmbed && (
                                            <CallToAction
                                                name={name}
                                                formUrl={node.sourceUrl}
                                            />
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                )}
            </div>
        </div>
    )
}

const Resources = ({ props, className }) => {
    const hasRelatedPages =
        props.relatedPages !== null &&
        props.relatedPages.length > 0
    const hasRelatedMedia =
        props.relatedMedia !== null &&
        props.relatedMedia.length > 0
    const primaryHeading =
        props.primaryHeading !== null
            ? props.primaryHeading
            : null
    const secondaryHeading =
        props.secondaryHeading !== null
            ? props.secondaryHeading
            : null
    const summary =
        typeof props.summary !== 'undefined' && props.summary !== null
            ? props.summary.summary
            : null
    const primaryImage =
        typeof props.primaryImage !== 'undefined' ? props.primaryImage : null

    return (
        <div className={className}>
            <div className={styles.sectionContent}>
                {primaryHeading && (
                    <Heading
                        heading={primaryHeading}
                        overline={secondaryHeading}
                    />
                )}
                {summary && <Summary summary={summary} />}
                {primaryImage && <PrimaryImage image={primaryImage} />}
            </div>
            <ul className={styles.resourceLinks}>
                {hasRelatedPages &&
                    props.relatedPages.map(fields => {

                        const name =
                            fields.displayTitle !== null
                                ? fields.displayTitle
                                : fields.title
                        const icon =
                            fields.pageIcon !== null
                                ? fields.pageIcon
                                      .toLowerCase()
                                      .replace(' ', '-')
                                : false
                        const internal =
                            fields.internalLink !== null
                                ? fields.internalLink
                                : false
                        const internalMedia =
                            fields.internalMedia !== null
                                ? fields.internalMedia
                                : false
                        const external =
                            fields.externalUrl !== null & fields.externalUrl !== ''
                                ? fields.externalUrl
                                : false
                        const isEmbed = typeof fields.sourceUrl !== 'undefined' && fields.sourceUrl !== null

                        if (!isEmbed && !external && !internal && !internalMedia) {
                            return <span></span>
                        }

                        return (
                            <li
                                className={styles.resourceLink}
                                key={`spotlight-resource-link-${fields.title}`}
                            >
                                {icon && (
                                    <FontAwesomeIcon
                                        icon={icon}
                                        size="xs"
                                        className={styles.resourceIcon}
                                    />
                                )}

                                {!icon && (
                                    <FontAwesomeIcon
                                        icon="arrow-circle-right"
                                        size="xs"
                                        className={styles.resourceIcon}
                                    />
                                )}

                                {internal && (
                                    <TextLink children={name} node={internal} />
                                )}

                                {internalMedia && (
                                    <TextLink
                                        children={name}
                                        uri={internalMedia.file.url}
                                    />
                                )}

                                {external && (
                                    <TextLink children={name} uri={external} />
                                )}

                                {isEmbed && (
                                    <TextLink
                                        children={name}
                                        formUrl={fields.sourceUrl}
                                    />
                                )}
                            </li>
                        )
                    })}
                {hasRelatedMedia &&
                    props.relatedMedia.map(fields => {
                        const name = fields.title

                        return (
                            <li
                                className={styles.resourceLink}
                                key={`related-media-${name}`}
                            >
                                <FontAwesomeIcon
                                    icon="arrow-circle-right"
                                    size="xs"
                                    className={styles.resourceIcon}
                                />

                                <TextLink
                                    children={name}
                                    uri={fields.file.url}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

const Heading = ({ heading, overline }) => (
    <h2 className={styles.heading}>
        {overline && <span className={styles.overline}>{overline}</span>}
        {heading}
    </h2>
)

const Summary = ({ summary }) => {
    return <p className={styles.summary}>{summary}</p>
}

const PrimaryImage = ({ image }) => {
    return (
        <Image
            className={styles.image}
            title={image.title}
            fluid={image.fluid}
            svg={image.svg}
        />
    )
}

export default ({ node }) => displayComponent(node.displayStyle, node)
