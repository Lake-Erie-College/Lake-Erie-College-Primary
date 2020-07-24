import React, { useState } from 'react'
import * as typeformEmbed from '@typeform/embed' // https://www.npmjs.com/package/@typeform/embed

const BlockExternalEmbed = ({ url, html, popup }) => {
    const hasSource = typeof url !== 'undefined' && url !== null
    const hasHTML = typeof html !== 'undefined' && html !== null
    const isPopup = typeof popup !== 'undefined' && popup === true

    console.log(hasSource)

    if (hasSource) {
        if (url.includes('typeform.com/to/') && isPopup) {
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
        else {
            return <iframe src={url} />
        }
    }

    if (hasHTML) {
        return <div dangerouslySetInnerHTML={{ __html: html }}></div>
    }
}

const TypeFormPopup = ( url ) => {
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

export { BlockExternalEmbed as default, TypeFormPopup as TypeFormPopup }
