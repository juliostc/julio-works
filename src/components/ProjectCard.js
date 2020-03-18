import React, { Component, Fragment } from 'react'
import cx from 'clsx'

import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

//MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { getImageURL } from '../data'

//my components

import LazyImage from './LazyImage'
import { getImageSrc, getImageSrcset } from '../util/getImageUrl'

//mui treasury
// import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
// import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop'

import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  root: {
    //maxWidth: 304,
    margin: 'auto',
    borderRadius: 0,
    position: 'relative',
    borderBottom: '2px solid transparent',
    '&:hover': {
      borderBottom: '2px solid ' + theme.palette.primary.main,
    },
    // borderColor: theme.palette.primary.main
  },
  stamp: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(50%, -100%)',
    width: '75%',
    '&:hover': {
      transform: 'translate(50%, -50%)',
    },
  },
  content: {
    //padding: 24,
    marginTop: 'auto',
  },
  cta: {
    display: 'block',
    textAlign: 'center',
    color: theme.palette.common.white,
    letterSpacing: '3px',
    fontWeight: 200,
    fontSize: 12,
  },
  title: {
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    fontWeight: 'bolder', //,
    //fontSize: theme.typography.h5.fontSize
  },
  year: {
    //fontWeight: "bold"
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightLight,
  },
  categories: {
    fontWeight: theme.typography.fontWeightLight,
  },
  media: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  bottomOverlay: {
    backgroundImage:
      'linear-gradient(bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  topOverlay: {
    backgroundImage:
      'linear-gradient(top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  chip: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    //color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
  },
}))

const ProjectCard = ({ project, ...props }) => {
  const styles = useStyles()
  //const mediaStyles = useCoverCardMediaStyles();
  // const shadowStyles = useLightTopShadowStyles()

  const longTitle = project.title.length > 25

  const smallCard =
    useMediaQuery(theme => theme.breakpoints.down('xs')) || props.small

  const cardHeight = props.height //"auto" would work, for example
    ? props.height
    : props.nonResponsive || !smallCard
    ? 360
    : 240

  const decodedSrc = decodeURI(project.featuredImage.image)
  return (
    // <Card color="secondary" className={cx(styles.root, shadowStyles.root)}>
    <Card color="secondary" className={styles.root}>
      {project.featuredImage ? (
        <Fragment>
          <CardMedia
            //   classes={mediaStyles}
            className={styles.media}
            image={getImageSrc(decodedSrc)}
            title={project.title}
            component="img"
            style={
              project.cropPosition
                ? {
                    objectPosition: project.cropPosition,
                  }
                : undefined
            }
          />
          <Box className={styles.bottomOverlay}></Box>
        </Fragment>
      ) : null}

      {/* <CardActionArea component={RouterLink} to={'/projects/' + project.id}> */}
      <CardActionArea>
        <Link
          underline="none"
          color="inherit"
          component={RouterLink}
          to={'/projects/' + project.id}
        >
          <CardContent className={styles.content}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              height={cardHeight}
              color={'common.white'}
            >
              <Box marginTop={'auto'}>
                <Grid container>
                  <Grid item>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      className={cx(styles.year, 'titleFont')}
                    >
                      {project.date.getFullYear()} / {project.type}
                    </Typography>

                    <Typography
                      variant={longTitle || smallCard ? 'h6' : 'h4'}
                      className={cx(styles.title, 'titleFont')}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="textSecondary"
                      className={styles.categories}
                    >
                      {project.categories && project.categories.join(' • ')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
