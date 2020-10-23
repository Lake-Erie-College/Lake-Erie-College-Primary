const Promise = require('bluebird')
const path = require('path')
const linkResolver = require('./src/utils').linkResolver

exports.createPages = ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions

    return new Promise((resolve, reject) => {
        const siteroot = path.resolve('./src/templates/site-root.js')
        const department = path.resolve('./src/templates/department.js')
        const standardpage = path.resolve('./src/templates/standard-page.js')
        const academicOffering = path.resolve(
            './src/templates/academic-offering.js'
        )
        const event = path.resolve('./src/templates/event.js')
        const location = path.resolve('./src/templates/location.js')
        const person = path.resolve('./src/templates/person.js')

        resolve(
            graphql(`
                {
                    allContentfulHomepage {
                        edges {
                            node {
                                slug
                                title
                            }
                        }
                    }
                    allContentfulDepartment {
                        edges {
                            node {
                                slug
                                title
                                hidden
                                category {
                                    slug
                                }
                            }
                        }
                    }
                    allContentfulStandardPage {
                        edges {
                            node {
                                title
                                slug
                                hidden
                                category {
                                    slug
                                }
                            }
                        }
                    }
                    allContentfulAcademicOffering {
                        edges {
                            node {
                                slug
                                title
                                hidden
                                category {
                                    slug
                                }
                            }
                        }
                    }
                    allContentfulLocation {
                        edges {
                            node {
                                title
                                slug
                                hidden
                                category {
                                    slug
                                }
                            }
                        }
                    }
                    allContentfulPerson {
                        edges {
                            node {
                                title
                                slug
                                hidden
                            }
                        }
                    }
                    allContentfulEvent {
                        edges {
                            node {
                                title
                                slug
                                hidden
                                category {
                                    slug
                                }
                            }
                        }
                    }
                    allContentfulPageRedirect {
                        edges {
                            node {
                                id
                                fromPath
                                isPermanent
                                toPath {
                                    ... on ContentfulAcademicOffering {
                                      id
                                      category {
                                        slug
                                      }
                                      slug
                                    }
                                    ... on ContentfulStandardPage {
                                      id
                                      category {
                                        slug
                                      }
                                      slug
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
                                      category {
                                        slug
                                      }
                                      slug
                                    }
                                }
                                externalUrl
                                statusCode
                            }
                        }
                    }
                }
            `).then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                const roots = result.data.allContentfulHomepage.edges
                const departments = result.data.allContentfulDepartment.edges
                const pages = result.data.allContentfulStandardPage.edges
                const offerings =
                    result.data.allContentfulAcademicOffering.edges
                const locations = result.data.allContentfulLocation.edges
                const people = result.data.allContentfulPerson.edges
                const events = result.data.allContentfulEvent.edges

                const redirects = result.data.allContentfulPageRedirect.edges

                roots.forEach((root, index) => {
                    let path = linkResolver.path(root.node)

                    createPage({
                        path: path,
                        component: siteroot,
                        context: {
                            slug: root.node.slug,
                        },
                    })
                })

                departments.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: department,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                pages.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: standardpage,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                offerings.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: academicOffering,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                locations.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: location,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                people.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: person,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                events.forEach((page, index) => {
                    if (page.node.hidden) {
                        return
                    }

                    let path = linkResolver.path(page.node)

                    createPage({
                        path: path,
                        component: event,
                        context: {
                            slug: page.node.slug,
                        },
                    })
                })

                redirects.forEach((redirect, index) => {
                    if (
                        redirect.node.fromPath === null ||
                        redirect.node.toPath === null
                    ) {
                        return
                    }

                    const path = redirect.node.externalUrl ? redirect.node.externalUrl : linkResolver.path(redirect.node.toPath)
                    const isPermanent = redirect.node.isPermanent !== null ? redirect.node.isPermanent : false

                    createRedirect({
                        fromPath: redirect.node.fromPath,
                        toPath: path,
                        isPermanent: isPermanent,
                        statusCode: redirect.node.statusCode
                    })
                })
            })
        )
    })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /@typeform/,
                        loader: 'null-loader',
                    },
                ],
            },
        })
    }
}
