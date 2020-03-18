import React, { Component } from 'react'
import cx from 'clsx'

import { Link as RouterLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import MuiButton from '@material-ui/core/Button'

import { LogoIcon } from '../util/data'

const styles = theme => ({
  root: {
    display: 'inline-flex',
    verticalAlign: 'text-middle',
    boxSizing: 'inherit',
    textAlign: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: 'inherit',
  },
  colorSecondary: {
    borderColor: theme.palette.secondary.main,
  },
  icon: {
    marginRight: theme.spacing(0.25),
  },
})

export class Button extends Component {
  render() {
    const {
      classes,
      href,
      caption,
      icon,
      color,
      className,
      type,
      ...props
    } = this.props

    const routedLink = /^https?:\/\//.test(href) //if its an external link
      ? { href } //load the href, normal behaviour
      : { component: RouterLink, to: href } //if not, load the internal router with a to prop

    return (
      <MuiButton
        {...routedLink}
        color={color}
        startIcon={(!type && icon) || (type && <LogoIcon type={type} />)}
        {...props}
      >
        {caption}
      </MuiButton>
    )
  }
}

export default withStyles(styles)(Button)
