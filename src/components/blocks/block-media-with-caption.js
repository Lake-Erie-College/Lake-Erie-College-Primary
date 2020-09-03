import React, { useState } from 'react'
import cx from 'classnames'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageWithSVGSupport from '../image-with-svg-support'
import ReactPlayer from 'react-player'
import TextLink from '../text-link'
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
        externalUrl,
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
    const isExteranl = typeof externalUrl !== 'undefined' && externalUrl !== null
    const hasRelatedPage =
        ( typeof internalLink !== 'undefined' && internalLink !== null ) || isExteranl
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
            {!isImage && video && <VideoPlayer url={video} />}
            {isImage && <Image image={primaryImage} />}
            { (heading || summary) && (
                <figcaption className={styles.mediaCaption}>
                    {heading && (
                        <h2 className={styles.heading}>{primaryHeading}</h2>
                    )}
                    {summary && <p className={styles.summary}>{summary}</p>}
                    {hasRelatedPage && callToAction && (
                        <Link node={internalLink} cta={callToAction} uri={externalUrl} />
                    )}
                </figcaption>
            )}
        </figure>
    )
}

const Image = ({ image }) => {
    const contentfulImage =
        typeof image.fluid === 'undefined'
            ? useContentfulImage(typeof image.data !== 'undefined' ? image.data.target.file.url : image.file.url)
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
            {!isExternal && (
                <TextLink node={node} children={cta} />
            )}
            {isExternal && (
                <TextLink uri={uri} children={cta} /> 
            )}
            <FontAwesomeIcon
                icon="arrow-circle-right"
                size="sm"
                className={styles.icon}
            />
        </p>
    )
}

export default BlockMediaWithCaption
