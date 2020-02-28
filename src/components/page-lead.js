import React from 'react'
import cx from "classnames";
import styles from "./page-lead.module.scss";

// let className = cx(styles.base, {
//   [styles.clickable]: this.props.clickable,
//   [styles.withIcon]: !!this.props.icon
// });

export default ( {content} ) => (
    <section className={styles.pageLead}>
        <p className={styles.content}>{content}</p>
    </section>
)