import React, { useState } from 'react'
import cx from 'classnames'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageWithSVGSupport from '../image-with-svg-support'
import ReactPlayer from 'react-player'
import useContentfulImage from '../../hooks/useContentfulImage'

const linkResolver = require('../../utils').linkResolver

import styles from './block-media-with-caption.module.scss'

const BlockMediaWithCaption = (
    {
        internalMedia,
        externalMedia,
        heading,
        caption,
        internalLink,
        callToAction,
        isOverlay,
    },
    ...rest
) => {
    const isImage =
        typeof internalMedia !== 'undefined' && internalMedia !== null

    const video =
        typeof externalMedia !== 'undefined' && externalMedia !== null
            ? externalMedia
            : null
    const hasRelatedPage =
        typeof internalLink !== 'undefined' && internalLink.length > 0
    const primaryHeading = typeof heading !== 'undefined' ? heading : null
    const summary = typeof caption !== 'undefined' ? caption : null
    const primaryImage =
        typeof internalMedia !== 'undefined' ? internalMedia : null

    const overlayClass =
        typeof isOverlay !== 'undefined' && isOverlay !== null
            ? styles.overlay
            : ''

    return (
        <figure className={cx(styles.blockMedia, overlayClass)}>
            {video && <VideoPlayer url={video} />}
            {isImage && <Image image={primaryImage} />}
            <figcaption className={styles.mediaCaption}>
                {heading && (
                    <h2 className={styles.heading}>{primaryHeading}</h2>
                )}
                {summary && <p className={styles.summary}>{summary}</p>}
                {hasRelatedPage && callToAction && (
                    <Link node={internalLink} cta={callToAction} />
                )}
            </figcaption>
        </figure>
    )
}

const Image = ({ image }) => {
    const contentfulImage =
        typeof image.fluid === 'undefined'
            ? useContentfulImage(image.data.target.file.url)
            : image

    const title =
        typeof image.title === 'undefined'
            ? image.data.target.title
            : image.title

    const file =
        typeof image.file === 'undefined'
            ? image.data.target.file
            : image.file

    return (
        <ImageWithSVGSupport
            className={styles.media}
            title={title}
            fluid={contentfulImage.fluid}
            file={file}
            svg={contentfulImage.svg}
            loading={'eager'}
        />
    )
}

const VideoPlayer = ({ url }) => {
    return (
        <div className={styles.media}>
            <ReactPlayer
                className={styles.video}
                url={url}
                width="100%"
                height="100%"
            />
        </div>
    )
}

const Link = ({ node, cta }) => {
    const to = linkResolver.path(node)

    return (
        <p className={cx(styles.info, styles.building)}>
            <GatsbyLink to={to} className={styles.internal}>
                <FontAwesomeIcon
                    icon="arrow-circle-right"
                    size="sm"
                    className={styles.icon}
                />
                <span>{cta}</span>
            </GatsbyLink>
        </p>
    )
}

export default BlockMediaWithCaption
