import React from 'react'
import GatsbyImage from "gatsby-image"

const ImageWithSVGSupport = ({ title, fluid, file }, ...rest) => {
  if (file.contentType === 'image/svg+xml') {
    return <img title={title} src={file.url} />
  }
  return <GatsbyImage title={title} fluid={fluid} {...rest} />
}

export default ImageWithSVGSupport