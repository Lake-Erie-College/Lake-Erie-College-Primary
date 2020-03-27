// useContentfulImage.js
import { graphql, useStaticQuery } from 'gatsby'

export default assetUrl => {
    const { allContentfulAsset } = useStaticQuery(
        graphql`
            query CONTENTFUL_IMAGE_QUERY {
                allContentfulAsset(filter: { file: { url: { ne: "" } } }) {
                    nodes {
                        file {
                            url
                        }
                        fluid(maxWidth: 1050, quality: 85) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                }
            }
        `
    )

    function isMatchedUrl(element, index, array) {
        if (typeof element.file !== 'undefined' && element.file !== null) {
            return element.file.url === assetUrl
        } else {
            return false
        }
    }

    return allContentfulAsset.nodes.find(isMatchedUrl).fluid
}