import React, { useState } from 'react'
import cx from 'classnames'
import BlockMediaWithCaption from './blocks/block-media-with-caption'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Sled, Views, Progress, Control } from 'react-sled'
// import 'react-sled/dist/main.css'

import styles from './carousel.module.scss'

const Carousel = ({ content, displayDots, displayArrows }) => {
    const hasControls =
        typeof displayDots !== 'undefined' && displayDots === true
    const hasArrows =
        typeof displayArrows !== 'undefined' && displayArrows === true

    return (
        <div className={styles.carousel}>
            <Sled>
                <div className={styles.slides}>
                    <Views>
                        {content.map((media, index) => (
                            <BlockMediaWithCaption
                                key={`carousel-${media.title}`}
                                internalMedia={media.image}
                                externalMedia={media.externalMediaUrl}
                                heading={media.mediaHeading}
                                caption={media.mediaCaption.mediaCaption}
                                internalLink={media.internaLink}
                                callToAction={media.callToAction}
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
                                        className={cx(
                                            styles.icon,
                                            styles.iconFlip
                                        )}
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
                                        className={cx(
                                            styles.icon,
                                            styles.iconInverse
                                        )}
                                    />
                                </Control>
                            ))}
                        </div>
                    )}
                </div>
            </Sled>
        </div>
    )
}

export default Carousel
