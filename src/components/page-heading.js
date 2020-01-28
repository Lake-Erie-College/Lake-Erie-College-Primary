import React from 'react'
import cx from "classnames";
import styles from "./page-heading.module.scss";

// let className = cx(styles.base, {
//   [styles.clickable]: this.props.clickable,
//   [styles.withIcon]: !!this.props.icon
// });

export default ( props ) => (
    <h1 className={styles.pageHeading}>
        <span>
        {props.primary}
        {props.secondary && (
            <em> | {props.secondary}</em>
        )}
        </span>
    </h1>
  )