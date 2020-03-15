import React from 'react'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

export default function ProjectThemeProvider({
  project,
  type,
  primary,
  secondary,
  ...props
}) {
  // const aux = {
  //   primary: (project.palette && project.palette.primary) || primary || null,
  //   secondary:
  //     (project.palette && project.palette.secondary) || secondary || null,
  //   type: type,
  // }

  // let newPalette = {}

  // if (aux.primary) newPalette.primary = { main: aux.primary }
  // if (aux.secondary) newPalette.secondary = { main: aux.secondary }
  // if (aux.type) newPalette.type = aux.type

  //had to do this (really stupid) thing because otherwise the null values would overwrite
  //the previous values when spreading the variables...

  return (
    <MuiThemeProvider
      theme={globaltheme => {
        const oldPalette = globaltheme.palette
        const newPalette = {
          primary: {
            main:
              (project && project.palette && project.palette.primary) ||
              primary ||
              oldPalette.primary.main,
          },
          secondary: {
            main:
              (project && project.palette && project.palette.secondary) ||
              secondary ||
              oldPalette.secondary.main,
          },
          type: type || oldPalette.type,
        }

        // let aux = {}
        // if (type) {
        //   aux = {
        //     primary: globaltheme.palette.primary,
        //     secondary: globaltheme.palette.secondary,
        //   }
        //   if (type == 'dark') {
        //     aux.background = {
        //       // default: "#131313",
        //       default: '#000',
        //       paper: '#10100f',
        //     }
        //   }
        // } else {
        //   aux = { ...globaltheme.palette }
        // }

        //if there is a type change, we can't load the old palette because we need the colors to be generated again

        // const theme = {
        //   ...globaltheme,
        //   palette: { ...aux, ...newPalette },
        // }

        const theme = {
          ...globaltheme,
          palette: { ...newPalette },
        }

        return createMuiTheme(theme)
      }}
    >
      {props.children}
    </MuiThemeProvider>
  )
}
