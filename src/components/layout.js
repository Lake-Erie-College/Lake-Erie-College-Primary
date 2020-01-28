import React from 'react'
import { Link } from 'gatsby'
import Container from './container'
import Navigation from './navigation'
import NavigationPrimary from './navigation-primary'

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
        <Navigation />
        <NavigationPrimary />
        {children}
      </Container>
    )
  }
}

export default Template
