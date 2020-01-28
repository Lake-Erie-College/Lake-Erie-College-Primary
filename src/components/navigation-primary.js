import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'

const NavigationPrimary = () => {
    const data = useStaticQuery(graphql`
    {
        contentfulSiteSettings(slug: {eq: "global-site-settings"}) {
        navigationPrimary {
            title
            navigationItems {
            title
            newWindow
            externalUrl
            internalLink {
                title
                slug
            }
            navigationSubmenu {
                title
                navigationItems {
                title
                newWindow
                externalUrl
                internalLink {
                    slug
                    title
                }
                }
            }
            }
        }
        }
    }
    `)

    const navigationItems = get(data, 'contentfulSiteSettings.navigationPrimary.navigationItems')

    // <pre>{JSON.stringify(navigationItems, null, 4)}</pre>
    
    const NavigationItem = ({link, className}) => {
        let submenuItems = get(link, 'navigationSubmenu.navigationItems')
    
        return (
            <li key={link.title}>
                {link.title}
            </li>
        )
    }

    return (
        <nav>
            <ul>
              { navigationItems.map(( link ) => <NavigationItem link={link} className='test' />) }
            </ul>
        </nav>
    )
}

export default NavigationPrimary