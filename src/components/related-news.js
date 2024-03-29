import React, { useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import cx from 'classnames'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import take from 'lodash/take'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './related-news.module.scss'

const linkResolver = require('../utils').linkResolver

import CallToAction from './call-to-action'

const NewsHeadingWithLink = ({ heading, overline, to }) => {
    return (
        <GatsbyLink to={to} className={cx(styles.internal, styles.news)}>
            <header className={styles.header}>
                <h3 className={styles.newsHeading}>
                    {heading}
                    <nobr>
                        <FontAwesomeIcon
                            icon="external-link-square-alt"
                            size="xs"
                            className={styles.icon}
                        />
                    </nobr>
                </h3>
                {overline && <p className={styles.overline}>{overline}</p>}
            </header>
        </GatsbyLink>
    )
}

const News = ({ newsItem }) => {
    const isHidden =
        typeof newsItem.hidden !== 'undefined' && newsItem.hidden === true

    const newsTo = !isHidden ? linkResolver.path(newsItem) : null
    const newsTitle =
        typeof newsItem.shortTitle !== 'undefined'
            ? newsItem.title
            : newsItem.title
    const momentStartDate = moment(newsItem.publishDate)

    const newsOverline = `${momentStartDate.format('MMMM DD, YYYY')}`

    let newsImage = null

    if (
        typeof newsItem.leadImage !== 'undefined' &&
        newsItem.leadImage !== null
    ) {
        newsImage = newsItem.leadImage.fluid
    }

    return (
        <li className={styles.listItem}>
            {newsImage && (
                <Image
                    className={styles.image}
                    title={newsItem.leadImage.description}
                    fluid={newsImage}
                    alt={newsItem.leadImage.description}
                />
            )}
            <NewsHeadingWithLink
                heading={newsTitle}
                overline={newsOverline}
                to={newsTo}
            />
        </li>
    )
}

const SortByDate = newsPage => {
    return newsPage.publishDate
}

const SortByTitle = newsPage => {
    return typeof newsPage.shortTitle !== 'undefined'
        ? newsPage.shortTitle
        : newsPage.title
}

export default ({ category, heading, limit, showViewAll, viewAllPage }) => {
    const data = useStaticQuery(graphql`
        {
            allContentfulStandardPage(
                filter: { isNews: { eq: true }, publishDate: { ne: "" } }
                sort: { order: DESC, fields: publishDate }
            ) {
                edges {
                    node {
                        id
                        title
                        slug
                        shortTitle
                        description {
                            description
                        }
                        category {
                            id
                            slug
                            title
                            shortTitle
                        }
                        leadImage {
                            title
                            description
                            file {
                                url
                            }
                            fluid(maxWidth: 600, maxHeight: 315, quality: 85) {
                                ...GatsbyContentfulFluid_withWebp
                            }
                        }
                        publishDate
                    }
                }
            }
        }
    `)

    const edges = get(data, 'allContentfulStandardPage.edges')

    const newsPages = edges.map(edge => {
        return edge.node
    })

    const viewAllTo = viewAllPage ? linkResolver.path(viewAllPage) : null

    const FilterNews = newsPage => {
        if (typeof category !== 'undefined' && category !== null) {
            if (
                typeof newsPage.category !== 'undefined' &&
                newsPage.category !== null
            ) {
                return newsPage.category.slug === category.slug
            } else {
                return false
            }
        } else {
            return true
        }
    }

    const filteredNewsPages = newsPages.filter(FilterNews)

    const viewAll =
        typeof showViewAll !== 'undefined' && showViewAll === true
            ? true
            : false
    const [limitNews, setlimitNews] = useState((typeof limit !== 'undefined') && (limit !== null) ? limit : 6)

    const limitedNewsPages = take(filteredNewsPages, limitNews)

    const categoryLabel =
        typeof category !== 'undefined' && category !== null
            ? category.shortTitle
            : null

    const clickHandler = () => {
        setlimitNews(100)
    }

    return (
        <div className={styles.relatedNews}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            {limitedNewsPages.length > 0 && (
                <ul className={styles.newsList}>
                    {limitedNewsPages.map(node => (
                        <News key={'related-news-' + node.id} newsItem={node} />
                    ))}
                </ul>
            )}
            {limitedNewsPages.length === 0 && (
                <p className={styles.empty}>
                    There is no {categoryLabel} news currently available.
                </p>
            )}
            {viewAll && limitNews < 100 && (
                <CallToAction url={viewAllTo || '#'} onClick={clickHandler}>
                    View All {categoryLabel} News
                </CallToAction>
            )}
        </div>
    )
}
