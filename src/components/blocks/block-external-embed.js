import React, { useState, useCallback, useEffect } from 'react'
import * as typeformEmbed from '@typeform/embed' // https://www.npmjs.com/package/@typeform/embed
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './block-external-embed.module.scss'

const BlockExternalEmbed = ({
    displayTitle,
    url,
    html,
    popup,
    blackbaud,
    simpleCheckout,
    externalScript,
}) => {
    const hasSource = typeof url !== 'undefined' && url !== null
    const hasHTML = typeof html !== 'undefined' && html !== null
    const isPopup = typeof popup !== 'undefined' && popup === true
    const isBlackbaud = typeof blackbaud !== 'undefined' && blackbaud !== null
    const isSimpleCheckout =
        typeof simpleCheckout !== 'undefined' && simpleCheckout !== null
    const isAcuity = hasSource && url.includes('app.acuityscheduling.com')
    const callToAction =
        typeof displayTitle !== 'undefined' && displayTitle !== null
            ? displayTitle
            : 'Submit'

    if (isBlackbaud) {
        useEffect(() => {
            if (typeof window !== 'undefined') {
                window.bboxInit = function() {
                    bbox.showForm(blackbaud)
                }
            }
        }, [isBlackbaud, blackbaud]) // <-- empty array means 'run once'

        return (
            <div className={styles.contentEmbed}>
                <div id={'bbox-root'} className={styles.embed}></div>
                <Helmet>
                    <script
                        src="https://bbox.blackbaudhosting.com/webforms/bbox-min.js"
                        type="text/javascript"
                    />
                </Helmet>
            </div>
        )
    } else if (isSimpleCheckout) {
        return (
            <SimpleCheckoutButton
                uniqueId={simpleCheckout}
                callToAction={callToAction}
            />
        )
    } else if (isAcuity) {
        return (
            <>
                <div className={styles.contentEmbed}>
                    <iframe
                        title="Schedule via Acuity"
                        className={styles.embed}
                        src={url}
                        width="100%"
                    ></iframe>
                </div>
                <Helmet>
                    <script
                        src="https://embed.acuityscheduling.com/js/embed.js"
                        type="text/javascript"
                    />
                </Helmet>
            </>
        )
    } else if (hasSource) {
        if (url.includes('typeform.com/to/') && isPopup) {
            const popup = typeformEmbed.makeWidget(url, {
                mode: 'drawer_right',
                // open: 'scroll',
                // openValue: 30,
                // autoClose: 3,
                hideScrollbars: true,
                onSubmit: function() {},
                onReady: function() {},
                onClose: function() {},
            })

            popup.open()
        } else if (url.includes('typeform.com/to/') && !isPopup) {
            const embedRef = useCallback(node => {
                if (node !== null) {
                    const embed = typeformEmbed.makeWidget(node, url, {
                        opacity: 0,
                        hideScrollbars: true,
                        onSubmit: function() {},
                        onReady: function() {},
                    })
                }
            }, [])

            return <div className={styles.embed} ref={embedRef}></div>
        } else {
            return (
                <iframe
                    title={callToAction}
                    className={styles.contentEmbed}
                    src={url}
                />
            )
        }
    } else if (hasHTML) {
        const hasScript =
            typeof externalScript !== 'undefined' && externalScript !== null
        return (
            <div className={styles.contentEmbed}>
                {hasScript && (
                    <Helmet>
                        <script src={externalScript} type="text/javascript" />
                    </Helmet>
                )}
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        )
    } else {
        return <span></span>
    }
}

const SimpleCheckoutButton = ({ uniqueId, callToAction }) => {
    return (
        <form
            action="https://Simplecheckout.authorize.net/payment/CatalogPayment.aspx"
            method="post"
            className={styles.container}
        >
            <input name="LinkId" type="hidden" value={uniqueId} />
            <button type="submit" className={styles.button}>
                <span>{callToAction}</span>
                <span
                    className={styles.button}
                    onClick={() =>
                        onSearchQueryChange(targetElement.current.value)
                    }
                >
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon="chevron-right"
                        size="lg"
                    />
                </span>
            </button>
        </form>
    )
}

const TypeFormPopup = url => {
    const hasSource = typeof url !== 'undefined' && url !== null

    if (hasSource) {
        if (url.includes('typeform.com/to/')) {
            const popup = typeformEmbed.makePopup(url, {
                mode: 'drawer_right',
                // open: 'scroll',
                // openValue: 30,
                // autoClose: 3,
                hideScrollbars: true,
                onSubmit: function() {},
                onReady: function() {},
                onClose: function() {},
            })

            popup.open()
        }
    }
}

export { BlockExternalEmbed as default, TypeFormPopup }
