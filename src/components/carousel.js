import React, { useState } from 'react'
import cx from 'classnames'
import BlockMediaWithCaption from './blocks/block-media-with-caption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FocusWithin } from 'react-focus-within'

import { Sled, Views, Control } from 'react-sled'
// import 'react-sled/dist/main.css'

import styles from './carousel.module.scss'

const Carousel = ({ content, images, displayDots, displayArrows }) => {
    const hasControls =
        typeof displayDots !== 'undefined' && displayDots === true
    const hasArrows =
        typeof displayArrows !== 'undefined' && displayArrows === true

    const hasContent = typeof content !== 'undefined' && content !== null
    const hasImages = typeof images !== 'undefined' && images !== null

    return (
        <div className={styles.carousel}>
            {hasContent && (
                <CarouselMediaWithCaptions
                    content={content}
                    hasControls={hasControls}
                    hasArrows={hasArrows}
                />
            )}
            {hasImages && (
                <CarouselImages
                    images={images}
                    hasControls={hasControls}
                    hasArrows={hasArrows}
                />
            )}
        </div>
    )
}

const handleFocus = index => {
    return console.log('FOCUS', index)
}

const CarouselMediaWithCaptions = ({ content, hasControls, hasArrows }) => {
    const [currentIndex, setIndex] = useState(0)

    return (
        <Sled>
            <Views
                select={currentIndex}
                showElements="1"
                width="100%"
                direction="horizontal"
                autoPlayInterval={5000}
                pauseOnMouseOver={true}
                stopOnInteraction={true}
            >
                {content.map((media, index) => (
                    <FocusWithin
                        onFocus={() => {
                            // setIndex(index)
                            // Do Nothing.
                        }}
                        onBlur={() => {
                            // Do Nothing.
                            // setIndex(index + 1)
                        }}
                    >
                        {({ isFocused, focusProps }) => (
                            <div {...focusProps} tabIndex={isFocused ? -1 : 0}>
                                <BlockMediaWithCaption
                                    key={`carousel-${media.title}`}
                                    internalMedia={media.image}
                                    externalMedia={media.externalMediaUrl}
                                    heading={media.mediaHeading}
                                    caption={
                                        media.mediaCaption.mediaCaption
                                    }
                                    internalLink={media.internalLink}
                                    externalUrl={media.externalUrl}
                                    callToAction={media.callToAction}
                                    isOverlay={true}
                                />
                            </div>
                        )}
                    </FocusWithin>
                ))}
            </Views>
            {hasArrows && (
                <div>
                    <div className={styles.arrowPrev}>
                        <Control select="prev">
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                size="lg"
                                className={cx(styles.icon, styles.iconFlip)}
                            />
                        </Control>
                    </div>
                    <div className={styles.arrowNext}>
                        <Control select="next">
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                size="lg"
                                className={styles.icon}
                            />
                        </Control>
                    </div>
                </div>
            )}
            {hasControls && (
                <div className={styles.controls}>
                    {content.map((media, index) => (
                        <Control
                            key={`carousel-control-${media.title}`}
                            select={index}
                        >
                            <FontAwesomeIcon
                                icon="circle"
                                size="1x"
                                className={cx(styles.icon, styles.iconInverse)}
                            />
                        </Control>
                    ))}
                </div>
            )}
        </Sled>
    )
}

const CarouselImages = ({ images, hasControls, hasArrows }) => {
    return (
        <Sled>
            <Views showElements="1" width="100%" direction="horizontal">
                {images.map((media, index) => (
                    <BlockMediaWithCaption
                        key={`carousel-${media.title}`}
                        internalMedia={media}
                        isOverlay={true}
                    />
                ))}
            </Views>
            {hasArrows && (
                <div>
                    <div className={styles.arrowPrev}>
                        <Control select="prev">
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                size="lg"
                                className={cx(styles.icon, styles.iconFlip)}
                            />
                        </Control>
                    </div>
                    <div className={styles.arrowNext}>
                        <Control select="next">
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                size="lg"
                                className={styles.icon}
                            />
                        </Control>
                    </div>
                </div>
            )}
            {hasControls && (
                <div className={styles.controls}>
                    {content.map((media, index) => (
                        <Control
                            key={`carousel-control-${media.title}`}
                            select={index}
                        >
                            <FontAwesomeIcon
                                icon="circle"
                                size="1x"
                                className={cx(styles.icon, styles.iconInverse)}
                            />
                        </Control>
                    ))}
                </div>
            )}
        </Sled>
    )
}

export default Carousel
