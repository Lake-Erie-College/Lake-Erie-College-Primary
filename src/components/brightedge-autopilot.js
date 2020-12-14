import React from 'react'
import { Helmet } from 'react-helmet-async'

const BrightEdgeAutoPilot = () => {
    /* Access to and use of BrightEdge AutoPilot - Self Connecting Pages is governed by the
    Infrastructure Product Terms located at: www.brightedge.com/infrastructure-product-terms.
    Customer acknowledges and agrees it has read, understands and agrees to be bound by the
    Infrastructure Product Terms. */

    return (
        <>
            <div className={'be-ix-link-block'}></div>
            <Helmet>
                <script src="//cdn.bc0a.com/autopilot/f00000000165181/autopilot_sdk.js"></script>
            </Helmet>
        </>
    )
}

export default BrightEdgeAutoPilot
