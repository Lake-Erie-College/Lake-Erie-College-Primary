import React from 'react'
import cx from "classnames"
import Image from "gatsby-image"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useContentfulImage from "../hooks/useContentfulImage"
import styles from "./person.module.scss"

const linkResolver = require('../utils').linkResolver

const Person = ({ person, displayName }, ...rest) => {
    const hasOverline = typeof overline !== 'undefined'
    const shouldDisplayName = typeof displayName !== 'undefined' ? displayName : true
    const fullName = typeof person.preferredFullName !== 'undefined' && person.preferredFullName !== null ? person.preferredFullName : `${person.firstName} ${person.lastName}`
          
    const personTo = linkResolver.path(person)
    const departmentTo = linkResolver.path(person.department)
    const buildingTo = linkResolver.path(person.building)

    const hasHeadshot = typeof person.headshot !== 'undefined' && person.headshot !== null

    if (hasHeadshot && typeof person.headshot.fluid === 'undefined') {
        person.headshot = useContentfulImage(
            person.headshot.file.url
        )
    }
    
    return (
        <figure className={styles.person}>
            { hasHeadshot && (
                <Image className={styles.image} title={`Photo of ${fullName}`} fluid={person.headshot.fluid} />
            )}
            <figcaption className={styles.details}>
                { shouldDisplayName && (
                    <h3 className={styles.name}>
                        <GatsbyLink to={personTo} className={styles.internal}>
                            {fullName}
                        </GatsbyLink>
                    </h3>
                )}
                <p className={styles.jobTitle}>{person.jobTitles.jobTitles || person.jobTitles}</p>

                <h4 className={cx(styles.info, styles.department)}>
                    <GatsbyLink to={departmentTo} className={styles.internal}>
                        {person.department.title}<nobr><FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} /></nobr>
                    </GatsbyLink>
                </h4>
                <p className={cx(styles.info, styles.building)}>
                    <GatsbyLink to={buildingTo} className={styles.internal}>
                        {person.building.title}<nobr><FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} /></nobr>
                    </GatsbyLink>
                </p>
                <p className={cx(styles.info, styles.office)}>{person.office}</p>
            </figcaption>
        </figure>
    )
}

export default Person