import React from 'react'
import { Link } from 'gatsby'
import { Helmet, HelmetProvider } from "react-helmet-async"
import Container from './container'
import NavigationPrimary from './navigation-primary'
import GlobalFooter from './global-footer'

// Global App Styles
import '../styles/styles.scss'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

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
        <header style={{visibility: 'hidden'}}>
          <NavigationPrimary />
        </header>
        {children}
        <GlobalFooter />
      </Container>
    )
  }
}

export default Template
