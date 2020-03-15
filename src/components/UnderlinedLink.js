import React, { Component } from 'react'
import cx from 'clsx'

// import { Link as RouterLink } from 'react-router-dom'
import SmartLink from './SmartLink'

import { withStyles } from '@material-ui/core/styles'

import Link from '@material-ui/core/Link'
import { borderBottom } from '@material-ui/system'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    // borderBottom: "1px solid " + theme.palette.primary.main, //default
    display: 'inline-flex',
    verticalAlign: 'text-bottom',
    boxSizing: 'inherit',
    // textAlign: "center",
    alignItems: 'center',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  colorSecondary: {
    borderColor: theme.palette.secondary.main,
  },
})

export class UnderlinedLink extends Component {
  render() {
    const {
      classes,
      href,
      children,
      noIcon,
      color,
      iconBefore,
      className,
      targetBlank,
    } = this.props
    const icon = noIcon
      ? null
      : this.props.icon || (
          <SvgIcon fontSize="inherit" color={color}>
            <path d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
          </SvgIcon>
        )
    return (
      <Link
        to={href}
        component={SmartLink}
        className={cx(
          classes.root,
          color == 'secondary' && classes.colorSecondary,
          className
        )}
        underline="none"
        color={color}
        target={targetBlank && '_blank'}
      >
        <Typography>
          {!iconBefore && children}

          {icon}
          {iconBefore && children}
        </Typography>
      </Link>
    )
  }
}

export default withStyles(styles)(UnderlinedLink)
