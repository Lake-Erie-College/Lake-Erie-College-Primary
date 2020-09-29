// Example Only

const pageQuery = `{
    pages: allContentfulStandardPage(filter: {hidden: {ne: true}}) {
        edges {
            node {
                id
                sys {
                  contentType {
                    sys {
                      contentful_id
                    }
                  }
                }
                description {
                    description
                }
                category {
                    title
                    shortTitle
                    slug
                }
                hidden
                lead {
                    lead
                }
                isNews
                leadImage {
                    file {
                        url
                    }
                }
                primaryHeading
                secondaryHeading
                shortTitle
                slug
                title
                primaryContent {
                  id
                }
            }
        }
    }
    people: allContentfulPerson(filter: {hidden: {ne: true}}) {
        edges {
            node {
                id
                sys {
                  contentType {
                    sys {
                      contentful_id
                    }
                  }
                }
                firstName
                headshot {
                    file {
                        url
                    }
                }
                emailAddress
                jobTitles {
                    jobTitles
                }
                department {
                    title
                    shortTitle
                    slug
                }
                office
                personType
                phoneNumber
                shortTitle
                slug
                title
                hidden
            }
        }
    }
    locations: allContentfulLocation(filter: {hidden: {ne: true}}) {
        edges {
          node {
            id
            sys {
              contentType {
                sys {
                  contentful_id
                }
              }
            }
            hidden
            category {
              title
              slug
              shortTitle
            }
            description {
              description
            }
            primaryContent {
              id
            }
            shortTitle
            slug
            title
          }
        }
      }
    events: allContentfulEvent(filter: {hidden: {ne: true}}) {
        edges {
          node {
            id
            sys {
              contentType {
                sys {
                  contentful_id
                }
              }
            }
            campusLocation {
              shortTitle
              slug
              title
              hidden
            }
            description {
              description
            }
            category {
                title
                shortTitle
                slug
            }
            hidden
            endDateAndTime
            startDateAndTime
            slug
            shortTitle
            primaryContent {
              id
            }
            title
          }
        }
      }
      departments: allContentfulDepartment(filter: {hidden: {ne: true}}) {
        edges {
          node {
            id
            sys {
              contentType {
                sys {
                  contentful_id
                }
              }
            }
            hidden
            department {
                title
                shortTitle
                slug
            }
            description {
              description
            }
            lead {
              lead
            }
            leadImage {
              file {
                url
              }
            }
            primaryContent {
              id
            }
            primaryEmail
            primaryPhone
            shortTitle
            slug
            title
          }
        }
      }
      offerings: allContentfulAcademicOffering(filter: {hidden: {ne: true}}) {
        edges {
          node {
            id
            sys {
              contentType {
                sys {
                  contentful_id
                }
              }
            }
            lead {
              lead
            }
            primaryContent {
              id
            }
            category {
                title
                shortTitle
                slug
            }
            description {
              description
            }
            hidden
            offeringType
            relatedOfferings {
              title
              shortTitle
              offeringType
              primaryContent {
                id
              }
              lead {
                lead
              }
            }
            relatedOfferingsHeading
            shortTitle
            slug
            title
          }
        }
      }
}`


const offeringQuery = `{
      offerings: allContentfulAcademicOffering(filter: {hidden: {ne: true}}) {
        edges {
          node {
            id
            sys {
              contentType {
                sys {
                  contentful_id
                }
              }
            }
            lead {
              lead
            }
            primaryContent {
              id
            }
            category {
                title
                shortTitle
                slug
            }
            description {
              description
            }
            hidden
            offeringType
            relatedOfferings {
              title
              shortTitle
              offeringType
              primaryContent {
                id
              }
              lead {
                lead
              }
            }
            relatedOfferingsHeading
            shortTitle
            slug
            title
          }
        }
      }
}`

/* const flatten = arr =>
    arr.map(({ node: { frontmatter, ...rest } }) => ({
        ...frontmatter,
        ...rest,
    }))
    */

const flatten = arr => arr.map(({ node: { ...rest } }) => ({ ...rest }))

const flattenMultiple = (data) => {
    let arr = []
    if (data.pages) {
        arr = arr.concat(flatten(data.pages.edges))
    }
    if (data.people) {
        arr = arr.concat(flatten(data.people.edges))
    }
    if (data.locations) {
        arr = arr.concat(flatten(data.locations.edges))
    }
    if (data.events) {
        arr = arr.concat(flatten(data.events.edges))
    }
    if (data.departments) {
        arr = arr.concat(flatten(data.departments.edges))
    }
    if (data.offerings) {
        arr = arr.concat(flatten(data.offerings.edges))
    }
    return arr
}

const settings = { attributesToSnippet: [`description:200`] }

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }) => flattenMultiple(data),
        indexName: `prod_LEC_Pages`,
        settings,
    },
    {
        query: offeringQuery,
        transformer: ({ data }) => flattenMultiple(data),
        indexName: `prod_LEC_Offerings`,
        settings,
    },
]

module.exports = queries

/*
allContentfulPerson {
    edges {
      node {
        id
        firstName
        headshot {
          file {
            url
          }
        }
        emailAddress
        jobTitles {
          jobTitles
        }
        office
        personType
        phoneNumber
        shortTitle
        slug
        title
        hidden
      }
    }
  }
  allContentfulLocation {
    edges {
      node {
        id
        category {
          title
          slug
          shortTitle
        }
        description {
          description
        }
        primaryContent {
          json
        }
        shortTitle
        slug
        title
      }
    }
  }
  allContentfulEvent {
    edges {
      node {
        id
        campusLocation {
          shortTitle
          slug
          title
          hidden
        }
        description {
          description
        }
        hidden
        endDateAndTime
        startDateAndTime
        slug
        shortTitle
        primaryContent {
          json
        }
        title
      }
    }
  }
  allContentfulDepartment {
    edges {
      node {
        id
        hidden
        description {
          description
        }
        lead {
          lead
        }
        leadImage {
          file {
            url
          }
        }
        primaryContent {
          json
        }
        primaryEmail
        primaryPhone
        shortTitle
        slug
        title
        department {
          shortTitle
          title
          description {
            description
          }
        }
      }
    }
  }
  allContentfulAcademicOffering {
    edges {
      node {
        id
        lead {
          lead
        }
        primaryContent {
          json
        }
        description {
          description
        }
        hidden
        offeringType
        relatedOfferings {
          title
          shortTitle
          offeringType
          primaryContent {
            json
          }
          lead {
            lead
          }
        }
        relatedOfferingsHeading
        shortTitle
        slug
        title
      }
    }
  }
  */