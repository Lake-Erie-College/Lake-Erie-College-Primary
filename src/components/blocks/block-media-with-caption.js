import React, { useState } from 'react'
import cx from "classnames"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GatsbyImage from "gatsby-image"
import ReactPlayer from 'react-player'

const linkResolver = require('../utils').linkResolver

import styles from "./block-spotlight-content.module.scss";

const BlockMediaWithCaption = ({ internalMedia, externalMedia, heading, caption, internalLink, callToAction }, ...rest) => {
    const isVideo = externalMedia !== null
    
    return (
        <figure>
            {isVideo && (
                <VideoPlayer url={externalMedia} />
            )}
            {!isVideo && (
                <Image image={internalMedia} />
            )}
            <figcaption>
                {heading && (
                    <h2>{heading}</h2>
                )}
                {caption && (
                    <p>{caption}</p>
                )}
                {internalLink && callToAction && (
                    <Link node={internalLink} cta={callToAction} />
                )}
            </figcaption>
        </figure>
    )
}

const Image = (image) => {
    <GatsbyImage title={image.title} fluid={image.fluid} />
}

const VideoPlayer = (url) => {
    return (
        <ReactPlayer url={url} />
    )
}

const Link = ({ node, cta }) => {
    const to = linkResolver.path(node)

    return (
        <GatsbyLink to={to}>
            <span>
                {cta}
            </span>
        </GatsbyLink>
    )
}

export default BlockMediaWithCaption