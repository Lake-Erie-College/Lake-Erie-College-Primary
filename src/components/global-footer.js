import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import ImageWithSVGSupport from './image-with-svg-support'
import { Link as GatsbyLink } from "gatsby"
import CallToAction from './call-to-action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from './global-footer.module.scss'

const linkResolver = require('../utils').linkResolver

const GlobalFooter = () => {
    const data = useStaticQuery(graphql`
    {
        contentfulSiteSettings(slug: {eq: "global-site-settings"}) {
            id
            footerLogo {
                title
                fluid(maxWidth: 1080) {
                    ...GatsbyContentfulFluid_withWebp
                }
                file {
                  url
                  contentType
                }
                ... on ContentfulAsset {
                    svg {
                        content # SVG content optimized with SVGO
                        dataURI # Optimized SVG as compact dataURI
                        absolutePath #
                        relativePath #
                    }
                }
            }
            footerImage {
                title
                fluid(maxWidth: 1080) {
                    ...GatsbyContentfulFluid_withWebp
                }
                file {
                  url
                  contentType
                }
                ... on ContentfulAsset {
                    svg {
                        content # SVG content optimized with SVGO
                        dataURI # Optimized SVG as compact dataURI
                        absolutePath #
                        relativePath #
                    }
                }
            }
            facebook
            snapchat
            twitter
            instagram
            city
            socialHashtag
            state
            streetAddress1
            primaryPhone
            postalCode
            navigationConversions {
                id
                navigationItems {
                    id
                    title
                    externalUrl
                    internalLink {
                        __typename
                        ... on Node {
                            ... on ContentfulAcademicOffering {
                                id
                                slug
                                category {
                                slug
                                }
                            }
                            ... on ContentfulDepartment {
                                id
                                slug
                                category {
                                slug
                                }
                            }
                            ... on ContentfulEvent {
                                id
                                slug
                                category {
                                slug
                                }
                            }
                            ... on ContentfulHomepage {
                                id
                                slug
                            }
                            ... on ContentfulLocation {
                                id
                                slug
                                category {
                                slug
                                }
                            }
                            ... on ContentfulPerson {
                                id
                                slug
                            }
                            ... on ContentfulStandardPage {
                                id
                                slug
                                category {
                                slug
                                }
                            }
                        }
                    }
                }
            }
            navigationFooter {
                id
                navigationItems {
                    id
                    title
                    externalUrl
                    internalLink {
                        ... on ContentfulAcademicOffering {
                            id
                            slug
                            category {
                            slug
                            }
                        }
                        ... on ContentfulDepartment {
                            id
                            slug
                            category {
                            slug
                            }
                        }
                        ... on ContentfulEvent {
                            id
                            slug
                            category {
                            slug
                            }
                        }
                        ... on ContentfulHomepage {
                            id
                            slug
                        }
                        ... on ContentfulLocation {
                            id
                            slug
                            category {
                            slug
                            }
                        }
                        ... on ContentfulPerson {
                            id
                            slug
                        }
                        ... on ContentfulStandardPage {
                            id
                            slug
                            category {
                            slug
                            }
                        }
                    }
                }
            }
        }
    }
    `)

    const page = get(data, 'contentfulSiteSettings')
    const navigationConversionItems = get(page, 'navigationConversions.navigationItems')
    const navigationFooterItems = get(page, 'navigationFooter.navigationItems')


    const NavigationCTAItem = ({link, className}) => {
        const isExternal = typeof link.externalUrl !== 'undefined' && link.externalUrl !== null;

        return (
            <li key={link.id}>
                {isExternal && (
                    <CallToAction name={link.title} url={link.externalUrl} />
                )}
                {!isExternal && (
                    <CallToAction name={link.title} node={link.internalLink} />
                )}
            </li>
        )
    }

    const NavigationItem = ({link, className}) => {
        const isExternal = typeof link.externalUrl !== 'undefined' || link.externalUrl !== null;
        const name = link.title
        const url = link.externalUrl
        const node = link.internalLink

        const to = !url ? linkResolver.path(node) : url

        return (
            <li key={link.id}>
                {isExternal && (
                    <a href={to} rel='external'>{name}</a>
                )}
                {!isExternal && (
                    <GatsbyLink to={to}>
                        {name}
                    </GatsbyLink>
                )}
            </li>
        )
    }

    return (
        <footer className={styles.globalFooter}>
            <div className={styles.map} >
                <ImageWithSVGSupport title={page.footerImage.title} fluid={page.footerImage.fluid} file={page.footerImage.file} svg={page.footerImage.svg} />
            </div>

            {typeof navigationConversionItems !== 'undefined' && (
            <nav className={styles.navigation} role="navigation" aria-label='footer-navigation'>
                <ul className={styles.conversionLinks}>
                    { navigationConversionItems.map(( link ) => <NavigationCTAItem key={`footer-nav-cta-${link.id}`} link={link} className='test' />) }
                </ul>
                {navigationFooterItems && (
                    <ul className={styles.navigationLinks}>
                        { navigationFooterItems.map(( link ) => <NavigationItem key={`footer-nav-link-${link.id}`} link={link} className='test' />) }
                    </ul>
                )}
            </nav>
            )}

            <div className={styles.logo}>
                <ImageWithSVGSupport title={page.footerLogo.title} fluid={page.footerLogo.fluid} file={page.footerLogo.file} svg={page.footerLogo.svg} />
            </div>

            <section className={styles.contact}>
                <p className={styles.telephone}><a href={`tel:${page.primaryPhone}`}>{page.primaryPhone}</a></p> 
                <p className={styles.address}>
                    <span>{page.streetAddress1}</span>,
                    <span> {page.city}</span>,
                    <span> {page.state}</span>,
                    <span> {page.postalCode}</span>
                </p>
            
                <nav className={styles.socialNav} aria-label='footer-social-navigation'>
                    <ul>
                        <li>
                            <a href={page.facebook} aria-label="Facebook">
                                <FontAwesomeIcon icon={['fab', 'facebook']} size='2x' aria-hidden='true' />
                                <span>Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href={page.twitter} aria-label="Twitter">
                                <FontAwesomeIcon icon={['fab', 'twitter']} size='2x' aria-hidden='true' />
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href={page.instagram} aria-label="Instagram">
                                <FontAwesomeIcon icon={['fab', 'instagram']} size='2x' aria-hidden='true' />
                                <span>Instagram</span>
                            </a>
                        </li>
                        <li>
                            <a href={page.snapchat} aria-label="Snapchat">
                                <FontAwesomeIcon icon={['fab', 'snapchat']} size='2x' aria-hidden='true' />
                                <span>Snapchat</span>
                            </a>
                        </li>
                    </ul>
                    <p>{page.socialHashtag}</p>
                </nav>
            </section>
        </footer>
    )
}

export default GlobalFooter