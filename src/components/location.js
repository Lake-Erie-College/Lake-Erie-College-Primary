import React from 'react'
import cx from 'classnames'
import Image from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './location.module.scss'

const linkResolver = require('../utils').linkResolver

const Location = ({ name, photo, summary, slug, category }) => {
    const hasName = typeof name !== 'undefined' && name !== null
    const hasPhoto = typeof photo !== 'undefined' && photo !== null
    const hasSummary = typeof summary !== 'undefined' && summary !== null
    const hasSlug = typeof slug !== 'undefined' && slug !== null
    const hasCategory = typeof category !== 'undefined' && category !== null

    const locationTo = linkResolver.path({ slug: slug, category: category })

    return (
        <section className={styles.location}>
            <figure className={styles.locationInfo}>
                {hasPhoto && (
                    <Image
                        className={styles.image}
                        title={`Photo of ${name}`}
                        fluid={photo.fluid}
                    />
                )}
                <figcaption className={styles.details}>
                    {hasPhoto && (
                        <h3 className={styles.name}>
                            <GatsbyLink
                                to={locationTo}
                                className={styles.internal}
                            >
                                {name}
                            </GatsbyLink>
                        </h3>
                    )}
                    {hasSummary && <p className={styles.summary}>{summary}</p>}
                </figcaption>
            </figure>
        </section>
    )
}

export default Location
