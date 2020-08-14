import React, { useState, useCallback } from 'react'
import * as typeformEmbed from '@typeform/embed' // https://www.npmjs.com/package/@typeform/embed

import styles from './block-external-embed.module.scss'

const BlockExternalEmbed = ({ url, html, popup }) => {
    const hasSource = typeof url !== 'undefined' && url !== null
    const hasHTML = typeof html !== 'undefined' && html !== null
    const isPopup = typeof popup !== 'undefined' && popup === true

    if (hasSource) {
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
                    const embed = typeformEmbed.makeWidget(
                        node,
                        url,
                        {
                            opacity: 0,
                            hideScrollbars: true,
                            onSubmit: function() {
                                // console.log('Typeform successfully submitted')
                            },
                            onReady: function() {
                                console.log('Typeform is ready')
                            },
                        }
                    )
                }
            }, [])

            return <div className={styles.embed} ref={embedRef}></div>
        } else {
            return <iframe src={url} />
        }
    }

    if (hasHTML) {
        return <div dangerouslySetInnerHTML={{ __html: html }}></div>
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
