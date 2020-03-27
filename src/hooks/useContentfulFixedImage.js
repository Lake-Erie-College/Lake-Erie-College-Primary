// useContentfulFixedImage.js
import { graphql, useStaticQuery } from "gatsby";

export default assetUrl => {
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query CONTENTFUL_IMAGE_FIXED_QUERY {
        allContentfulAsset(filter: {file: {url: {ne: ""}}}) {
          nodes {
            file {
              url
            }
            fixed(width: 1200, height: 630, cropFocus: FACES) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    `
  );
  return allContentfulAsset.nodes.find(n => n.file.url === assetUrl).fixed;
};