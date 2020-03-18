import React from 'react'
import styles from "./lead-image.module.scss";

const LeadImage = ({ title, fluid, file }, ...rest) => {
    return (
        <ImageWithSVGSupport className={styles.leadImage} title={title} fluid={fluid} file={file}  />
    )
}

export default LeadImage