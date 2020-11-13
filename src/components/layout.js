import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import Container from './container'
import GlobalHeader from './global-header'
import GlobalFooter from './global-footer'

// Global App Styles
import '../styles/styles.scss'

class Template extends React.Component {
    render() {
        const { location, children } = this.props

        let rootPath = `/`
        if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
            rootPath = __PATH_PREFIX__ + `/`
        }

        return (
            <Container>
                <Helmet>
                    <html lang="en" />
                    <meta name="google-site-verification" content="rqzFQ4nSxKtJktJRsEvcCQlu6maeWntllPVMdsRdO0w" />
                </Helmet>
                <GlobalHeader />
                {children}
                <GlobalFooter />
            </Container>
        )
    }
}

export default Template
