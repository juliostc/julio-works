import React, { Fragment, Component } from 'react'
import cx from 'clsx'

//data
import { getAllCategories as getCategories } from '../util/data'

//MUI
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import DoneIcon from '@material-ui/icons/Done'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => {
  return {
    rootWithOverlay: {
      position: 'relative',
    },
    chips: {
      paddingBottom: theme.spacing(2),
    },
    chipsWithOverlay: {
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      '&::after': {
        pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 25%)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        content: '""',
      },
    },
    chip: {
      margin: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      marginLeft: 0,
    },
    overlay: {},
  }
}

export class FilterChips extends Component {
  constructor(props) {
    super(props)
    this.state = { categories: getCategories(), selectedCategories: [] }
  }
  isSelected(filterTerm) {
    return this.state.selectedCategories.includes(filterTerm)
  }
  chipClicked(filterTerm) {
    return e => {
      var array = [...this.state.selectedCategories]
      var index = array.indexOf(filterTerm)
      if (index !== -1) {
        array.splice(index, 1)
        this.setState({ ...this.state, selectedCategories: array })
        this.props.onChange(array)
      } else {
        var selected = [...this.state.selectedCategories, filterTerm]
        this.setState({
          ...this.state,
          selectedCategories: selected,
        })
        this.props.onChange(selected)
      }
    }
  }
  render() {
    const { classes, withOverlay } = this.props
    return (
      <Fragment>
        <Box className={!!withOverlay && classes.rootWithOverlay}>
          <div
            className={cx(
              classes.chips,
              !!withOverlay && classes.chipsWithOverlay
            )}
          >
            {this.state.categories.map(filterTerm => {
              const isSelected = this.isSelected(filterTerm)
              return (
                <Chip
                  label={filterTerm}
                  clickable
                  //variant={isSelected ? "default" : "outlined"}
                  variant="outlined"
                  color={isSelected ? 'primary' : 'default'}
                  onClick={this.chipClicked(filterTerm)}
                  onDelete={isSelected ? this.chipClicked(filterTerm) : false}
                  deleteIcon={isSelected ? <DoneIcon /> : null}
                  className={classes.chip}
                />
              )
            })}
          </div>
        </Box>
      </Fragment>
    )
  }
}

export default withStyles(styles)(FilterChips)
