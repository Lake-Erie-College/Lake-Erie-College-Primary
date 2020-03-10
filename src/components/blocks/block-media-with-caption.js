import React, { useState } from 'react'
import cx from "classnames"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GatsbyImage from "gatsby-image"
import ReactPlayer from 'react-player'

const linkResolver = require('../../utils').linkResolver

import styles from "./block-media-with-caption.module.scss";

const BlockMediaWithCaption = ({ internalMedia, externalMedia, heading, caption, internalLink, callToAction, isOverlay }, ...rest) => {
    const isImage = typeof internalMedia !== 'undefined' && internalMedia !== null

    const video = typeof externalMedia !== 'undefined' && externalMedia !== null ? externalMedia : null
    const hasRelatedPage = typeof internalLink !== 'undefined' && internalLink.length > 0
    const primaryHeading = typeof heading !== 'undefined' ? heading : null
    const summary = typeof caption !== 'undefined' ? caption : null
    const primaryImage = typeof internalMedia !== 'undefined' ? internalMedia : null

    const overlayClass = typeof isOverlay !== 'undefined' && isOverlay !== null ? styles.overlay : ''

    return (
        <figure className={cx(styles.blockMedia, overlayClass)}>
            {video && (
                <VideoPlayer url={video} />
            )}
            {isImage && (
                <Image image={primaryImage} />
            )}
            <figcaption className={styles.mediaCaption}>
                {heading && (
                    <h2 className={styles.heading}>{primaryHeading}</h2>
                )}
                {caption && (
                    <p className={styles.summary}>{summary}</p>
                )}
                {hasRelatedPage && callToAction && (
                    <Link node={internalLink} cta={callToAction} />
                )}
            </figcaption>
        </figure>
    )
}

const Image = (image) => {
    const fluid = useContentfulImage(
        image.data.target.file.url
    )
    return (
        <GatsbyImage className={styles.media} title={image.data.target.title} fluid={fluid} />
    )
}

const VideoPlayer = ({url}) => {
    return (
        <div className={styles.media} >
            <ReactPlayer 
                className={styles.video}
                url={url}
                width='100%'
                height='100%'
            />
        </div>
    )
}

const Link = ({ node, cta }) => {
    const to = linkResolver.path(node)

    return (
        <p className={cx(styles.info, styles.building)}>
            <GatsbyLink to={to} className={styles.internal}>
                <FontAwesomeIcon icon='arrow-circle-right' size='sm' className={styles.icon} />
                <span>
                    {cta}
                </span>
            </GatsbyLink>
        </p>
    )
}

export default BlockMediaWithCaption