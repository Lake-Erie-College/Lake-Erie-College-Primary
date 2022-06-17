import React from 'react'
import cx from "classnames"
import Image from "gatsby-image"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./person.module.scss"

const linkResolver = require('../utils').linkResolver

const Person = ({ person, displayName }) => {
    const shouldDisplayName = typeof displayName !== 'undefined' ? displayName : true
    const fullName = typeof person.preferredFullName !== 'undefined' && person.preferredFullName !== null ? person.preferredFullName : `${person.firstName} ${person.lastName}`
          
    const personTo = linkResolver.path(person)
    const departmentTo = person.department ? linkResolver.path(person.department) : null
    const buildingTo = person.building ? linkResolver.path(person.building) : null

    const hasHeadshot = typeof person.headshot !== 'undefined' && person.headshot !== null

    const hasJobTitles = typeof person.jobTitles !== 'undefined' && person.jobTitles !== null
    
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
                { hasJobTitles && (
                    <p className={styles.jobTitle}>{person.jobTitles.jobTitles || person.jobTitles}</p>
                )}
                { departmentTo && (
                    <h4 className={cx(styles.info, styles.department)}>
                        <GatsbyLink to={departmentTo} className={styles.internal}>
                            <span className={styles.text}>{person.department.title}<FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} /></span>
                        </GatsbyLink>
                    </h4>
                )}
                { buildingTo && (
                    <p className={cx(styles.info, styles.building)}>
                        {person.building.title}
                    </p>
                )}
                { person.office && (
                    <p className={cx(styles.info, styles.office)}>{person.office}</p>
                )}
            </figcaption>
        </figure>
    )
}

export default Person