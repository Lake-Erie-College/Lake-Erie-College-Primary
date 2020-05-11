import React from 'react'
import styles from "./page-lead.module.scss";

export default ( {content} ) => (
    <section className={styles.pageLead}>
        <p className={styles.content}>{content}</p>
    </section>
)