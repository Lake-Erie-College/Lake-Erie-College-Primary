import React from 'react'
import cx from "classnames"
import Image from "gatsby-image"
import { Link as GatsbyLink } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const linkResolver = require('../utils').linkResolver

import styles from "./contact-person.module.scss";

const ContactPerson = ({ heading, person }, ...rest) => {
    const hasOverline = typeof overline !== 'undefined'
    const headingContact = typeof heading !== 'undefined' ? heading : 'For more information…'
    const fullName = person.preferredFullName !== null ? person.preferredFullName : `${person.firstName} ${person.lastName}`
          
    const personTo = linkResolver.path(person)
    const departmentTo = linkResolver.path(person.department)
    const buildingTo = linkResolver.path(person.department)
    
    return (
        <section className={styles.contactPerson}>
            <h2 className={styles.heading}>{headingContact}</h2>
            <figure className={styles.person}>
                <Image className={styles.image} title={`Photo of ${fullName}`} fluid={person.headshot.fluid} />
                <figcaption className={styles.details}>
                    <h3 className={styles.name}>
                        <GatsbyLink to={personTo} className={styles.internal}>
                            {fullName}
                        </GatsbyLink>
                    </h3>
                    <p className={styles.jobTitle}>{person.jobTitles.jobTitles}</p>
                    <p className={styles.info}>
                        <FontAwesomeIcon icon='phone' size='xs' className={styles.icon} />
                        <a className={styles.external} href={`tel:${person.phoneNumber}`}>{person.phoneNumber}</a>
                    </p>
                    <p className={styles.info}>
                        <FontAwesomeIcon icon='envelope' size='xs' className={styles.icon} />
                        <a className={styles.external}  href={`mailto:${person.emailAddress}`}>{person.emailAddress}</a>
                    </p>
                    <h4 className={cx(styles.info, styles.department)}>
                        <GatsbyLink to={departmentTo} className={styles.internal}>
                            {person.department.title}
                            <FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} />
                        </GatsbyLink>
                    </h4>
                    <p className={cx(styles.info, styles.building)}>
                        <GatsbyLink to={buildingTo} className={styles.internal}>
                            {person.building.title}
                            <FontAwesomeIcon icon='external-link-square-alt' size='xs' className={styles.icon} />
                        </GatsbyLink>
                    </p>
                    <p className={cx(styles.info, styles.office)}>{person.office}</p>
                </figcaption>
            </figure>
        </section>
    )
}

export default ContactPerson