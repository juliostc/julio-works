import React from 'react'
import cx from 'clsx'

// import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'

//MUI

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

//my components
import Stamp from './Stamp'
import UnderlinedLink from './UnderlinedLink'

//mui treasury
// import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
// import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop'

import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
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
    // textTransform: "uppercase",
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

const ListedProject = (props) => {
  const styles = useStyles()
  //const mediaStyles = useCoverCardMediaStyles();
  // const shadowStyles = useLightTopShadowStyles();

  const { project } = props

  const longTitle = project.title.length > 25

  const smallCard =
    useMediaQuery((theme) => theme.breakpoints.down('xs')) || props.small

  return (
    <Grid container spacing={2}>
      <Grid>
        <Box m={1} maxWidth="8em">
          <Stamp text={project.type} emoji={project.emoji}></Stamp>
        </Box>
      </Grid>
      <Grid item xs>
        <Typography
          variant={longTitle || smallCard ? 'h6' : 'h4'}
          className={cx(styles.title, 'titleFont')}
        >
          {project.title}
        </Typography>
        {/* <Typography
          variant="textSecondary"
          color="primary"
          className={cx(styles.year, "titleFont")}
          display="inline"
        >
          
        </Typography> */}
        <Typography
          variant="caption"
          color="textSecondary"
          className={styles.categories}
          display="inline"
        >
          {project.date.getFullYear()} / {project.categories.join(' • ')}
        </Typography>
        <Box>
          <UnderlinedLink
            href={'/projects/' + project.id}
            color="primary"
            noIcon
          >
            Read more
          </UnderlinedLink>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ListedProject
