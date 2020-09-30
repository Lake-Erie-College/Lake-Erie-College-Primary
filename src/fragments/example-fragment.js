import { graphql } from 'gatsby'

export const _ContentfulImage = graphql`
  fragment ContentfulImage on ContentfulAsset {
    file {
      url
      fileName
    }
    title
    description
    sizes(maxWidth: 1200, quality: 75) {
      ...GatsbyContentfulSizes_withWebp
    }
    fluid {
      ...GatsbyContentfulFluid_withWebp
    }
  }
`

export const _ContentfulImage100px = graphql`
  fragment ContentfulImage100px on ContentfulAsset {
    title
    file {
      url
      fileName
    }
    description
    sizes(maxWidth: 100, quality: 75) {
      ...GatsbyContentfulSizes_withWebp
    }
  }
`

export const _Asset = graphql`
fragment Asset on ContentfulAsset {
    id
    title
    svg {
      content
      dataURI
      absolutePath
      relativePath
    }
    file {
      contentType
      url
      fileName
      details {
        image {
          height
          width
        }
      }
    }
    sizes(maxWidth: 1200, quality: 75) {
      ...GatsbyContentfulSizes_withWebp
    }
    fluid {
      ...GatsbyContentfulFluid_withWebp
    }
    description
  }
`

export const _StandardPage = graphql`
fragment StandardPage on ContentfulStandardPage {
    id
    category {
        category {
            slug
        }
        slug
    }
    slug
}
`

export const _AcademicOffering = graphql`
fragment AcademicOffering on ContentfulAcademicOffering {
    id
    category {
        category {
            slug
        }
        slug
    }
    slug
}
`

export const _Department = graphql`
fragment Department on ContentfulDepartment {
    id
    category {
        category {
            slug
        }
        slug
    }
    slug
}
`

export const _Homepage = graphql`
fragment Homepage on ContentfulHomepage {
    id
}
`

export const _Person = graphql`
fragment Person on ContentfulPerson {
    id
    slug
    department {
        category {
          slug
        }
        shortTitle
        slug
        title
      }
      emailAddress
      firstName
      headshot {
            title
            file {
                contentType
                details {
                    image {
                        height
                        width
                    }
                }
                fileName
                url
            }
            fluid {
                ...GatsbyContentfulFluid_withWebp
            }
      }
      jobTitles {
        jobTitles
      }
      lastName
      office
      personType
      phoneNumber
      preferredFullName
      shortTitle
      title
}
`

export const _Location = graphql`
fragment Location on ContentfulLocation {
    id
    title
    shortTitle
    summary {
        summary
    }
    category {
        category {
            slug
        }
        slug
    }
    slug
    photo {
        ...Asset
    }
}
`

export const _Event = graphql`
fragment Event on ContentfulEvent {
    id
    category {
        category {
            slug
        }
        slug
    }
    slug
}
`

export const _NavigationItem = graphql`
fragment NavigationItem on ContentfulNavigationItem {
    id
    title
    internalLink {
      ...AcademicOffering
      ...Department
      ...Homepage
      ...Location
      ...Person
      ...Event
      ...StandardPage
    }
    externalUrl
    internalMedia {
        ...Asset
    }
    displayTitle
    pageIcon
    newWindow
}`

export const _BlockExternalEmbed = graphql`
fragment BlockExternalEmbed on ContentfulBlockExternalEmbed {
    id
    blackbaudFormId
    displayTitle
    pageIcon
    sourceHtml {
        sourceHtml
    }
    sourceUrl
    title
    externalJavaScript
}`

export const _BlockSpotlightContent = graphql`
fragment BlockSpotlightContent on ContentfulBlockSpotlightContent {
    id
    callToAction
    displayStyle
    externalLink
    internalLink {
        slug
    }
    primaryHeading
    primaryImage {
        ...Asset
    }
    relatedMedia {
        ...Asset
    }
    secondaryHeading
    title
    summary {
        summary
    }
    relatedPages {
        ...AcademicOffering
        ...BlockExternalEmbed
        ...NavigationItem
        ...Person
    }
    sys {
        type
        contentType {
            sys {
                type
                contentful_id
            }
        }
    }
}`

export const _BlockAcademicOfferingListing = graphql`
fragment BlockAcademicOfferingListing on ContentfulBlockAcademicOfferingListing {
    id
    relatedAcademicCategory {
        slug
        category {
            slug
        }
    }
    offeringType
}`

export const _BlockCarousel = graphql`
fragment BlockCarousel on ContentfulBlockCarousel {
    id
    displayArrows
    displayDots
    title
    relatedMedia {
        ...BlockMediaWithCaption
    }
    relatedImages {
        ...Asset
    }
}`

export const _BlockEventListing = graphql`
fragment BlockEventListing on ContentfulBlockEventListing {
    id
    relatedCategory {
        slug
    }
    title
    viewAll
}`

export const _BlockMediaWithCaption = graphql`
fragment BlockMediaWithCaption on ContentfulBlockMediaWithCaption {
    id
    title
    callToAction
    externalMediaUrl
    image {
        title
        file {
            contentType
            details {
                image {
                    height
                    width
                }
            }
            fileName
            url
        }
        fluid {
            ...GatsbyContentfulFluid_withWebp
        }
    }
    internalLink {
      ...StandardPage
      ...Person
      ...Event
      ...AcademicOffering
    }
    mediaCaption {
      mediaCaption
    }
    mediaHeading
  }`

export const _BlockPersonListing = graphql`
fragment BlockPersonListing on ContentfulBlockPersonListing {
    id
    primaryHeading
    title
    relatedPeople {
      ...Person
    }
}`

export const _BlockQuote = graphql`
fragment BlockQuote on ContentfulBlockQuote {
    id
    associatedMedia {
        title
        file {
            contentType
            details {
                image {
                    height
                    width
                }
            }
            fileName
            url
        }
        fluid {
            ...GatsbyContentfulFluid_withWebp
        }
    }
    displayType
    personName
    quoteCopy {
      quoteCopy
    }
    quoteHeading
    title
}`

export const _BlockSearchResults = graphql`
fragment BlockSearchResults on ContentfulBlockSearchResults {
    id
    title
}`
