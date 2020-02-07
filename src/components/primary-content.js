import React from 'react'
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {Link as GatsbyLink} from "gatsby"
import cx from "classnames";
import Image from "gatsby-image"
import useContentfulImage from "../hooks/useContentfulImage"
import BlockSpotlightContent from './blocks/block-spotlight-content'

const linkResolver = require('../utils').linkResolver

import styles from './primary-content.module.scss'

const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p>{children}</p>

// Marks - BOLD, ITALIC, UNDERLINE, CODE

// Blocks - DOCUMENT, PARAGRAPH, HEADING_1 thru 6, OL_LIST, UL_LIST, LIST_ITEM
//  HR, QUOTE, EMBEDDED_ENTRY, EMBEDDED_ASSET

// Inlines - HYPERLINK, ENTRY_HYPERLINK, ASSET_HYPERLINK, EMBEDDED_ENTRY



const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className={cx(styles.textBlock, styles.p)}>{children}</p>,
    [BLOCKS.HEADING_1]: (node, children) => <h1 className={cx(styles.textBlock, styles.h1)}>{children}</h1>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className={cx(styles.textBlock, styles.h2)}>{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className={cx(styles.textBlock, styles.h3)}>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4 className={cx(styles.textBlock, styles.h4)}>{children}</h4>,
    [BLOCKS.HEADING_5]: (node, children) => <h5 className={cx(styles.textBlock, styles.h5)}>{children}</h5>,
    [BLOCKS.HEADING_6]: (node, children) => <h6 className={cx(styles.textBlock, styles.h6)}>{children}</h6>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className={styles.textBlock}>{children}</ol>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className={styles.textBlock}>{children}</ul>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className={styles.textBlock}>{children}</blockquote>,
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        // If you are using contenful.js sdk, the referenced entry is resolved
        // automatically and is available at `node.data.target`.
        // const referencedEntry = getEntryWithId(node.data.target.sys.id);
        // <a href={`/pages/${referencedEntry.fields.slug}`}>{children}</a>
        // return 'test';
        return <Link children={children} node={node.data.target.fields} activeClassName='active' />;
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => <EmbeddedEntry node={node} />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const mimeType = file['en-US'].contentType
        const mimeGroup = mimeType.split('/')[0]
  
        switch (mimeGroup) {
            case 'image':
                const fluid = useContentfulImage(
                    node.data.target.fields.file["en-US"].url
                )
                return (
                    <Image className={styles.image} title={node.data.target.fields.title["en-US"]} fluid={fluid} />
                )
            case 'application':
                return <a
                    alt={description ?  description['en-US'] : null}
                    href={file['en-US'].url}
                    >{ title ? title['en-US'] : file['en-US'].details.fileName }
                </a>
            default:
                return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
        }
      },
  },
}

const blocksHandlers = {
    'blockSpotlightContent': value => <BlockSpotlightContent props={value}/>,
    'blockQuote': value => value,
    'blockPersonListing': value => value,
    'blockAcademicOfferingListing': value => value,
    default: value => value,
};

function EmbeddedEntry({ node }) {
    const type = node.data.target.sys.contentType.sys.id
    const value = node.data.target.fields
    const handler = blocksHandlers[type] || blocksHandlers.default
    
    return (
        <div className={styles.embeddedBlock}>
            {handler(value)}
        </div>
    )
}

// Taken from: https://www.gatsbyjs.org/docs/gatsby-link/
// If given link begins with a single `/`, treat as internal Gatsby Link
const Link = ({children, node, activeClassName, ...other}) => {
    const to = linkResolver.path(node)

    return (
    <GatsbyLink to={to} activeClassName={activeClassName} {...other}>
        {children}
    </GatsbyLink>
    )
}

export default ({ data }) => (
    <div className={styles.primaryContent}>
        {documentToReactComponents(data.json, options)}
    </div>
)