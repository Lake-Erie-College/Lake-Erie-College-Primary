import React from 'react'
import styles from "./related-content.module.scss";

export default ({ children }) => {
    return (
        <div className={styles.relatedContent}>
            {children}
        </div>
    )
}
