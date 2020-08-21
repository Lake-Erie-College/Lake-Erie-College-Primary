import React, { useState } from 'react'
import cx from 'classnames'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics
import Image from 'gatsby-image'
import useContentfulImage from '../../hooks/useContentfulImage'

import TextLink from '../text-link'
import CallToAction from '../call-to-action'

import styles from './block-spotlight-content.module.scss'

const linkResolver = require('../../utils').linkResolver

// Display Types - Navigation, Interstitial, Resource Links

const locale = 'en-US'

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
    const summary = typeof props.summary !== 'undefined' ? props.summary : null

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
                        }

                        const icon =
                            typeof fields.pageIcon !== 'undefined'
                                ? fields.pageIcon
                                      .toLowerCase()
                                      .replace(' ', '-')
                                : false

                        const [hover, toggleHover] = useState(false)
                        const springProps = useSpring({
                            transform: hover
                                ? 'translate3d(1rem,0,0) rotate(15deg)'
                                : 'translate3d(3rem,0,0) rotate(15deg)',
                        })

                        return (
                            <li
                                className={navClassName}
                                onMouseEnter={() => toggleHover(true)}
                                onMouseLeave={() => toggleHover(false)}
                                key={fields.slug}
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

                                {!isEmbed && (
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
        typeof props.relatedPages !== 'undefined' &&
        props.relatedPages.length > 0
    const primaryHeading =
        typeof props.primaryHeading !== 'undefined'
            ? props.primaryHeading
            : null
    const secondaryHeading =
        typeof props.secondaryHeading !== 'undefined'
            ? props.secondaryHeading
            : null
    const summary = typeof props.summary !== 'undefined' ? props.summary : null
    const primaryImage =
        typeof props.primaryImage !== 'undefined' ? props.primaryImage : null

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

                                if (
                                    typeof node.internalLink !== 'undefined' &&
                                    node.internalLink !== null
                                ) {
                                    fields = node.internalLink
                                } else if (isExternal) {
                                    fields = node.externalUrl
                                } else if (isEmbed) {
                                    fields = node.sourceUrl
                                }

                                return (
                                    <div
                                        className={styles.interstitialLink}
                                        key={`spotlight-interstitial-cta-${node.title}`}
                                    >
                                        {!isEmbed && !isExternal && (
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
        typeof props.relatedPages !== 'undefined' &&
        props.relatedPages.length > 0
    const hasRelatedMedia =
        typeof props.relatedMedia !== 'undefined' &&
        props.relatedMedia.length > 0
    const primaryHeading =
        typeof props.primaryHeading !== 'undefined'
            ? props.primaryHeading
            : null
    const secondaryHeading =
        typeof props.secondaryHeading !== 'undefined'
            ? props.secondaryHeading
            : null
    const summary = typeof props.summary !== 'undefined' ? props.summary : null
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
                            typeof fields.displayTitle !== 'undefined'
                                ? fields.displayTitle
                                : fields.title
                        const icon =
                            typeof fields.pageIcon !== 'undefined'
                                ? fields.pageIcon
                                      .toLowerCase()
                                      .replace(' ', '-')
                                : false
                        const internal =
                            typeof fields.internalLink !== 'undefined'
                                ? fields.internalLink
                                : false
                        const external =
                            typeof fields.externalLink !== 'undefined'
                                ? fields.externalLink
                                : false
                        const isEmbed =
                            typeof fields.sourceUrl !== 'undefined' &&
                            fields.sourceUrl !== null

                        return (
                            <li
                                className={styles.resourceLink}
                                key={fields.slug}
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

                                {external && (
                                    <TextLink children={name} uri={external} />
                                )}

                                {isEmbed && (
                                     <TextLink children={name} formUrl={fields.sourceUrl} />
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
    const contentfulImage = useContentfulImage(image.file.url)
    return (
        <Image
            className={styles.image}
            title={image.title}
            fluid={contentfulImage.fluid}
            svg={contentfulImage.svg}
        />
    )
}

export default ({ node }) => displayComponent(node.displayStyle, node)
