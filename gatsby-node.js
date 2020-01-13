const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const siteroot = path.resolve('./src/templates/site-root.js')
    const department = path.resolve('./src/templates/department.js')
    const standardpage = path.resolve('./src/templates/standard-page.js')

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
            }
          }
        }
        allContentfulStandardPage {
          edges {
            node {
              title
              slug
              category {
                slug
              }
            }
          }
        }
      }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const roots = result.data.allContentfulHomepage.edges
        const departments = result.data.allContentfulDepartment.edges
        const pages = result.data.allContentfulStandardPage.edges

        roots.forEach((root, index) => {
          createPage({
            path: `/`,
            component: siteroot,
            context: {
              slug: root.node.slug
            },
          })
        })

        departments.forEach((page, index) => {
          createPage({
            path: `/${page.node.slug}/`,
            component: department,
            context: {
              slug: page.node.slug
            },
          })
        })

        pages.forEach((page, index) => {
          if (page.node.category !== null) {
            if (page.node.category.slug !== `lake-erie-college`) {
              createPage({
                path: `/${page.node.category.slug}/${page.node.slug}/`,
                component: standardpage,
                context: {
                  slug: page.node.slug
                },
              })
            }
          } else {
            createPage({
              path: `/${page.node.slug}/`,
              component: standardpage,
              context: {
                slug: page.node.slug
              },
            })
          }
        })


      })
    )
  })
}
