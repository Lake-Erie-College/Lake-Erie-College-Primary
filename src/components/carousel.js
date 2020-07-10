import React, { useState } from 'react'
import cx from "classnames"
import BlockMediaWithCaption from './blocks/block-media-with-caption'

import { Sled, Views, Progress, Control } from "react-sled";
import "react-sled/dist/main.css";

import styles from "./carousel.module.scss";

const Carousel = ({content}) => {
    return (
        <Sled>
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
            <Progress />
            <div className="controls arrows">
                <Control select="prev" />
                <Control select="next" />
            </div>
            <div className="controls dots">
                {content.map((media, index) => (
                    <Control key={`carousel-control-${media.title}`} select={index} />
                ))}
            </div>
        </Sled>
    )
}

export default Carousel