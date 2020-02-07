import React, { useState } from 'react'
import cx from "classnames";
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSpring, animated, config } from 'react-spring' // https://www.react-spring.io/docs/hooks/basics

import CallToAction from '../call-to-action'

import styles from "./block-spotlight-content.module.scss";

const linkResolver = require('../../utils').linkResolver

// Display Types - Navigation, Interstitial, Resource Links

const locale = 'en-US'

const typeClasses = {
    'Navigation': 'navigation',
    'Interstitial': 'interstitial',
    'Resource Links': 'resources',
    default: 'default',
};
// This text is used in scenarios where a shortened name is ideal (ex. navigation).
const handlers = {
    'Navigation': (value, className) => <Navigation props={value} className={className} />,
    'Interstitial': (value, className) => <Interstitial props={value} className={className} />,
    'Resource Links': (value, className) => <Resources props={value} className={className} />,
    default: value => <span></span>,
};

const displayComponent = (type, value) => {
    const classModifier = typeClasses[type] || typeClasses.default
    const className = cx(styles.base, styles[classModifier])

    const handler = handlers[type] || handlers.default
    return handler(value, className)
}

const Navigation = ({ props, className }) => {

    const hasRelatedPages = typeof props.relatedPages !== 'undefined' && props.relatedPages[locale].length > 0
    const primaryHeading = typeof props.primaryHeading !== 'undefined' ? props.primaryHeading[locale] : null
    const secondaryHeading = typeof props.secodnaryHeading !== 'undefined' ? props.secodnaryHeading[locale] : null

    return (
        <nav className={className}>
            { primaryHeading && (
                <Heading heading={primaryHeading} overline={secondaryHeading} />
            )}
            { hasRelatedPages && (
                props.relatedPages[locale].map(({ sys, fields }) => {
                    const name = typeof fields.shortTitle !== 'undefined' ? fields.shortTitle[locale] : fields.title[locale]
                    const icon = typeof fields.pageIcon !== 'undefined' ? fields.pageIcon[locale].toLowerCase().replace(' ', '-') : false

                    const [hover, toggleHover] = useState(false)
                    const springProps = useSpring({
                        transform: hover ? 'translate3d(1rem,0,0) rotate(15deg)' : 'translate3d(3rem,0,0) rotate(15deg)'
                    })
                    
                    const to = linkResolver.path(fields)

                    return (
                        <div className={styles.navigationItem} onMouseEnter={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)} key={fields.slug[locale]}>
                            {icon && (
                                <FontAwesomeIcon icon={icon} size='2x' className={styles.navigationIcon} />
                            )}

                            <CallToAction name={name} node={fields} isHovered={hover}/>
                        </div>
                    )
                })
            )}
        </nav>
    )
}

const Interstitial = ({ props, className }) => (
    <div className={className}>
        <h1>Interstitial</h1>
    </div>
)

const Resources = ({ props, className }) => (
    <div className={className}>
        <h1>Resources</h1>
    </div>
)

const Heading = ({heading, overline}) => (
    <h2>
        {overline && (
            <span>{overline}</span>
        )}
        {heading}
    </h2>
)

export default ({ props }) => (
    displayComponent(props.displayStyle[locale], props)
)