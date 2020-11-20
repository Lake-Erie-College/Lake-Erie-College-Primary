import React from 'react'
import ImageWithSVGSupport from '../components/image-with-svg-support'
import styles from './lead-image.module.scss'

// Loading - Eager for Lighthouse Site Speed optimization

const LeadImage = ({ title, fluid, file, description }, ...rest) => {
    return (
        <div className={styles.leadImage}>
            <ImageWithSVGSupport
                className={styles.image}
                title={title}
                fluid={fluid}
                file={file}
                loading="eager"
                alt={description}
            />
        </div>
    )
}

export default LeadImage
