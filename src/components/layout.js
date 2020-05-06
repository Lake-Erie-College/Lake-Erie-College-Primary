import React from 'react'
import { Link } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'
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
                <HelmetProvider>
                    <Helmet>
                        <html lang="en" />
                    </Helmet>
                </HelmetProvider>
                <GlobalHeader />
                {children}
                <GlobalFooter />
            </Container>
        )
    }
}

export default Template
