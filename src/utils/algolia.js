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
                    raw
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
                    raw
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
                    raw
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
                    raw
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
                    raw
                }
                category {
                    title
                    shortTitle
                    slug
                }
                description {
                    description
                }
                summary {
                    summary
                }
                hidden
                offeringType
                relatedOfferings {
                    title
                    shortTitle
                    offeringType
                    description {
                        description
                    }
                    summary {
                        summary
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
                    raw
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
                    lead {
                        lead
                    }
                    description {
                        description
                    }
                    summary {
                        summary
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

const peopleQuery = `{
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
}`

const flatten = arr => arr.map(({ node: { ...rest } }) => ({ ...rest }))

// Algolia size limits hit with extraneous text in RAW content
// Cannot easily translate to JSON objects
const cleanContent = arr =>
    arr.map(({ primaryContent, ...rest }) => {
        let obj = {}

        if (
            typeof primaryContent !== 'undefined' &&
            primaryContent !== null &&
            primaryContent.raw !== null
        ) {
            primaryContent.raw = primaryContent.raw.split('"data"').join('')
            primaryContent.raw = primaryContent.raw.split('"content"').join('')
            primaryContent.raw = primaryContent.raw.split('"value"').join('')
            primaryContent.raw = primaryContent.raw.split('"nodeType"').join('')
            primaryContent.raw = primaryContent.raw.split('"text"').join('')
            primaryContent.raw = primaryContent.raw.split('"marks"').join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-1"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-2"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-3"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-4"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-5"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"heading-6"')
                .join('')
            primaryContent.raw = primaryContent.raw
                .split('"paragraph"')
                .join('')
            primaryContent.raw = primaryContent.raw.split('"document"').join('')
            primaryContent.raw = primaryContent.raw.split('\\').join('')
            primaryContent.raw = primaryContent.raw.split(':').join('')
            primaryContent.raw = primaryContent.raw.split('{').join('')
            primaryContent.raw = primaryContent.raw.split('}').join('')
            primaryContent.raw = primaryContent.raw.split('[').join('')
            primaryContent.raw = primaryContent.raw.split(']').join('')
            primaryContent.raw = primaryContent.raw.split('"').join(' ')
        }

        obj = { primaryContent, ...rest }

        return obj
    })

const flattenMultiple = data => {
    let arr = []
    if (data.pages) {
        arr = arr.concat(cleanContent(flatten(data.pages.edges)))
    }
    if (data.people) {
        arr = arr.concat(flatten(data.people.edges))
    }
    if (data.locations) {
        arr = arr.concat(cleanContent(flatten(data.locations.edges)))
    }
    if (data.events) {
        arr = arr.concat(cleanContent(flatten(data.events.edges)))
    }
    if (data.departments) {
        arr = arr.concat(cleanContent(flatten(data.departments.edges)))
    }
    if (data.offerings) {
        arr = arr.concat(cleanContent(flatten(data.offerings.edges)))
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
    {
        query: peopleQuery,
        transformer: ({ data }) => flattenMultiple(data),
        indexName: `prod_LEC_People`,
        settings,
    },
]

module.exports = queries