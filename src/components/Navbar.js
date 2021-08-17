import React, { Component } from 'react'

import { Link as RouterLink } from 'react-router-dom'

// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
// import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar'

const styles = (theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    appbar: {
      //alignItems: "start"
      backgroundColor: theme.palette.background.paper,
      fontWeight: 'bold',

      // borderBottom: "1px solid " + theme.palette.text.secondary
    },
    title: {
      flexGrow: 1,
      // "& *": { fontWeight: "light" }
    },
  }
}

class Navbar extends Component {
  render() {
    const { classes } = this.props
    return (
      <AppBar
        position="static"
        title="Julio Carvalho"
        color="default"
        className={classes.appbar}
      >
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="h6">
              <Link
                component={RouterLink}
                to="/"
                color="textPrimary"
                underline="none"
              >
                Julio Carvalho
              </Link>
            </Typography>
          </div>
          <Button
            variant="h6"
            component={RouterLink}
            to="/projects"
            color="textSecondary"
            disableRipple
          >
            <Typography color="textSecondary" variant="body2">
              Works
            </Typography>
          </Button>
          {/* <Button variant="h6" to="/lab" component={RouterLink}>
              <Typography color="textSecondary" variant="body2">
                Experiments
              </Typography>
            </Button> */}
          <Button
            variant="h6"
            component={RouterLink}
            to="/about"
            color="secondary"
            disableRipple
          >
            <Typography color="textSecondary" variant="body2">
              About me
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navbar)
