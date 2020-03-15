import React, { Component, Fragment } from 'react'

//my components
import Stamp from '../components/Stamp'
import { CenterBox, CentralColumn, Surface } from '../components/Utils'
import ProjectCard from '../components/ProjectCard'
import FilterChips from '../components/FilterChips'
import ProjectThemeProvider from '../components/ProjectThemeProvider'

//data
// import { projects, getTypes } from '../data'

//MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    root: {
      [theme.breakpoints.up('sm')]: {
        // display: 'flex',
        // alignItems: 'stretch',
        minHeight: '100vh',
        //doesn't work yet because the <body> is not set to have full height...
        // bottom: 0,
      },
    },
  }
}

class WorksView extends Component {
  constructor({ projects, ...props }) {
    super(props)
    this.allProjects = projects
    this.state = { projects, filtered: false, filterTerms: [] }
    this.onFilterChange = this.onFilterChange.bind(this)
    // document.title = 'Julio Carvalho | All Projects'
  }

  onFilterChange(filterTerms) {
    let filteredProjs = []

    if (filterTerms.length == 0) {
      filteredProjs = this.allProjects
    } else {
      filteredProjs = this.allProjects.filter(proj => {
        return proj.categories.some(category => filterTerms.includes(category))
        //.some returns true if any of the loop iterations return true
      })
    }
    this.setState({
      projects: [...filteredProjs],
      filtered: filterTerms.length > 0,
      filterTerms: filterTerms,
    })
  }

  render() {
    const { classes } = this.props
    const { projects } = this.state

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={4} md={4}>
          <Box m={2}>
            <Box m="auto" mb={6} mt={6} maxWidth={'50%'}>
              <Stamp
                topText="JULIO"
                bottomText="WORKS"
                id="julio.works"
                emoji="💻"
                bw
              />
            </Box>
            <CenterBox>
              <Typography
                variant="h2"
                gutterBottom
                style={{ fontWeight: 'bold' }}
                // display="block"
              >
                WORKS
              </Typography>
              <Typography variant="overline" gutterBottom color="textSecondary">
                Filter by category
              </Typography>
              <Box>
                <FilterChips onChange={this.onFilterChange} />
              </Box>
            </CenterBox>
          </Box>
        </Grid>
        <Grid item sm xs={12}>
          <ProjectThemeProvider type="light">
            <Surface>
              <Box p={3}>
                <Box mb={2}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    color="textSecondary"
                  >
                    {this.state.filtered
                      ? 'VIEWING FILTERED PROJECTS'
                      : 'VIEWING ALL PROJECTS'}
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {projects.map(proj => (
                    <Grid item xs={12} sm={6} md={4}>
                      <ProjectThemeProvider project={proj} type="dark">
                        <ProjectCard project={proj}></ProjectCard>
                      </ProjectThemeProvider>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Surface>
          </ProjectThemeProvider>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(WorksView)
