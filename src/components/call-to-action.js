import React, { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { TypeFormPopup } from './blocks/block-external-embed'
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

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
        <p className={styles.callToAction}>
            {isExternal && !isForm && !isButton && (
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
                    {name} {children}
                </a>
            )}
            {isExternal && !isForm && isButton && (
                <span
                    onClick={onClick}
                    className={styles.link}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
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
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
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
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
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

function Link({ text, status }) {
    switch (status) {
        case 'info':
            return <Info text={text} />
        case 'warning':
            return <Warning text={text} />
        case 'error':
            return <Error text={text} />
        default:
            return null
    }
}

export default CallToAction
