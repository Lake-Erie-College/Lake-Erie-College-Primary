import React, { useState } from 'react'
import cx from "classnames"
import BlockMediaWithCaption from './blocks/block-media-with-caption'


import { Sled, Views, Progress, Control } from "react-sled";
import "react-sled/dist/main.css";

import styles from "./block-spotlight-content.module.scss";

const Carousel = (content) => {
    <Sled>
        <Views>
            {content.map((media, index) => (
                <BlockMediaWithCaption key={image} src={image} alt={`My Image #${index}`} />
            ))}
        </Views>
        <Progress />
        <div className="controls arrows">
            <Control select="prev" />
            <Control select="next" />
        </div>
        <div className="controls dots">
            {images.map((image, index) => (
                <Control key={image} select={index} />
            ))}
        </div>
    </Sled>
}

export default Carousel