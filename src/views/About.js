import './About.css'

import React from 'react'
// import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Obfuscate from 'react-obfuscate'

import { CentralColumn } from '../components/Utils'
import ProjectThemeProvider from '../components/ProjectThemeProvider'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

// import './NoMatch.css'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import { LogoIcon } from '../util/data'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    // width: '40%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}))

function BusinessCard({ featuredImage }) {
  const classes = useStyles()
  // const theme = useTheme()

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <CardMedia
            component="img"
            className={classes.cover}
            image={featuredImage}
            title="my profile picture"
          />
        </Grid>
        <Grid item xs={12} sm>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h1" variant="h3" className="cardTitle">
                Júlio Carvalho
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                media & communications graduate
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <Obfuscate
                email="juliostcarvalho@gmail.com"
                aria-label="Email Me"
              >
                <IconButton aria-label="email" target="_blank">
                  {/* target blank doesn't work here, but it's ok */}
                  <LogoIcon type="email"></LogoIcon>
                </IconButton>
              </Obfuscate>
              <IconButton
                aria-label="behance"
                href="https://www.behance.net/juliostc"
                target="_blank"
              >
                <LogoIcon type="behance"></LogoIcon>
              </IconButton>
              <IconButton
                aria-label="twitter"
                href="https://www.twitter.com/julioworks"
                target="_blank"
              >
                <LogoIcon type="twitter"></LogoIcon>
              </IconButton>
              <IconButton
                aria-label="github"
                href="https://github.com/juliostc"
                target="_blank"
              >
                <LogoIcon type="github"></LogoIcon>
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

const About = ({ fields }) => {
  const { featuredImage } = fields
  return (
    <div className="About">
      <ProjectThemeProvider type="light">
        <Box mt={10} mb={10}>
          <CentralColumn xs={10} sm={6}>
            <BusinessCard featuredImage={featuredImage} />
          </CentralColumn>
        </Box>
      </ProjectThemeProvider>

      <Helmet>
        <title>About me</title>
        <body className="body--AboutMe" />
      </Helmet>
    </div>
  )
}

// About.propTypes = {
//   siteUrl: PropTypes.string.isRequired,
// }

export default About
