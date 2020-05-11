import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import ImageWithSVGSupport from './image-with-svg-support'
import { Link as GatsbyLink } from 'gatsby'
import NavigationPrimary from './navigation-primary'
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
            }
        }
    `)

    const page = get(data, 'contentfulSiteSettings')

    const searchIndices = [
        { name: `prod_LEC_Content`, title: `Pages`, hitComp: `PageHit` },
        // { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
    ]

    return (
        <header className={styles.globalHeader}>
            <div className={styles.logo}>
                <GatsbyLink to={`/`} aria-label={`Navigate to the Homepage`}>
                    <ImageWithSVGSupport
                        title={page.headerLogo.title}
                        fluid={page.headerLogo.fluid}
                        file={page.headerLogo.file}
                        svg={page.headerLogo.svg}
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
            </div>
        </header>
    )
}

export default GlobalHeader
