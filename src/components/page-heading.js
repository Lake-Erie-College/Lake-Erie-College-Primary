import React from 'react'
import styles from "./page-heading.module.scss";

const PageHeading = ({ primary, secondary, overline }, ...rest) => {
    const hasOverline = typeof overline !== 'undefined'
    
    return (
        <h1 className={styles.pageHeading}>
            { hasOverline && (
                <strong className={styles.overline}>
                    {overline}
                </strong>
            )}
            <span>
                {primary}
                {secondary && (
                    <em> | {secondary}</em>
                )}
            </span>
        </h1>
    )
}

export default PageHeading