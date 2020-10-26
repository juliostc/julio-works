import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

// import './NoMatch.css'

const About = () => (
  <div className="NoMatch">
    <section className="section thick">
      <div className="container taCenter">
        <h1>About me</h1>
      </div>
    </section>
    <Helmet>
      <title>Julio Carvalho | About me</title>
      <body className="body--AboutMe" />
    </Helmet>
  </div>
)

About.propTypes = {
  siteUrl: PropTypes.string.isRequired,
}

export default About
