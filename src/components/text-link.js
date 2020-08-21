import React, { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useSpring, config } from '@react-spring/core'
import { a } from '@react-spring/web'
import { TypeFormPopup } from './blocks/block-external-embed'

import styles from './text-link.module.scss'

const linkResolver = require('../utils').linkResolver

export default ({ node, uri, children, formUrl }) => {
    const isExternal = typeof uri !== 'undefined' && uri !== null
    const [hover, toggleHover] = useState(0)
    const hoverState = typeof isHovered === 'undefined' ? hover : isHovered
    const to = !uri ? linkResolver.path(node) : uri

    const isForm = typeof formUrl !== 'undefined' && formUrl !== null

    const { x } = useSpring({
        x: hoverState,
    })

    if (isExternal) {
        return (
            <a
                rel="noopener noreferrer"
                className={styles.textLink}
                href={to}
                onMouseEnter={() => toggleHover(1)}
                onMouseLeave={() => toggleHover(0)}
            >
                <a.span
                    className={styles.linkHoverText}
                    aria-hidden="hidden"
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
                <a.span
                    className={styles.linkHoverUnderline}
                    aria-hidden="hidden"
                    style={{
                        y: x.to([0, 1], ['0em', '-0.25em']),
                        opacity: x.to([0, 1], [1, 0]),
                    }}
                ></a.span>
                <a.span
                    className={styles.linkMainText}
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
            </a>
        )
    } else if (!isExternal & !isForm) {
        return (
            <GatsbyLink
                to={to}
                className={styles.textLink}
                onMouseEnter={() => toggleHover(1)}
                onMouseLeave={() => toggleHover(0)}
            >
                <a.span
                    className={styles.linkHoverText}
                    aria-hidden="hidden"
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
                <a.span
                    className={styles.linkHoverUnderline}
                    aria-hidden="hidden"
                    style={{
                        y: x.to([0, 1], ['0em', '-0.25em']),
                        opacity: x.to([0, 1], [1, 0]),
                    }}
                ></a.span>
                <a.span
                    className={styles.linkMainText}
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
            </GatsbyLink>
        )
    } else if (!isExternal && isForm) {
        return (
            <span
                className={styles.textLink}
                onMouseEnter={() => toggleHover(1)}
                onMouseLeave={() => toggleHover(0)}
                onClick={() => TypeFormPopup(formUrl)}
            >
                <a.span
                    className={styles.linkHoverText}
                    aria-hidden="hidden"
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
                <a.span
                    className={styles.linkHoverUnderline}
                    aria-hidden="hidden"
                    style={{
                        y: x.to([0, 1], ['0em', '-0.25em']),
                        opacity: x.to([0, 1], [1, 0]),
                    }}
                ></a.span>
                <a.span
                    className={styles.linkMainText}
                    style={{
                        clipPath: x.to(
                            [1, 0],
                            [
                                'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                                'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            ]
                        ),
                    }}
                >
                    {children}
                </a.span>
            </span>
        )
    }
}
