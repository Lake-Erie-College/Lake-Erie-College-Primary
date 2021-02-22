import React from 'react'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageWithSVGSupport from '../image-with-svg-support'
import ReactPlayer from 'react-player'
import TextLink from '../text-link'

import styles from './block-media-with-caption.module.scss'

const BlockMediaWithCaption = ({
    internalMedia,
    externalMedia,
    heading,
    caption,
    internalLink,
    externalUrl,
    callToAction,
    isOverlay,
    isLead,
}) => {
    const isImage =
        typeof internalMedia !== 'undefined' && internalMedia !== null

    const video =
        typeof externalMedia !== 'undefined' && externalMedia !== null
            ? externalMedia
            : null
    const isExternal =
        typeof externalUrl !== 'undefined' && externalUrl !== null
    const hasRelatedPage =
        (typeof internalLink !== 'undefined' && internalLink !== null) ||
        isExternal
    const primaryHeading = typeof heading !== 'undefined' ? heading : null
    const summary =
        typeof caption !== 'undefined' && caption !== null ? caption : null
    const primaryImage =
        typeof internalMedia !== 'undefined' ? internalMedia : null

    const overlayClass =
        typeof isOverlay !== 'undefined' && isOverlay !== null
            ? styles.overlay
            : ''

    const leadClass =
        typeof isLead !== 'undefined' && isLead !== null
            ? styles.lead
            : ''

    return (
        <figure className={cx(styles.blockMedia, overlayClass, leadClass)}>
            {!isImage && video && <VideoPlayer url={video} />}
            {isImage && <Image image={primaryImage} />}
            {(heading || summary) && (
                <figcaption className={styles.mediaCaption}>
                    {heading && !isLead && (
                        <h3 className={styles.heading}>{primaryHeading}</h3>
                    )}
                    {heading && isLead && (
                        <h1 className={styles.heading}>{primaryHeading}</h1>
                    )}
                    {summary && <p className={styles.summary}>{summary}</p>}
                    {hasRelatedPage && callToAction && (
                        <Link
                            node={internalLink}
                            cta={callToAction}
                            uri={externalUrl}
                        />
                    )}
                </figcaption>
            )}
        </figure>
    )
}

const Image = ({ image }) => {
    const title = image.title

    const file = image.file

    return (
        <ImageWithSVGSupport
            className={styles.media}
            title={title}
            fluid={image.fluid}
            file={file}
            svg={image.svg}
            loading={'eager'}
            alt={image.description}
        />
    )
}

const VideoPlayer = ({ url }) => {
    return (
        <div className={styles.mediaEmbed}>
            <ReactPlayer
                className={styles.video}
                url={url}
                width="100%"
                height="100%"
            />
        </div>
    )
}

const Link = ({ node, cta, uri }) => {
    const isExternal = typeof uri !== 'undefined' && uri !== null

    return (
        <p className={styles.info}>
            {!isExternal && <TextLink node={node} children={cta} />}
            {isExternal && <TextLink uri={uri} children={cta} />}
            <FontAwesomeIcon
                icon="arrow-circle-right"
                size="sm"
                className={styles.icon}
            />
        </p>
    )
}

export default BlockMediaWithCaption
