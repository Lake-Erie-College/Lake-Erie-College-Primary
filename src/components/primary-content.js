import React from 'react'
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {Link as GatsbyLink} from "gatsby"
import cx from "classnames";
import Image from "gatsby-image"
import useContentfulImage from "../hooks/useContentfulImage"
import ImageWithSVGSupport from './image-with-svg-support'
import BlockAcademicOfferingListing from './blocks/block-academic-offering-listing'
import BlockEventListing from './blocks/block-event-listing'
import BlockMediaWithCaption from './blocks/block-media-with-caption'
import BlockPersonListing from './blocks/block-person-listing'
import BlockSpotlightContent from './blocks/block-spotlight-content'
import ContactPerson from './contact-person'
import Divider from './divider'

const linkResolver = require('../utils').linkResolver
const localeScrubber = require('../utils').localeScrubber

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
    [BLOCKS.OL_LIST]: (node, children) => <ol className={cx(styles.textBlock, styles.ol)}>{children}</ol>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className={cx(styles.textBlock, styles.ul)}>{children}</ul>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className={styles.textBlock}>{children}</blockquote>,
    [BLOCKS.HR]: (node, children) => <div className={styles.textBlock}><Divider /></div>,
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
        const content = localeScrubber.scrub(node)

        const { title, description, file } = content.data.target;
        const mimeType = file.contentType
        const mimeGroup = mimeType.split('/')[0]
  
        switch (mimeGroup) {
            case 'image':
                const contentfulImage = useContentfulImage(
                    content.data.target.file.url
                )
                return (
                    <ImageWithSVGSupport className={styles.image} title={content.data.target.title} fluid={contentfulImage.fluid} file={file} svg={contentfulImage.svg} />
                )
            case 'application':
                return <a
                    alt={description ?  description : null}
                    href={file.url}
                    >{ title ? title : file.details.fileName }
                </a>
            default:
                return <span style={{backgroundColor: 'red', color: 'white'}}> {mimeType} embedded asset </span>
        }
      },
  },
}

const blocksHandlers = {
    'blockAcademicOfferingListing': value => <AcademicOfferingListing node={value} />,
    'blockEventListing': value => <EventListing node={value} />,
    'blockMediaWithCaption': value => <MediaWithCaption node={value} />,
    'blockPersonListing': value => <PersonListing node={value} />,
    'blockQuote': value => <Placeholder value={value} />,
    'blockSpotlightContent': value => <SpotlightContent node={value} />,
    'person': value => <Person node={value} />,
    default: value => <Placeholder value={value} />,
};

const Container = ({data, isFullWidth}) => {
    const hasJSON = data !== null && typeof data.json !== 'undefined' && data.json !== null

    if (!hasJSON) {
        return null
    }

    return (
        <div className={cx(styles.primaryContent, { [`${styles.fullWidth}`]: isFullWidth })}>
            {documentToReactComponents(data.json, options)}
        </div>
    )
}

const Placeholder = ({value}) => {
    return (
        <p>Placeholder Block</p>
    )
}

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
const Link = ({children, node, activeClassName}, ...other) => {
    const to = linkResolver.path(node)

    return (
        <GatsbyLink to={to} activeClassName={activeClassName} {...other}>
            {children}
        </GatsbyLink>
    )
}

const AcademicOfferingListing = ({node}) => {
    const content = localeScrubber.scrub(node)
    
    return (
        <BlockAcademicOfferingListing category={content.relatedAcademicCategory} offeringType={content.offeringType} />
    )
    
}

const EventListing = ({node}) => {
    const content = localeScrubber.scrub(node)

    return (
        <BlockEventListing category={content.relatedCategory} />
    )
}

const MediaWithCaption = ({node}) => {
    const content = localeScrubber.scrub(node)

    return (
        <BlockMediaWithCaption 
            internalMedia={content.image} 
            externalMedia={content.externalMediaUrl} 
            heading={content.mediaHeading} 
            caption={content.mediaCaption} 
            internalLink={content.internaLink} 
            callToAction={content.callToAction}
        />
    )
}

const PersonListing = ({node}) => {
    const content = localeScrubber.scrub(node)

    return (
        <BlockPersonListing title={content.title} primaryHeading={content.primaryHeading} people={content.relatedPeople} />
    )
}

const Quote = ({node}) => {

}

const SpotlightContent = ({node}) => {
    const content = localeScrubber.scrub(node)

    return (
        <BlockSpotlightContent node={content} />
    )
}

const Person = ({node}) => {
    const person = localeScrubber.scrub(node)

    return (
        <ContactPerson person={person} />
    )
}

export default ({ data, isFullWidth }) => (
    <Container data={data} isFullWidth={isFullWidth} />
)