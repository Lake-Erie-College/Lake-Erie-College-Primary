import React from 'react'
import cx from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageWithSVGSupport from '../image-with-svg-support'
import ReactPlayer from 'react-player'
import TextLink from '../text-link'

import styles from './block-quote.module.scss'

const BlockQuote = ({ media, displayType, personName, copy, heading }) => {
    const hasMedia = typeof media !== 'undefined' && media !== null

    if (displayType === 'Message') {
        return (
            <div className={styles.blockQuote}>
                <Message
                    media={media}
                    personName={personName}
                    copy={copy}
                    heading={heading}
                />
            </div>
        )
    } else if (displayType === 'Testimonial') {
        return (
            <div className={styles.blockQuote}>
                <Testimonial
                    media={media}
                    personName={personName}
                    copy={copy}
                    heading={heading}
                />
            </div>
        )
    }

    // No display type found matching input.
    return (
        <div className={styles.blockQuote}>
            <UnknownType />
        </div>
    )
}

const Message = ({ media, personName, copy, heading }) => {
    return (
        <div className={styles.message}>
            {media && <Image image={media} />}
            <div className={styles.sectionContent}>
                {heading && (
                    <h2 className={styles.heading}>
                        {personName && (
                            <span className={styles.overline}>
                                {personName}
                            </span>
                        )}
                        {heading}
                    </h2>
                )}
                {copy && <p className={styles.summary}>{copy}</p>}
            </div>
        </div>
    )
}

const Testimonial = ({ media, personName, copy, heading }) => {
    return (
        <div className={styles.testimonial}>
            {media && <Image image={media} />}
            <blockquote className={styles.sectionContent}>
                {heading && (
                    <h2 className={styles.heading}>
                        {heading}
                    </h2>
                )}
                {copy && <p className={styles.quote}>{copy}</p>}
                {personName && (
                    <p className={styles.attribution}>
                        {personName}
                    </p>
                )}
            </blockquote>
        </div>
    )
}

const UnknownType = () => {
    return <p>Uknown Type</p>
}

const Image = ({ image }) => {
    const title = image.title
    const file = image.file

    return (
        <ImageWithSVGSupport
            className={styles.image}
            title={title}
            fluid={image.fluid}
            file={file}
            svg={image.svg}
            loading={'eager'}
            alt={image.description}
        />
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

export default BlockQuote
