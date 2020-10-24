import React from 'react'
import cx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

export const CentralColumn = (props) => (
  <Grid
    container
    // alignItems="center"
    justify="center"
    className={props.className}
  >
    {props.leftColumn && (
      <Grid item xs={props.xs || 12} sm>
        {props.leftColumn}
      </Grid>
    )}

    <Grid item xs={props.xs || 12} sm={props.sm || 8}>
      {props.children}
    </Grid>
    {props.leftColumn && <Grid item sm />}
  </Grid>
)

export const CenterBox = (props) => (
  <Box
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    // display="flex"
    // flexDirection="row"
    minHeight="100%"
    {...props}
  >
    {props.children}
  </Box>
)

export const Surface = (props) => {
  const styles = makeStyles((theme) => ({
    root: {
      borderRadius: 0,
      minHeight: '100%',
      minWidth: '100%',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.default,
      // overflow: 'auto',
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  }))()

  return (
    <Paper className={cx(styles.root, props.transparent && styles.transparent)}>
      {props.children}
    </Paper>
  )
}

export const Background = (props) => {
  const percentage = props.heightPercentage

  const height = props.height

  let gradientType = typeof props.gradient === 'string' ? props.gradient : null

  const styles = makeStyles((theme) => ({
    root: {
      height: height
        ? height
        : percentage || 'calc(100% + ' + theme.spacing(10) + 'px)',
      width: '100%',
      position: 'absolute',
      backgroundColor: !props.gradient && theme.palette.background.paper,
      backgroundImage:
        props.gradient &&
        `linear-gradient(${
          gradientType || 'top'
        }, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.8) 100%)`,
      zIndex: 1,
      left: 0,
      top: 0,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  }))()

  return <div className={cx(styles.root)}></div>
}
