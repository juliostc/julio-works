import React, { Fragment } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

//  use cases:
//<MediaQuery up="xs"> {content} </MediaQuery>
//<MediaQuery down="sm"> {content} </MediaQuery>
//<MediaQuery down="xl" up="xs"> {content} </MediaQuery>

//  if you want to use both up and down... sure, why not?

export default function MediaQuery(props) {
  const { up, down, children, instead } = props

  let matches = {}
  matches.up = useMediaQuery(theme => theme.breakpoints.up(up || 'xs'))
  matches.down = useMediaQuery(theme => theme.breakpoints.down(down || 'xl'))

  const bool = (!up || matches.up) && (!down || matches.down)
  //if up or down are not specified, it's already true
  //if it is specified, than it's only true if the useMediaQuery is also true

  return <Fragment>{bool ? children : instead}</Fragment>
}
