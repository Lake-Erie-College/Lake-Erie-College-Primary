const Promise = require('bluebird')
const path = require('path')
const linkResolver = require('./src/utils').linkResolver

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
              hidden
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
          let path = linkResolver.path(root.node)

          createPage({
            path: path,
            component: siteroot,
            context: {
              slug: root.node.slug
            },
          })
        })

        departments.forEach((page, index) => {
          let path = linkResolver.path(page.node)

          createPage({
            path: path,
            component: department,
            context: {
              slug: page.node.slug
            },
          })
        })

        pages.forEach((page, index) => {
          let path = linkResolver.path(page.node)

          createPage({
            path: path,
            component: standardpage,
            context: {
              slug: page.node.slug
            },
          })
        })


      })
    )
  })
}
