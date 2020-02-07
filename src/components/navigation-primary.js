import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import get from 'lodash/get'

const NavigationPrimary = () => {
    const data = useStaticQuery(graphql`
    {
        contentfulSiteSettings(slug: {eq: "global-site-settings"}) {
            navigationPrimary {
                id
                navigationItems {
                    id
                    title
                    newWindow
                    externalUrl
                    internalLink {
                        ... on ContentfulAcademicOffering {
                          id
                          slug
                        }
                        ... on ContentfulDepartment {
                          id
                          slug
                        }
                        ... on ContentfulEvent {
                          id
                          slug
                        }
                        ... on ContentfulHomepage {
                          id
                          slug
                        }
                        ... on ContentfulLocation {
                          id
                          slug
                        }
                        ... on ContentfulPerson {
                          id
                          slug
                        }
                        ... on ContentfulStandardPage {
                          id
                          slug
                        }
                    }
                    navigationSubmenu {
                        id
                        title
                        navigationItems {
                            id
                            title
                            newWindow
                            externalUrl
                            internalLink {
                                ... on ContentfulAcademicOffering {
                                  id
                                  slug
                                }
                                ... on ContentfulDepartment {
                                  id
                                  slug
                                }
                                ... on ContentfulEvent {
                                  id
                                  slug
                                }
                                ... on ContentfulHomepage {
                                  id
                                  slug
                                }
                                ... on ContentfulLocation {
                                  id
                                  slug
                                }
                                ... on ContentfulPerson {
                                  id
                                  slug
                                }
                                ... on ContentfulStandardPage {
                                  id
                                  slug
                                }
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
            <li key={link.id}>
                {link.title}
            </li>
        )
    }

    return (
        <nav role="navigation" aria-label='primary-navigation'>
            <ul>
              { navigationItems.map(( link ) => <NavigationItem key={link.id} link={link} className='test' />) }
            </ul>
        </nav>
    )
}

export default NavigationPrimary