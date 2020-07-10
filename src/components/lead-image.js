import React from 'react'
import ImageWithSVGSupport from '../components/image-with-svg-support'
import styles from "./lead-image.module.scss";

// Loading - Eager for Lighthouse Site Speed optimization

const LeadImage = ({ title, fluid, file }, ...rest) => {
    return (
        <ImageWithSVGSupport className={styles.leadImage} title={title} fluid={fluid} file={file} loading='eager' />
    )
}

export default LeadImage