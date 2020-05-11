import React from 'react'
import cx from "classnames"
import Image from "gatsby-image"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useContentfulImage from "../hooks/useContentfulImage"
import styles from "./contact-person.module.scss";

const linkResolver = require('../utils').linkResolver

const ContactPerson = ({ heading, person, displayName }, ...rest) => {
    const hasOverline = typeof overline !== 'undefined'
    const hasDepartment = typeof person.department !== 'undefined' && person.department !== null
    const hasBuilding = typeof person.building !== 'undefined' && person.building !== null
    const shouldDisplayName = typeof displayName !== 'undefined' ? displayName : true
    const headingContact = typeof heading !== 'undefined' ? heading : null
    const fullName = typeof person.preferredFullName !== 'undefined' && person.preferredFullName !== null ? person.preferredFullName : `${person.firstName} ${person.lastName}`



    const personTo = linkResolver.path(person)
    const departmentTo = hasDepartment ? linkResolver.path(person.department) : null
    const buildingTo = hasBuilding ? linkResolver.path(person.building) : null

    const hasHeadshot = typeof person.headshot !== 'undefined' && person.headshot !== null

    const hasJobTitles = typeof person.jobTitles === 'undefined' && person.jobTitles !== null ? false : true

    if (hasHeadshot && typeof person.headshot.fluid === 'undefined') {
        person.headshot = useContentfulImage(
            person.headshot.file.url
        )
    }
    
    return (
        <section className={styles.contactPerson}>
            { headingContact && (
                <h2 className={styles.heading}>{heading}</h2>
            )}
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

                    { person.phoneNumber && (
                        <p className={styles.info}>
                            <FontAwesomeIcon icon='phone' size='xs' className={styles.icon} />
                            <a className={styles.external} href={`tel:${person.phoneNumber}`}>{person.phoneNumber}</a>
                        </p>
                    )}

                    { person.emailAddress && (
                        <p className={styles.info}>
                            <FontAwesomeIcon icon='envelope' size='xs' className={styles.icon} />
                            <a className={styles.external}  href={`mailto:${person.emailAddress}`}>{person.emailAddress}</a>
                        </p>
                    )}

                    { hasDepartment && (
                        <h4 className={cx(styles.info, styles.department)}>
                            <GatsbyLink to={departmentTo} className={styles.internal}>
                                {person.department.title}
                                <FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} />
                            </GatsbyLink>
                        </h4>
                    )}

                    { hasBuilding && (
                        <p className={cx(styles.info, styles.building)}>
                            <GatsbyLink to={buildingTo} className={styles.internal}>
                                {person.building.title}
                                <FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} />
                            </GatsbyLink>
                        </p>
                    )}

                    { person.office && (
                        <p className={cx(styles.info, styles.office)}>{person.office}</p>
                    )}
                </figcaption>
            </figure>
        </section>
    )
}

export default ContactPerson