import React from 'react'
import GatsbyImage from 'gatsby-image'

const ImageWithSVGSupport = ({ svg, className, title, fluid, file, alt }, ...rest) => {
    if (file.contentType === 'image/svg+xml') {
        if (svg && svg.content) {
            // Inlined SVGs
            return <div className={className} dangerouslySetInnerHTML={{ __html: svg.content }} />
        }
        
        // SVGs that can/should not be inlined
        return <img className={className} title={title} src={file.url} alt={alt} />
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