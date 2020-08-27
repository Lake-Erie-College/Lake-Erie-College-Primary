import React, { useState, useCallback } from 'react'
import * as typeformEmbed from '@typeform/embed' // https://www.npmjs.com/package/@typeform/embed
import { Helmet, HelmetProvider } from 'react-helmet-async'

import styles from './block-external-embed.module.scss'

const BlockExternalEmbed = ({ url, html, popup, blackbaud }) => {
    const hasSource = typeof url !== 'undefined' && url !== null
    const hasHTML = typeof html !== 'undefined' && html !== null
    const isPopup = typeof popup !== 'undefined' && popup === true
    const isBlackbaud = typeof blackbaud !== 'undefined' && blackbaud !== null
    const isAcuity = hasSource && url.includes('app.acuityscheduling.com')

    if (isBlackbaud) {
        if (typeof window !== 'undefined') {
            window.bboxInit = function() {
                bbox.showForm(blackbaud)
            }
        }

        return (
            <div className={styles.contentEmbed}>
                <HelmetProvider>
                    <Helmet>
                        <script
                            src="https://bbox.blackbaudhosting.com/webforms/bbox-min.js"
                            type="text/javascript"
                        />
                    </Helmet>
                </HelmetProvider>
                <div id={'bbox-root'} className={styles.embed}></div>
            </div>
        )
    } else if (isAcuity) {
        return (
            <div className={styles.contentEmbed}>
                <HelmetProvider>
                    <Helmet>
                        <script
                            src="https://embed.acuityscheduling.com/js/embed.js"
                            type="text/javascript"
                        />
                    </Helmet>
                </HelmetProvider>
                <iframe className={styles.embed} src={url} width='100%'></iframe>
            </div>
        )
    } else if (hasSource) {
        if (url.includes('typeform.com/to/') && isPopup) {
            const popup = typeformEmbed.makeWidget(url, {
                mode: 'drawer_right',
                // open: 'scroll',
                // openValue: 30,
                // autoClose: 3,
                hideScrollbars: true,
                onSubmit: function() {
                    // console.log('Typeform successfully submitted')
                },
                onReady: function() {
                    // console.log('Typeform is ready')
                },
                onClose: function() {
                    // console.log('Typeform is closed')
                },
            })

            popup.open()
        } else if (url.includes('typeform.com/to/') && !isPopup) {
            const embedRef = useCallback(node => {
                if (node !== null) {
                    const embed = typeformEmbed.makeWidget(node, url, {
                        opacity: 0,
                        hideScrollbars: true,
                        onSubmit: function() {
                            // console.log('Typeform successfully submitted')
                        },
                        onReady: function() {
                            console.log('Typeform is ready')
                        },
                    })
                }
            }, [])

            return <div className={styles.embed} ref={embedRef}></div>
        } else {
            return <iframe className={styles.contentEmbed} src={url} />
        }
    } else if (hasHTML) {
        return (
            <div
                className={styles.contentEmbed}
                dangerouslySetInnerHTML={{ __html: html }}
            ></div>
        )
    } else {
        return <span></span>
    }
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
                onSubmit: function() {
                    // console.log('Typeform successfully submitted')
                },
                onReady: function() {
                    // console.log('Typeform is ready')
                },
                onClose: function() {
                    // console.log('Typeform is closed')
                },
            })

            popup.open()
        }
    }
}

export { BlockExternalEmbed as default, TypeFormPopup }
