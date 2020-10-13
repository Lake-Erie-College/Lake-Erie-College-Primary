import { graphql } from 'gatsby'

export const _StandardPageUrl = graphql`
fragment StandardPageUrl on ContentfulStandardPage {
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

export const _AcademicOfferingUrl = graphql`
fragment AcademicOfferingUrl on ContentfulAcademicOffering {
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

export const _DepartmentUrl = graphql`
fragment DepartmentUrl on ContentfulDepartment {
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

export const _HomepageUrl = graphql`
fragment HomepageUrl on ContentfulHomepage {
    id
}
`

export const _PersonUrl = graphql`
fragment PersonUrl on ContentfulPerson {
    id
    slug
}
`

export const _LocationUrl = graphql`
fragment LocationUrl on ContentfulLocation {
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

export const _EventUrl = graphql`
fragment EventUrl on ContentfulEvent {
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