import React, { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TypeFormPopup } from './blocks/block-external-embed'
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

import TextLink from './text-link'

import styles from './call-to-action.module.scss'

const linkResolver = require('../utils').linkResolver

// Node relates to Fields of object
const CallToAction = ({ name, node, url, isHovered, formUrl, children, onClick }) => {
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

    const isButton = isExternal && url === '#'

    return (
        <p className={styles.callToAction}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}>
            {isExternal && !isForm && !isButton && (
                <a
                    href={to}
                    className={styles.link}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name} {children}
                </a>
            )}
            {isExternal && !isForm && isButton && (
                <span
                    onClick={onClick}
                    className={styles.link}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name} {children}
                </span>
            )}
            {!isExternal && isForm && (
                <a
                    href="#"
                    className={styles.link}
                    onClick={() => TypeFormPopup(formUrl)}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name} {children}
                </a>
            )}
            {!isExternal && !isForm && (
                <GatsbyLink
                    to={to}
                    className={styles.link}
                >
                    <animated.span
                        config={config.gentle}
                        style={springProps}
                        className={styles.callToActionMarker}
                    ></animated.span>
                    {name} {children}
                </GatsbyLink>
            )}
        </p>
    )
}

export default CallToAction
