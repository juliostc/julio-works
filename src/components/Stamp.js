import React, { Fragment } from 'react'
import concat from 'clsx'

import { makeStyles } from '@material-ui/styles'

import Box from '@material-ui/core/Box'

// import Emoji from "react-emoji-render";
import { CenterBox } from './Utils'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  path: {
    fill: 'transparent',
  },
  stroke: {
    fill: 'transparent',
    stroke: theme.palette.primary.main,
    boxSizing: 'border-box',
  },

  bwStroke: {
    stroke: theme.palette.text.primary,
  },

  text: {
    fill: theme.palette.primary.main,
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: 'light',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  bwFill: {
    fill: theme.palette.text.primary,
  },

  textpath: {
    alignmentBaseline: 'central',
  },
  smalltext: {
    fontSize: theme.typography.caption.fontSize,
  },

  svg: {
    width: '100%',
    height: '100%',
  },
  rotate: {
    animation: 'spin360 1.75s normal both',
    // animation: "spin180 0.5s alternate-reverse both ease-in",
    // animationIterationCount: 3,

    // transform: "rotateY(360deg)",
    // transition: "transform 2s ease",
    '&:hover': {
      // transform: "rotateY(0deg)"
      // animationName: "spin360",
      // animationDuration: "2s",
      // animationDirection: "reverse"
      // animationFillMode: "backwards"
    },
  },
  emoji: {
    // fontSize: "3.5em",
    fill: theme.palette.text.primary,
  },
  sparkle: {
    mixBlendMode: 'screen',
    borderRadius: '50%',
    animation: 'sparkleBlink 0.25s alternate ease-out',
    animationIterationCount: 2, //back and forth
    animationDelay: '1.25s',
    animationFillMode: 'both', //this makes the final state of the animation be fixed, which makes the sparkle's opacity be zero
    //if I set opacity: 0 here, it works on Chrome, but it doesn't even show on Safari
  },
}))

const Stamp = props => {
  const noText =
    props.noText || !(props.text || props.bottomText || props.topText)

  const styles = useStyles()

  const emoji = props.emoji

  const textRadius = 50

  // const innerCircleRadius = 30;
  const outerCircleRadius = 60

  const biggestNumber = props.noStroke ? textRadius : outerCircleRadius

  const gutter = biggestNumber / 10 //increases the svg size in 10% so that the outer circle won't be cropped out

  const viewBoxSize = biggestNumber * 2 + gutter

  const cx = viewBoxSize / 2
  const cy = viewBoxSize / 2

  const getCirclePath = (textRadius, sweepFlag) => {
    let invertedSweepFlag = sweepFlag ? 0 : 1
    return (
      'M' +
      cx +
      ',' +
      cy +
      ' m -' +
      textRadius +
      ', 0' +
      ' a ' +
      textRadius +
      ',' +
      textRadius +
      ' 0 ' +
      sweepFlag +
      ',' +
      invertedSweepFlag +
      ' ' +
      textRadius * 2 +
      ', 0 a ' +
      textRadius +
      ',' +
      textRadius +
      ' 0 ' +
      sweepFlag +
      ',' +
      invertedSweepFlag +
      ' ' +
      textRadius * -2 +
      ', 0'
    )
  }

  const longText = props.text && props.text.length > 14

  return (
    <CenterBox className={styles.root}>
      <svg
        viewBox={'0 0 ' + viewBoxSize + ' ' + viewBoxSize}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className={concat(styles.svg, props.rotate && styles.rotate)}
        preserveAspectRatio="xMidYMid meet"
      >
        {!props.noStroke && (
          <Fragment>
            <circle
              cx={cx}
              cy={cy}
              r={outerCircleRadius}
              className={concat(styles.stroke, !!props.bw && styles.bwStroke)}
            />
          </Fragment>
        )}

        <path
          d={getCirclePath(textRadius, 1)}
          id={'bottom-circle-' + props.id}
          className={styles.path}
        />
        <path
          d={getCirclePath(textRadius, 0)}
          id={'top-circle-' + props.id}
          className={styles.path}
        />

        <text
          className={styles.emoji}
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          width={viewBoxSize}
          style={{ fontSize: noText ? '4em' : '3.5em' }}
        >
          {emoji}
        </text>

        <text
          //transform 180degrees -> transform origin is (cx, cy) - the central x and y
          transform={'rotate(180,' + cx + ',' + cy + ')'}
          className={concat(
            styles.text,
            !!longText && styles.smalltext,
            !!props.bw && styles.bwFill
          )}
          style={
            props.corner == 'topleft'
              ? {
                  transformOrigin: 'center',
                  transform: 'rotate(-90deg)',
                  fontSize: props.smalltext ? '75%' : null,
                }
              : null
          }
        >
          <textPath
            xlinkHref={'#top-circle-' + props.id}
            startOffset="75%"
            textAnchor="middle"
            className={styles.textpath}
            transform-origin={cx + 'px ' + cy + 'px'}
          >
            {props.topText || props.text}
          </textPath>
        </text>

        <text
          x="0"
          className={concat(
            styles.text,

            !!longText && styles.smalltext,
            !!props.bw && styles.bwFill
          )}
        >
          <textPath
            xlinkHref={'#bottom-circle-' + props.id}
            startOffset="25%"
            textAnchor="middle"
            className={concat(styles.textpath)}
          >
            {props.bottomText || props.text}
          </textPath>
        </text>

        {props.rotate && (
          <image
            // href={require('../images/' + 'sparkle.png')}
            width="70"
            height="70"
            x={cx - 20}
            y={cy - 50}
            className={styles.sparkle}
          />
        )}
      </svg>
    </CenterBox>
  )
}

export default Stamp
