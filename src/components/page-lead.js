import React from 'react'
import styles from "./page-lead.module.scss";

export default ( {content} ) => (
    <section className={styles.pageLead}>
        <h2 className={styles.content}>{content}</h2>
    </section>
)