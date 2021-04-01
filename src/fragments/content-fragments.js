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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    title
    description
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
}
`

export const _Person = graphql`
fragment Person on ContentfulPerson {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
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

export const _NavigationMenu = graphql`
fragment NavigationMenu on ContentfulNavigationMenu {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    title
    navigationItems {
        ...NavigationItem
    }
}`

export const _NavigationItem = graphql`
fragment NavigationItem on ContentfulNavigationItem {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    navigationSubmenu {
        contentful_id
        __typename
        id
        title
        navigationItems {
            contentful_id
            __typename
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
        }
    }
}`

export const _BlockExternalEmbed = graphql`
fragment BlockExternalEmbed on ContentfulBlockExternalEmbed {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    blackbaudFormId
    displayTitle
    pageIcon
    sourceHtml {
        sourceHtml
    }
    sourceUrl
    title
    simpleCheckoutPaymentId
    externalJavaScript
}`

export const _BlockSpotlightContent = graphql`
fragment BlockSpotlightContent on ContentfulBlockSpotlightContent {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
        ...BlockExternalEmbed
        ...NavigationItem
    }
    sys {
        type
        contentType {
            sys {
                type
            }
        }
    }
}`

export const _BlockAcademicOfferingListing = graphql`
fragment BlockAcademicOfferingListing on ContentfulBlockAcademicOfferingListing {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    relatedCategory {
        title
        slug
        shortTitle
    }
    title
    limit
    viewAll
}`

export const _BlockMediaWithCaption = graphql`
fragment BlockMediaWithCaption on ContentfulBlockMediaWithCaption {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    title
    callToAction
    externalMediaUrl
    image {
        ...Asset
    }
    internalLink {
      ...StandardPage
      ...Person
      ...Event
      ...AcademicOffering
      ...Department
    }
    externalUrl
    mediaCaption {
      mediaCaption
    }
    mediaHeading
  }`

export const _BlockPersonListing = graphql`
fragment BlockPersonListing on ContentfulBlockPersonListing {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    primaryHeading
    title
    relatedPeople {
      ...Person
    }
}`

export const _BlockQuote = graphql`
fragment BlockQuote on ContentfulBlockQuote {
    # contentful_id is required to resolve the references
    contentful_id
    __typename
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
    # contentful_id is required to resolve the references
    contentful_id
    __typename
    id
    title
    searchType
    primaryHeading
    summary {
        summary
    }
}`
