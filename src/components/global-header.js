import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import ImageWithSVGSupport from './image-with-svg-support'
import { Link as GatsbyLink } from 'gatsby'
import CallToAction from './call-to-action'
import TextLink from './text-link'
import NavigationPrimary from './navigation-primary'
import PrimaryContent from './primary-content'
import SearchBox from './search/search-box'
import styles from './global-header.module.scss'

const linkResolver = require('../utils').linkResolver

const GlobalHeader = () => {
    const data = useStaticQuery(graphql`
        {
            contentfulSiteSettings(slug: { eq: "global-site-settings" }) {
                id
                headerLogo {
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
                siteAnnouncement {
                    raw
                }
                navigationConversions {
                    id
                    navigationItems {
                        ...NavigationItem
                    }
                }
            }
        }
    `)

    const page = get(data, 'contentfulSiteSettings')

    const announcement =
        typeof page.siteAnnouncement !== 'undefined'
            ? page.siteAnnouncement
            : false

    const navigationConversionItems = get(
        page,
        'navigationConversions.navigationItems'
    )

    const NavigationItem = ({ link, className }) => {
        const isExternal =
            typeof link.externalUrl !== 'undefined' && link.externalUrl !== null
        const isEmbed =
            typeof link.sourceUrl !== 'undefined' && link.sourceUrl !== null
        const name = link.displayTitle ? link.displayTitle : link.title
        const url = link.externalUrl
        const node = link.internalLink
        const media = link.internalMedia

        const to = !url ? linkResolver.path(node) : url

        return (
            <li key={link.id} className={styles.ctaLink}>
                {isExternal && <TextLink children={name} uri={to} />}
                {!isExternal && node && <TextLink children={name} node={to} />}
                {isEmbed && <TextLink children={name} formUrl={link.sourceUrl} />}
                {!isExternal && node === null && media && (
                    <TextLink children={name} uri={media.file.url} />
                )}
            </li>
        )
    }

    return (
        <header className={styles.globalHeader}>
            {announcement && (
                <div className={styles.announcement}>
                    <PrimaryContent data={announcement} isFullWidth={true} />
                </div>
            )}

            {typeof navigationConversionItems !== 'undefined' && (
                <nav
                    className={styles.ctas}
                    role="navigation"
                    aria-label="header-cta-navigation"
                >
                    <ul className={styles.ctaList}>
                        {navigationConversionItems.map(link => (
                            <NavigationItem
                                key={`header-nav-cta-${link.id}`}
                                link={link}
                            />
                        ))}
                    </ul>
                </nav>
            )}

            <div className={styles.logo}>
                <GatsbyLink to={`/`} aria-label={`Navigate to the Homepage`}>
                    <ImageWithSVGSupport
                        title={page.headerLogo.title}
                        fluid={page.headerLogo.fluid}
                        file={page.headerLogo.file}
                        svg={page.headerLogo.svg}
                        alt={page.headerLogo.description}
                    />
                </GatsbyLink>
            </div>
            <nav
                className={styles.primaryNavigation}
                aria-label="Primary Navigaiton"
            >
                <NavigationPrimary />
            </nav>
            <div className={styles.search}>
                <SearchBox />
            </div>
        </header>
    )
}

export default GlobalHeader
