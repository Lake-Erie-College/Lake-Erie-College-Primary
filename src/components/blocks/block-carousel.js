import React, { useState } from 'react'
import Carousel from '../carousel'

import styles from './block-carousel.module.scss'

const BlockCarousel = ({ media, images, displayArrows, displayDots }) => {
    return (
        <div>
            <Carousel content={media} images={images} displayArrows={displayArrows} displayDots={displayDots} />
        </div>
    )
}

export default BlockCarousel