import React from 'react'
import GatsbyImage from 'gatsby-image'

const ImageWithSVGSupport = ({ className, title, fluid, file }, ...rest) => {
    if (file.contentType === 'image/svg+xml') {
        return <img className={className} title={title} src={file.url} />
    }
    return (
        <GatsbyImage
            className={className}
            title={title}
            fluid={fluid}
            {...rest}
        />
    )
}

export default ImageWithSVGSupport