import React, { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { TypeFormPopup } from './blocks/block-external-embed'
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

import styles from './call-to-action.module.scss'

const linkResolver = require('../utils').linkResolver

// Node relates to Fields of object
const CallToAction = ({ name, node, url, isHovered, formUrl }) => {
    const [hover, toggleHover] = useState(false)
    const hoverState = typeof isHovered === 'undefined' ? hover : isHovered

    const springProps = useSpring({
        transform: hoverState
            ? 'translate3d(1rem,0,0) rotate(15deg)'
            : 'translate3d(3rem,0,0) rotate(15deg)',
    })

    const to = !url ? linkResolver.path(node) : url
    const isExternal = typeof url !== 'undefined' && url !== null

    const isForm = typeof formUrl !== 'undefined' && formUrl !== null

    return (
        <p className={styles.callToAction}>
            {isExternal && !isForm && (
                <a
                    href={to}
                    className={styles.link}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name}
                </a>
            )}
            {!isExternal && isForm && (
                <span
                    className={styles.link}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                    onClick={() => TypeFormPopup(formUrl)}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name}
                </span>
            )}
            {!isExternal && !isForm && (
                <GatsbyLink
                    to={to}
                    className={styles.link}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name}
                </GatsbyLink>
            )}
        </p>
    )
}

export default CallToAction
