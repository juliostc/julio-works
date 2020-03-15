import React, { Component, Fragment } from 'react'
import cx from 'clsx'

//MUI
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//my components
import Button from '../components/Button'
import LazyImage from '../components/LazyImage'
import Stamp from '../components/Stamp'
import Content from '../components/Content'
import UnderlinedLink from '../components/UnderlinedLink'
import ProjectThemeProvider from '../components/ProjectThemeProvider'
import { CentralColumn, Surface, Background } from '../components/Utils'

const styles = theme => {
  root: {
  }
}

class ProjectView extends Component {
  constructor({ project, ...props }) {
    super(props)
    this.state = { project }
  }

  render() {
    const { project } = this.state
    const { classes } = this.props

    const { Header, Body, Footer } = ViewComponents

    console.log('projectview', project)

    const extras = []
    const { tools, team } = project
    if (tools && tools.length > 0) extras.push(['Tools', tools.join(', ')])
    if (team && team.length > 0)
      extras.push([
        'Team',
        team.map(who => (
          <UnderlinedLink href={who.link}>{who.name}</UnderlinedLink>
        )),
      ])

    return (
      <ProjectThemeProvider project={project} type="light">
        <Surface>
          <ProjectThemeProvider type="dark">
            <Header
              image={project.headerImage || project.featuredImage.image}
              {...project}
            ></Header>
          </ProjectThemeProvider>
          <Body extras={extras} externalLinks={project.externalLinks}>
            {project.body}
          </Body>
        </Surface>
      </ProjectThemeProvider>
    )
  }
}

export default withStyles(styles)(ProjectView)

const ViewComponents = {
  Header: ({
    type = '',
    id = 'projectStamp',
    emoji = '',
    date,
    title,
    categories = [],
    image,
    ...props
  }) => {
    const styles = makeStyles(theme => ({
      header: {
        position: 'relative',
        background: 'rgba(0, 0, 0, 0)',
        width: '100%',
      },
      headerMedia: {
        position: 'relative',
        zIndex: 2,
      },
      headerImage: {
        maxHeight: '360px',
        objectFit: 'cover',
      },
      headerBox: {
        position: 'relative',
        zIndex: 2,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
      },
      stamp: {
        margin: 'auto',
      },
      headerText: {
        //paddingBottom: theme.spacing(2)
        marginTop: 'auto',
        marginBottom: 'auto',
        textAlign: 'middle',
      },

      positionrelative: {
        position: 'relative',
      },

      title: {
        textTransform: 'uppercase',
      },

      date: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
    }))()

    const titleSize =
      title.length > 30 //long
        ? 'h3'
        : title.length < 12 //small --needs to not be set when on small screens, dont know how to do that yet
        ? 'h1'
        : 'h2' //default

    console.log('header title', title)
    console.log('styles', styles)

    return (
      <div className={styles.header}>
        <Surface transparent>
          <CentralColumn className={styles.positionrelative}>
            <Background gradient height={!image ? '100%' : null} />
            <Box className={styles.headerBox}>
              <Grid container spacing={4} justify="center">
                <Grid item md={2} sm={3} xs={6} className={styles.stamp}>
                  <Box>
                    <Stamp text={type} id={id} emoji={emoji} rotate />
                  </Box>
                </Grid>
                <Grid item sm xs={10} className={styles.headerText}>
                  <Box>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      color="primary"
                      className={styles.date}
                      gutterBottom
                    >
                      {date.toLocaleString('default', {
                        month: 'short',
                      })}{' '}
                      / {date.getFullYear()}
                    </Typography>
                    <Typography
                      variant={titleSize}
                      align="center"
                      style={{ fontWeight: 'bold' }}
                      className={cx('titleFont', styles.title)}
                      gutterBottom
                    >
                      {title}
                    </Typography>
                    <Typography
                      align="center"
                      variant="subtitle1"
                      color="primary"
                      className={styles.categories}
                    >
                      {categories.join(' • ')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CentralColumn>
        </Surface>
        <div className={styles.headerMedia}>
          <CentralColumn xs={10}>
            {image && (
              <LazyImage
                lazy
                src={image}
                className={styles.headerImage}
              ></LazyImage>
            )}
          </CentralColumn>
        </div>
      </div>
    )
  },
  Body: ({ children, body, extras = [], externalLinks, ...props }) => {
    const styles = makeStyles(theme => ({
      root: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
      },
      externalLinks: {
        // paddingTop: theme.spacing(4),
        color: theme.palette.text.hint,
        '&:hover': {
          color: theme.palette.text.subtitle1,
        },
      },
    }))()

    return (
      <CentralColumn
        className={styles.root}
        xs={10}
        leftColumn={
          <CentralColumn>
            {extras.map(extra => (
              <Fragment>
                <Typography variant="caption">
                  <Box
                    style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                  >
                    {extra[0] || extra.caption}
                  </Box>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {extra[1] || extra.content}
                </Typography>
              </Fragment>
            ))}
          </CentralColumn>
        }
      >
        {externalLinks && (
          <Grid
            container
            spacing={2}
            // className={styles.externalLinks}
            // justify="space-evenly"
          >
            {externalLinks.map(obj => (
              <Grid item>
                <Button
                  type={obj.type}
                  caption={obj.caption || 'See this project on ' + obj.type}
                  href={obj.link}
                ></Button>
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4}>{body && <Content source={body || children} />}</Box>
      </CentralColumn>
    )
  },
}
