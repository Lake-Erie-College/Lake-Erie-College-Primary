import React, { useState } from "react"
import { Link as GatsbyLink } from "gatsby"
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

import styles from './call-to-action.module.scss'

const linkResolver = require('../utils').linkResolver

// Node relates to Fields of object
const CallToAction = ({ name, node, url, isHovered }) => {

    const [hover, toggleHover] = useState(false)
    const hoverState = typeof isHovered === 'undefined' ? hover : isHovered

    const springProps = useSpring({
        transform: hoverState ? 'translate3d(1rem,0,0) rotate(15deg)' : 'translate3d(3rem,0,0) rotate(15deg)'
    })

    const to = !url ? linkResolver.path(node) : url
    const isExternal = typeof url !== 'undefined' && url !== null

    return (
        <p className={styles.callToAction}>
            {isExternal && (
                <a href={to} className={styles.navigationItem} onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
                    <animated.span config={config.gentle} style={springProps} className={styles.callToActionMarker}></animated.span>
                    {name}
                </a>
            )}
            {!isExternal && (
                <GatsbyLink to={to} className={styles.navigationItem} onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
                    <animated.span config={config.gentle} style={springProps} className={styles.callToActionMarker}></animated.span>
                    {name}
                </GatsbyLink>
            )}
        </p>
    )
}

export default CallToAction